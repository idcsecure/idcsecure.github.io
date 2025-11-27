// Shared JS for nav toggle, active link highlighting, modal behaviour, footer year
(function () {
  // footer year
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Sidebar toggle (unchanged)
  const hamburgerBtn = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarCloseBtn = document.getElementById('sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    });
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
  sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
  });

  // DESKTOP + MOBILE FIXED - Targets ALL nav elements
  document.addEventListener('DOMContentLoaded', () => {
    // Target ALL possible nav links (desktop + mobile)
    const allNavLinks = document.querySelectorAll('nav a, .nav a, .navbar a, .sidebar-nav a, .main-nav a');

    function normalizePath(path) {
      if (!path) return 'index';
     
      try {
        path = new URL(path, window.location.origin).pathname;
      } catch (e) {}

      path = path.replace(/\/index\.html$/, '').replace(/\/index\/?$/, '').replace(/\/$/, '');
      const segments = path.split('/').filter(Boolean);
      const normalized = segments.length > 0 ? segments[segments.length - 1] : 'index';
     
      return normalized === '' ? 'index' : normalized.toLowerCase();
    }

    const currentPath = normalizePath(window.location.pathname);
    console.log('🏠 Current Page:', currentPath, 'Full Path:', window.location.pathname);

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = normalizePath(href);
     
      console.log('🔗 Checking:', link.textContent.trim(), '->', linkPath);
     
      if (linkPath === currentPath) {
        link.classList.add('active');
        console.log('✅ HIGHLIGHTED:', link.textContent.trim());
      } else {
        link.classList.remove('active');
      }
    });

    // Modal logic (unchanged)
    const modal = document.getElementById('founder-note-modal');
    const openBtn = document.getElementById('founder-note-link');
    const closeBtn = document.getElementById('modal-close');

    function openModal(m) {
      m.style.display = 'block';
      m.setAttribute('aria-hidden', 'false');
      (m.querySelector('.modal-content') || m).focus();
    }

    function closeModal(m) {
      m.style.display = 'none';
      m.setAttribute('aria-hidden', 'true');
      openBtn?.focus();
    }

    if (openBtn && modal) openBtn.addEventListener('click', () => openModal(modal));
    if (closeBtn && modal) closeBtn.addEventListener('click', () => closeModal(modal));
    if (modal) window.addEventListener('click', (ev) => ev.target === modal && closeModal(modal));
  });
})();
