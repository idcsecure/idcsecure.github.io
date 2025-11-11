// Shared JS for nav toggle, active link highlighting, modal behaviour, footer year
(function () {
  // footer year
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // nav toggle (hamburger)
  const burgerList = document.querySelectorAll('.hamburger');
  burgerList.forEach(burger => {
    burger.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });

  // highlight active link (works across pages)
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav a');
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html';
    currentPage = currentPage.toLowerCase();
    navLinks.forEach(link => {
      let href = link.getAttribute('href') || '';
      href = href.toLowerCase();
      // normalize
      if (!href.endsWith('.html')) href = href + (href ? '' : 'index.html');
      if (href === currentPage || (href === 'index.html' && currentPage === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }

      // close nav on link click (mobile)
      link.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          const burgers = document.querySelectorAll('.hamburger');
          burgers.forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
      });
    });

    // click outside to close nav (mobile)
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('.nav');
      const burgers = document.querySelectorAll('.hamburger');
      let clickedInsideNav = nav && nav.contains(e.target);
      let clickedBurger = Array.from(burgers).some(b => b.contains(e.target));
      if (!clickedInsideNav && !clickedBurger && nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burgers.forEach(b => b.setAttribute('aria-expanded', 'false'));
      }
    });

    // close nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          document.querySelectorAll('.hamburger').forEach(b => b.setAttribute('aria-expanded', 'false'));
        }
        // also close modal if open
        const modal = document.getElementById('founder-note-modal');
        if (modal && modal.style.display === 'block') {
          closeModal(modal);
        }
      }
    });

    // Founder modal logic (if present)
    const modal = document.getElementById('founder-note-modal');
    const openBtn = document.getElementById('founder-note-link');
    const closeBtn = document.getElementById('modal-close');

    function openModal(m) {
      m.style.display = 'block';
      m.setAttribute('aria-hidden', 'false');
      // focus trap - focus modal
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
