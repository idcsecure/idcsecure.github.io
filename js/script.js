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

  if (hamburgerBtn && sidebar && sidebarOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    });
  }

  function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
  if (sidebarLinks && sidebarLinks.length) {
    sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) closeSidebar();
  });

  // FINAL FIXED Highlight active link (robust, supports directory URLs and parent highlighting)
  document.addEventListener('DOMContentLoaded', () => {
    const allNavLinks = document.querySelectorAll('.nav a, .navbar a, .sidebar-nav a');

    function normalizePath(path) {
      if (!path) return '';
      try {
        path = new URL(path, window.location.origin).pathname;
      } catch (e) {
        // leave path as-is if URL() fails
      }
      // remove leading/trailing slashes
      path = path.replace(/^\/+|\/+$/g, '');
      // strip .html
      path = path.replace(/\.html$/i, '');
      // remove trailing /index
      path = path.replace(/(^|\/)index$/i, '');
      // final cleanup
      path = path.replace(/^\/+|\/+$/g, '');
      return path.toLowerCase();
    }

    const currentPath = normalizePath(window.location.pathname || '/');

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = normalizePath(href);

      // Matching logic:
      // - exact path match OR
      // - link is a parent of current path (e.g. link 'about' matches current 'about/team')
      // - treat empty string as root/index
      const isRootLink = linkPath === '';
      const isExact = linkPath === currentPath;
      const isParent = linkPath !== '' && currentPath.startsWith(linkPath + '/');

      if (isExact || isParent || (isRootLink && currentPath === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Modal logic (safer)
    const modal = document.getElementById('founder-note-modal');
    const openBtn = document.getElementById('founder-note-link');
    const closeBtn = document.getElementById('modal-close');

    function openModal(m) {
      if (!m) return;
      m.style.display = 'block';
      m.setAttribute('aria-hidden', 'false');
      const focusEl = m.querySelector('.modal-content') || m;
      if (focusEl && typeof focusEl.focus === 'function') focusEl.focus();
    }

    function closeModal(m) {
      if (!m) return;
      m.style.display = 'none';
      m.setAttribute('aria-hidden', 'true');
      if (openBtn) openBtn.focus();
    }

    if (openBtn && modal) openBtn.addEventListener('click', () => openModal(modal));
    if (closeBtn && modal) closeBtn.addEventListener('click', () => closeModal(modal));
    if (modal) window.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal(modal);
    });
  });
})();
