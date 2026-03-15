document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('nav.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load nav component: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      placeholder.innerHTML = html;

      if (typeof NavigationModule !== 'undefined' && typeof NavigationModule.highlightCurrentPage === 'function') {
        NavigationModule.highlightCurrentPage();
      } else {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const normalizedCurrent = currentPath.toLowerCase();
        const links = placeholder.querySelectorAll('.navbar-nav .nav-link');
        links.forEach((link) => {
          const href = (link.getAttribute('href') || '').toLowerCase();
          const isActive = href === normalizedCurrent || (normalizedCurrent === '' && href === 'index.html');
          if (isActive) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });

        const dropdownItems = placeholder.querySelectorAll('.navbar-nav .dropdown-menu .dropdown-item');
        dropdownItems.forEach((item) => {
          const href = (item.getAttribute('href') || '').toLowerCase();
          const isActive = href === normalizedCurrent || (normalizedCurrent === '' && href === 'index.html');
          item.classList.toggle('active', isActive);
        });

        const groupLinks = placeholder.querySelectorAll('.navbar-nav .nav-link[data-nav-group-pages]');
        groupLinks.forEach((groupLink) => {
          const pages = (groupLink.getAttribute('data-nav-group-pages') || '')
            .toLowerCase()
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

          if (pages.includes(normalizedCurrent)) {
            groupLink.classList.add('active');
          }
        });
      }

      // ---------- Theme toggle ----------
      initThemeToggle();

      // ---------- Global search ----------
      if (!document.getElementById('gs-styles')) {
        const gs = document.createElement('script');
        gs.src = 'assets/scripts/globalSearch.js';
        document.head.appendChild(gs);
      } else if (window.globalSearch) {
        // already loaded, rebind both trigger buttons
        ['globalSearchBtn', 'globalSearchBtnMobile'].forEach(id => {
          const btn = document.getElementById(id);
          if (btn) btn.addEventListener('click', () => window.globalSearch.open());
        });
      }
    })
    .catch((error) => {
      console.error('Navigation component failed to load:', error);
    });
});

function initThemeToggle() {
  const btn        = document.getElementById('themeToggleBtn');
  if (!btn) return;

  const iconLight  = btn.querySelector('.theme-icon-light');
  const iconDark   = btn.querySelector('.theme-icon-dark');
  const labelEl    = btn.querySelector('.theme-label');
  const root       = document.documentElement;

  const STORAGE_KEY = 'cw-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      iconLight.classList.remove('d-none');
      iconDark.classList.add('d-none');
      if (labelEl) labelEl.textContent = 'Dark';
    } else {
      root.removeAttribute('data-theme');
      iconDark.classList.remove('d-none');
      iconLight.classList.add('d-none');
      if (labelEl) labelEl.textContent = 'Light';
    }
  }

  // Restore saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}
