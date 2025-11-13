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

  // Close sidebar on link click
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Highlight active link (works across pages)
  document.addEventListener('DOMContentLoaded', () => {
    const allNavLinks = document.querySelectorAll('.nav a, .sidebar-nav a');
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html';
    currentPage = currentPage.toLowerCase();
    
    allNavLinks.forEach(link => {
      let href = link.getAttribute('href') || '';
      href = href.toLowerCase();
      // normalize
      if (!href.endsWith('.html')) href = href + (href ? '' : 'index.html');
      if (href === currentPage || (href === 'index.html' && currentPage === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
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
