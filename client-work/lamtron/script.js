document.addEventListener('DOMContentLoaded', () => {
  const navWrapper = document.querySelector('.nav-wrapper');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  const body = document.body;

  // ===== SCROLL HANDLER =====
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (navWrapper) {
          navWrapper.classList.toggle('scrolled', window.scrollY > 20);
        }
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check
  handleScroll();

  // ===== MOBILE MENU TOGGLE =====
  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // ===== DESKTOP DROPDOWN =====
  // Desktop: hover-based (CSS handles hover), click-based for touch devices
  const closeAllDropdowns = () => {
    dropdowns.forEach((dd) => dd.classList.remove('open'));
  };

  dropdowns.forEach((dropdown) => {
    // For touch devices: toggle on click
    dropdown.addEventListener('click', (event) => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      // If clicking a link inside dropdown, let it navigate
      if (event.target.closest('.dropdown-menu a')) {
        closeAllDropdowns();
        return;
      }
      // If clicking the toggle button, toggle this dropdown
      if (event.target.closest('.dropdown-toggle')) {
        event.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          dropdown.classList.add('open');
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  // Close dropdowns on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // ===== MOBILE DROPDOWN TOGGLE =====
  // In mobile menu, clicking dropdown-toggle should expand/collapse submenu
  const mobileDropdowns = mobileMenu ? mobileMenu.querySelectorAll('.nav-dropdown') : [];
  mobileDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.classList.toggle('open');
          toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
        }
      });
    }
  });

  // Close mobile menu when clicking a nav link (except dropdown toggles)
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.nav-link[href], .dropdown-menu a, .nav-cta').forEach((link) => {
      link.addEventListener('click', () => {
        // Don't close if a parent dropdown menu is being toggled
        if (link.classList.contains('dropdown-toggle')) return;
        toggleMobileMenu(false);

        // Reset any open dropdowns inside the mobile menu
        mobileMenu.querySelectorAll('.dropdown-menu.open').forEach((menu) => {
          menu.classList.remove('open');
        });
        mobileMenu.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach((toggle) => {
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    });
  }

  // Reset mobile menu state when resizing from mobile to desktop
  const handleResize = () => {
    if (window.innerWidth > 860 && mobileMenu.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  };
  window.addEventListener('resize', handleResize, { passive: true });

  // ===== ACTIVE PAGE DETECTION =====
  const setActivePage = () => {
    const fullPath = window.location.pathname;
    const currentPath = fullPath.split('/').pop() || 'index.html';
    const pageMap = {
      'index.html': 'home',
      'about.html': 'about',
      'products.html': 'products',
      'contact.html': 'contact',
    };
    // Sub-pages (products/home-appliances.html, etc.) belong to the products section
    let currentPage = pageMap[currentPath] || '';
    if (fullPath.includes('/products/')) {
      currentPage = 'products';
    }

    document.querySelectorAll('.nav-link, .dropdown-toggle').forEach((el) => {
      const page = el.getAttribute('data-page');
      if (page) {
        el.classList.toggle('active', page === currentPage);
        if (page === currentPage && el.tagName === 'A') {
          el.setAttribute('aria-current', 'page');
        } else {
          el.removeAttribute('aria-current');
        }
      }
    });

    // Also mark dropdown parent as active if inside products page
    if (currentPage === 'products') {
      document.querySelectorAll('.nav-dropdown .dropdown-toggle').forEach((el) => {
        el.classList.add('active');
      });
    }
  };
  setActivePage();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const scrollToHash = (hash) => {
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (target) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll to hash on page load (handles cross-page links like products.html#home-appliances)
  if (window.location.hash) {
    scrollToHash(window.location.hash);
  }

  // Re-check after a short delay for elements that render after DOMContentLoaded
  setTimeout(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  }, 300);

  // ===== GLOBAL SCROLL REVEAL ANIMATIONS =====
  // Unified reveal system for .reveal, .anim-heading, and .stagger elements
  // Works across all pages. Falls back gracefully if IntersectionObserver is absent.
  const revealTargets = document.querySelectorAll('.reveal, .anim-heading, .stagger');

  if (revealTargets.length) {
    if (!('IntersectionObserver' in window)) {
      // No observer support: reveal everything immediately
      revealTargets.forEach((el) => el.classList.add('visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      });

      revealTargets.forEach((el) => revealObserver.observe(el));
    }
  }
});
