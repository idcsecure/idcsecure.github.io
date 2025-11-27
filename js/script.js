// Shared JS for nav toggle, active link highlighting, modal behaviour, footer year
(function () {
  // footer year
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Sidebar toggle functionality
  const hamburgerBtn = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarCloseBtn = document.getElementById('sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  // Open sidebar
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    });
  }

  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // FIXED: Highlight active link for directory structure
  document.addEventListener('DOMContentLoaded', () => {
    const allNavLinks = document.querySelectorAll('.nav a, .sidebar-nav a');

    function getPageName(path) {
      // Handle current page path: /about/index.html -> "about"
      let page = path.split('/').filter(Boolean).slice(-2, -1)[0] || '';
     
      // Root page: / or /index.html -> ""
      if (!page || path === '/' || path === '/index.html') page = '';
     
      return page.toLowerCase();
    }

    const currentPage = getPageName(window.location.pathname);
    console.log('Current page path:', window.location.pathname, '->', currentPage);

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPage = getPageName(href);
      console.log('Link:', link.textContent.trim(), href, '->', linkPage);

      // Match: href="about" with /about/index.html, href="" with /
      if (linkPage === currentPage) {
        link.classList.add('active');
        console.log('✅ ACTIVE:', link.textContent.trim());
      } else {
        link.classList.remove('active');
      }
    });

    // Founder modal logic (unchanged)
    const modal = document.getElementById('founder-note-modal');
    const openBtn = document.getElementById('founder-note-link');
    const closeBtn = document.getElementById('modal-close');

    function openModal(m) {
      m.style.display = 'block';
      m.setAttribute('aria-hidden', 'false');
      const focusEl = m.querySelector('.modal-content') || m;
      if (focusEl && typeof focusEl.focus === 'function') focusEl.focus();
    }

    function closeModal(m) {
      m.style.display = 'none';
      m.setAttribute('aria-hidden', 'true');
      if (openBtn) openBtn.focus();
    }

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => openModal(modal));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    if (modal) {
      window.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal(modal);
      });
    }
  });
})();
