// assets/scripts/navigation.js
// מודול ניווט משותף - ניהול ניווט, breadcrumbs, ו-URL state

/**
 * Navigation Module - ניהול ניווט וסטטוס URL
 */
const NavigationModule = (() => {
  'use strict';

  /**
   * קבלת פרמטרים מה-URL
   * @returns {Object} אובייקט עם כל הפרמטרים
   */
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  }

  /**
   * עדכון פרמטר ב-URL בלי רענון דף
   * @param {string} key - שם הפרמטר
   * @param {string} value - ערך הפרמטר
   * @param {boolean} replace - האם להחליף את הסטטוס הנוכחי או להוסיף חדש
   */
  function setUrlParam(key, value, replace = true) {
    const url = new URL(window.location);
    
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }

    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }

  /**
   * עדכון מספר פרמטרים בבת אחת
   * @param {Object} params - אובייקט עם הפרמטרים
   * @param {boolean} replace - האם להחליף את הסטטוס הנוכחי
   */
  function setUrlParams(params, replace = true) {
    const url = new URL(window.location);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }

  /**
   * ניקוי כל הפרמטרים מה-URL
   */
  function clearUrlParams() {
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);
  }

  /**
   * יצירת breadcrumbs דינמי
   * @param {Array} items - רשימת פריטי הניווט
   * @param {string} container - סלקטור של הקונטיינר
   */
  function createBreadcrumbs(items, container) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'breadcrumb');
    
    const ol = document.createElement('ol');
    ol.className = 'breadcrumb bg-dark p-3 rounded';

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'breadcrumb-item';
      
      if (index === items.length - 1) {
        li.classList.add('active');
        li.setAttribute('aria-current', 'page');
        li.textContent = item.label;
      } else {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'text-warning';
        a.textContent = item.label;
        li.appendChild(a);
      }

      ol.appendChild(li);
    });

    nav.appendChild(ol);
    containerEl.innerHTML = '';
    containerEl.appendChild(nav);
  }

  /**
   * סימון הדף הפעיל בתפריט הניווט
   * @param {string} currentPage - שם הדף הנוכחי (ללא .html)
   */
  function highlightCurrentPage(currentPage = null) {
    // אם לא ניתן שם דף, נסה לזהות אוטומטית
    if (!currentPage) {
      const path = window.location.pathname;
      currentPage = path.split('/').pop().replace('.html', '') || 'index';
    }

    // מצא את כל קישורי הניווט
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPage = href.replace('.html', '').replace('./', '');
      
      if (linkPage === currentPage || 
          (currentPage === 'index' && linkPage === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * יצירת תפריט עזר (quick nav)
   * @param {Array} sections - רשימת סקשנים בדף
   * @param {string} container - סלקטור של הקונטיינר
   */
  function createQuickNav(sections, container) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const nav = document.createElement('nav');
    nav.className = 'quick-nav glass p-3 rounded sticky-top';
    nav.style.top = '80px'; // מתחת לנאב בר

    const title = document.createElement('h6');
    title.className = 'text-warning mb-2';
    title.textContent = 'ניווט מהיר';
    nav.appendChild(title);

    const ul = document.createElement('ul');
    ul.className = 'list-unstyled mb-0';

    sections.forEach(section => {
      const li = document.createElement('li');
      li.className = 'mb-2';

      const a = document.createElement('a');
      a.href = `#${section.id}`;
      a.className = 'text-white text-decoration-none quick-nav-link';
      a.textContent = section.label;
      
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(section.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    containerEl.appendChild(nav);

    // הוספת הדגשה לסקשן הפעיל בזמן גלילה
    setupScrollSpy(sections.map(s => s.id), '.quick-nav-link');
  }

  /**
   * Scroll spy - הדגשת הקישור הפעיל בזמן גלילה
   * @param {Array<string>} sectionIds - מזהי הסקשנים
   * @param {string} linkSelector - סלקטור של הקישורים
   */
  function setupScrollSpy(sectionIds, linkSelector) {
    const links = document.querySelectorAll(linkSelector);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(
              `${linkSelector}[href="#${entry.target.id}"]`
            );
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });
  }

  /**
   * גלילה חלקה לאלמנט
   * @param {string} elementId - מזהה האלמנט
   * @param {number} offset - היסט נוסף (למשל לנאב בר קבוע)
   */
  function smoothScrollTo(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * טיפול בקישורי anchor (#) בדף
   */
  function handleAnchorLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const targetId = href.substring(1);
      smoothScrollTo(targetId);
      
      // עדכון URL
      setUrlParam('section', targetId);
    });
  }

  /**
   * טעינת סקשן מה-URL בזמן טעינת הדף
   */
  function loadSectionFromUrl() {
    const params = getUrlParams();
    if (params.section) {
      // המתן קצת לאחר טעינת הדף
      setTimeout(() => smoothScrollTo(params.section), 100);
    }
  }

  /**
   * יצירת כפתור חזרה למעלה
   * @param {string} container - סלקטור או null לשימוש בברירת מחדל
   */
  function createBackToTop(container = null) {
    let btn = document.querySelector('.back-to-top');
    
    // אם הכפתור כבר קיים, אל תיצור אותו שוב
    if (btn) return;

    btn = document.createElement('button');
    btn.className = 'btn btn-warning back-to-top';
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.setAttribute('aria-label', 'חזור למעלה');
    btn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
    `;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (container) {
      document.querySelector(container)?.appendChild(btn);
    } else {
      document.body.appendChild(btn);
    }

    // הצג/הסתר לפי גלילה
    const onScroll = () => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /**
   * אתחול כללי של הניווט
   * @param {Object} options - אפשרויות
   */
  function init(options = {}) {
    // סימון הדף הנוכחי
    if (options.highlightCurrent !== false) {
      highlightCurrentPage(options.currentPage);
    }

    // טיפול בקישורי anchor
    if (options.handleAnchors !== false) {
      handleAnchorLinks();
    }

    // טעינת סקשן מה-URL
    if (options.loadFromUrl !== false) {
      loadSectionFromUrl();
    }

    // כפתור חזרה למעלה
    if (options.backToTop !== false) {
      createBackToTop(options.backToTopContainer);
    }

    // Quick navigation
    if (options.quickNav && options.quickNav.sections) {
      createQuickNav(options.quickNav.sections, options.quickNav.container);
    }

    // Breadcrumbs
    if (options.breadcrumbs && options.breadcrumbs.items) {
      createBreadcrumbs(options.breadcrumbs.items, options.breadcrumbs.container);
    }
  }

  // Public API
  return {
    init,
    getUrlParams,
    setUrlParam,
    setUrlParams,
    clearUrlParams,
    createBreadcrumbs,
    highlightCurrentPage,
    createQuickNav,
    setupScrollSpy,
    smoothScrollTo,
    handleAnchorLinks,
    loadSectionFromUrl,
    createBackToTop
  };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationModule;
}
