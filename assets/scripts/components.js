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
        return;
      }

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
    })
    .catch((error) => {
      console.error('Navigation component failed to load:', error);
    });
});
