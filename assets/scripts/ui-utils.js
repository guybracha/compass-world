// assets/scripts/ui-utils.js
// מודול עזר לפונקציות UI משותפות

/**
 * UI Utils Module - פונקציות עזר ל-UI
 */
const UIUtils = (() => {
  'use strict';

  /**
   * יצירת loader/spinner
   * @param {string} container - סלקטור של הקונטיינר
   * @param {string} message - הודעה להצגה
   */
  function showLoader(container, message = 'טוען...') {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-warning mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-white">${message}</p>
      </div>
    `;
  }

  /**
   * הצגת מצב ריק (empty state)
   * @param {string} container - סלקטור של הקונטיינר
   * @param {Object} options - אפשרויות
   */
  function showEmptyState(container, options = {}) {
    const {
      icon = 'bi-inbox',
      title = 'לא נמצאו תוצאות',
      message = 'נסה לשנות את קריטריוני החיפוש',
      actionText = null,
      actionCallback = null
    } = options;

    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    let actionHtml = '';
    if (actionText && actionCallback) {
      actionHtml = `<button class="btn btn-warning mt-3 empty-state-action">${actionText}</button>`;
    }

    containerEl.innerHTML = `
      <div class="empty-state text-center py-5 glass p-4 rounded">
        <i class="bi ${icon} text-warning" style="font-size: 4rem;"></i>
        <h3 class="text-white mt-3">${title}</h3>
        <p class="text-secondary">${message}</p>
        ${actionHtml}
      </div>
    `;

    if (actionCallback) {
      const btn = containerEl.querySelector('.empty-state-action');
      btn?.addEventListener('click', actionCallback);
    }
  }

  /**
   * הצגת הודעת שגיאה
   * @param {string} container - סלקטור של הקונטיינר
   * @param {string} message - הודעת השגיאה
   * @param {boolean} dismissible - האם ניתן לסגור
   */
  function showError(container, message, dismissible = true) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const dismissBtn = dismissible 
      ? '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>'
      : '';

    const alert = document.createElement('div');
    alert.className = `alert alert-danger alert-dismissible fade show ${dismissible ? 'alert-dismissible' : ''}`;
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      ${message}
      ${dismissBtn}
    `;

    containerEl.insertBefore(alert, containerEl.firstChild);
  }

  /**
   * הצגת הודעת הצלחה
   * @param {string} container - סלקטור של הקונטיינר
   * @param {string} message - הודעת ההצלחה
   * @param {number} duration - משך הזמן להצגה (ms), 0 = לא נעלם
   */
  function showSuccess(container, message, duration = 3000) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.setAttribute('role', 'alert');
    alert.innerHTML = `
      <i class="bi bi-check-circle-fill me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    containerEl.insertBefore(alert, containerEl.firstChild);

    if (duration > 0) {
      setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 150);
      }, duration);
    }
  }

  /**
   * יצירת כרטיס (card) גנרי
   * @param {Object} data - נתוני הכרטיס
   * @param {Object} options - אפשרויות עיצוב
   * @returns {HTMLElement}
   */
  function createCard(data, options = {}) {
    const {
      imageField = 'image',
      titleField = 'title',
      descriptionField = 'description',
      linkField = 'link',
      badgesField = 'badges',
      className = 'card bg-dark text-white border-secondary h-100',
      onClick = null
    } = options;

    const card = document.createElement('div');
    card.className = className;
    
    if (onClick) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => onClick(data));
    }

    let imageHtml = '';
    if (data[imageField]) {
      imageHtml = `
        <img src="${data[imageField]}" 
             class="card-img-top" 
             alt="${data[titleField] || ''}"
             loading="lazy" />
      `;
    }

    let badgesHtml = '';
    if (data[badgesField] && Array.isArray(data[badgesField])) {
      badgesHtml = data[badgesField]
        .map(badge => `<span class="badge bg-warning text-dark me-1">${badge}</span>`)
        .join('');
    }

    const linkAttr = data[linkField] ? `href="${data[linkField]}"` : '';

    card.innerHTML = `
      ${imageHtml}
      <div class="card-body">
        <h5 class="card-title">
          ${data[linkField] ? `<a ${linkAttr} class="text-warning">${data[titleField]}</a>` : data[titleField]}
        </h5>
        ${data[descriptionField] ? `<p class="card-text">${data[descriptionField]}</p>` : ''}
        ${badgesHtml ? `<div class="mt-2">${badgesHtml}</div>` : ''}
      </div>
    `;

    return card;
  }

  /**
   * יצירת רשת כרטיסים
   * @param {Array} items - רשימת הפריטים
   * @param {string} container - סלקטור של הקונטיינר
   * @param {Object} options - אפשרויות
   */
  function createCardGrid(items, container, options = {}) {
    const {
      columns = 3,
      gap = 3,
      emptyMessage = 'לא נמצאו פריטים',
      ...cardOptions
    } = options;

    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    if (items.length === 0) {
      showEmptyState(container, { message: emptyMessage });
      return;
    }

    containerEl.innerHTML = '';
    containerEl.className = `row g-${gap}`;

    items.forEach(item => {
      const col = document.createElement('div');
      col.className = `col-12 col-md-6 col-lg-${12 / columns}`;
      
      const card = createCard(item, cardOptions);
      col.appendChild(card);
      containerEl.appendChild(col);
    });
  }

  /**
   * יצירת פגינציה
   * @param {number} totalItems - מספר כל הפריטים
   * @param {number} itemsPerPage - פריטים בעמוד
   * @param {number} currentPage - עמוד נוכחי
   * @param {Function} onPageChange - callback לשינוי עמוד
   * @param {string} container - סלקטור של הקונטיינר
   */
  function createPagination(totalItems, itemsPerPage, currentPage, onPageChange, container) {
    const containerEl = document.querySelector(container);
    if (!containerEl) return;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) {
      containerEl.innerHTML = '';
      return;
    }

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Page navigation');

    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center';

    // כפתור הקודם
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    `;
    if (currentPage > 1) {
      prevLi.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        onPageChange(currentPage - 1);
      });
    }
    ul.appendChild(prevLi);

    // מספרי עמודים
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      const firstLi = createPageItem(1, currentPage, onPageChange);
      ul.appendChild(firstLi);
      
      if (startPage > 2) {
        const dotsLi = document.createElement('li');
        dotsLi.className = 'page-item disabled';
        dotsLi.innerHTML = '<span class="page-link">...</span>';
        ul.appendChild(dotsLi);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageLi = createPageItem(i, currentPage, onPageChange);
      ul.appendChild(pageLi);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dotsLi = document.createElement('li');
        dotsLi.className = 'page-item disabled';
        dotsLi.innerHTML = '<span class="page-link">...</span>';
        ul.appendChild(dotsLi);
      }
      
      const lastLi = createPageItem(totalPages, currentPage, onPageChange);
      ul.appendChild(lastLi);
    }

    // כפתור הבא
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    `;
    if (currentPage < totalPages) {
      nextLi.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        onPageChange(currentPage + 1);
      });
    }
    ul.appendChild(nextLi);

    nav.appendChild(ul);
    containerEl.innerHTML = '';
    containerEl.appendChild(nav);
  }

  /**
   * יצירת פריט עמוד בפגינציה
   * @private
   */
  function createPageItem(pageNumber, currentPage, onPageChange) {
    const li = document.createElement('li');
    li.className = `page-item ${pageNumber === currentPage ? 'active' : ''}`;
    
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = pageNumber;
    
    a.addEventListener('click', (e) => {
      e.preventDefault();
      onPageChange(pageNumber);
    });

    li.appendChild(a);
    return li;
  }

  /**
   * יצירת modal דינמי
   * @param {Object} options - אפשרויות המודאל
   * @returns {HTMLElement}
   */
  function createModal(options = {}) {
    const {
      id = 'dynamicModal',
      title = 'Modal',
      body = '',
      size = '', // 'modal-sm', 'modal-lg', 'modal-xl'
      showFooter = true,
      footerButtons = [
        { text: 'סגור', className: 'btn btn-secondary', action: 'close' }
      ]
    } = options;

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = id;
    modal.tabIndex = -1;
    modal.setAttribute('aria-hidden', 'true');

    let footerHtml = '';
    if (showFooter) {
      const buttonsHtml = footerButtons.map((btn, idx) => 
        `<button type="button" 
                class="${btn.className}" 
                data-action="${btn.action || 'custom'}"
                data-index="${idx}">
          ${btn.text}
        </button>`
      ).join('');
      
      footerHtml = `
        <div class="modal-footer">
          ${buttonsHtml}
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="modal-dialog ${size} modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${body}
          </div>
          ${footerHtml}
        </div>
      </div>
    `;

    // טיפול בכפתורים
    modal.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index);
        
        if (action === 'close') {
          const bsModal = bootstrap.Modal.getInstance(modal);
          bsModal?.hide();
        } else if (footerButtons[index]?.onClick) {
          footerButtons[index].onClick();
        }
      });
    });

    document.body.appendChild(modal);
    return modal;
  }

  /**
   * פתיחת modal
   * @param {string|HTMLElement} modal - מזהה או אלמנט המודאל
   */
  function openModal(modal) {
    const modalEl = typeof modal === 'string' 
      ? document.getElementById(modal) 
      : modal;
    
    if (!modalEl) return;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  }

  /**
   * סגירת modal
   * @param {string|HTMLElement} modal - מזהה או אלמנט המודאל
   */
  function closeModal(modal) {
    const modalEl = typeof modal === 'string' 
      ? document.getElementById(modal) 
      : modal;
    
    if (!modalEl) return;

    const bsModal = bootstrap.Modal.getInstance(modalEl);
    bsModal?.hide();
  }

  /**
   * יצירת tooltip
   * @param {string} selector - סלקטור של האלמנטים
   */
  function initTooltips(selector = '[data-bs-toggle="tooltip"]') {
    const tooltipTriggerList = document.querySelectorAll(selector);
    [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
  }

  /**
   * העתקת טקסט ללוח
   * @param {string} text - הטקסט להעתקה
   * @returns {Promise<boolean>}
   */
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }

  /**
   * אנימציית fade in לאלמנטים
   * @param {string} selector - סלקטור של האלמנטים
   * @param {number} delay - עיכוב בין אלמנטים (ms)
   */
  function fadeInElements(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, idx) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, idx * delay);
    });
  }

  // Public API
  return {
    showLoader,
    showEmptyState,
    showError,
    showSuccess,
    createCard,
    createCardGrid,
    createPagination,
    createModal,
    openModal,
    closeModal,
    initTooltips,
    copyToClipboard,
    fadeInElements
  };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIUtils;
}
