// Shared JS for nav toggle, active link highlighting, modal behaviour, footer year
(function () {
  // footer year (unchanged)
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

  // FINAL FIXED Highlight active link
  document.addEventListener('DOMContentLoaded', () => {
    const allNavLinks = document.querySelectorAll('.nav a, .navbar a, .sidebar-nav a');

    function normalizePath(path) {
      if (!path) return 'index';
     
      // Convert to absolute path
      try {
        path = new URL(path, window.location.origin).pathname;
      } catch (e) {}

      // Remove trailing slash, index.html, index from END of path
      path = path
        .replace(/\/index\.html$/, '')
        .replace(/\/index$/, '')
        .replace(/\/$/, '');

      // Extract directory name (not filename)
      const segments = path.split('/').filter(Boolean);
      let normalized = segments.length > 0 ? segments[segments.length - 1] : 'index';
     
      // Home/root fix
      if (normalized === '' || path === '/') normalized = 'index';
     
      return normalized.toLowerCase();
    }

    const currentPath = normalizePath(window.location.pathname);
    console.log('🔍 Current:', currentPath, 'Path:', window.location.pathname);

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = normalizePath(href);
      console.log('🔗 Link:', linkPath, 'href:', href);

      // Exact match for highlighting
      if (linkPath === currentPath) {
        link.classList.add('active');
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
