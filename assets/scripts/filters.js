// assets/scripts/filters.js
// מודול פילטור ומיון מודולרי עם ממשק משתמש

/**
 * Filters Module - מודול ניהול פילטרים וממשק משתמש
 */
const FiltersModule = (() => {
  'use strict';

  /**
   * יצירת ממשק פילטרים דינמי
   * @param {Object} config - קונפיגורציה
   * @param {string} config.container - סלקטור של הקונטיינר
   * @param {Array} config.items - רשימת הפריטים
   * @param {Array<string>} config.filterFields - שדות לפילטור
   * @param {Function} config.onFilter - callback לביצוע הפילטור
   * @param {Object} config.options - אפשרויות נוספות
   * @returns {Object} API של הפילטר
   */
  function createFilterUI(config) {
    const {
      container,
      items = [],
      filterFields = [],
      onFilter,
      options = {}
    } = config;

    const containerEl = document.querySelector(container);
    if (!containerEl) {
      console.error('[FiltersModule] Container not found:', container);
      return null;
    }

    const state = {
      searchTerm: '',
      activeTags: new Set(),
      sortBy: options.defaultSort || null,
      sortOrder: 'asc'
    };

    /**
     * רינדור שדה חיפוש
     */
    function renderSearchBox() {
      const searchBox = document.createElement('div');
      searchBox.className = 'filter-search mb-3';
      searchBox.innerHTML = `
        <div class="input-group">
          <span class="input-group-text bg-dark text-white border-secondary">
            <i class="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control bg-dark text-white border-secondary filter-search-input" 
            placeholder="${options.searchPlaceholder || 'חיפוש...'}"
            aria-label="Search"
          />
          <button class="btn btn-outline-secondary clear-search" type="button" title="נקה חיפוש">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `;

      const input = searchBox.querySelector('.filter-search-input');
      const clearBtn = searchBox.querySelector('.clear-search');

      input.addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        applyFilters();
      });

      clearBtn.addEventListener('click', () => {
        input.value = '';
        state.searchTerm = '';
        applyFilters();
      });

      return searchBox;
    }

    /**
     * רינדור כפתורי תגיות
     */
    function renderTagButtons() {
      if (!options.showTags) return null;

      const tags = SearchModule.getUniqueTags(items, options.tagField || 'tags');
      
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'filter-tags mb-3';
      
      const title = document.createElement('h6');
      title.className = 'text-white mb-2';
      title.textContent = options.tagsTitle || 'סינון לפי תגיות:';
      tagsContainer.appendChild(title);

      const buttonsWrapper = document.createElement('div');
      buttonsWrapper.className = 'd-flex flex-wrap gap-2';

      // כפתור "הכל"
      const allBtn = document.createElement('button');
      allBtn.className = 'btn btn-sm btn-outline-warning filter-tag-btn active';
      allBtn.dataset.tag = 'all';
      allBtn.textContent = 'הכל';
      buttonsWrapper.appendChild(allBtn);

      // כפתורי תגיות
      tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-warning filter-tag-btn';
        btn.dataset.tag = tag;
        btn.textContent = tag;
        buttonsWrapper.appendChild(btn);
      });

      // Event listeners
      buttonsWrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-tag-btn');
        if (!btn) return;

        const tag = btn.dataset.tag;

        if (tag === 'all') {
          state.activeTags.clear();
          buttonsWrapper.querySelectorAll('.filter-tag-btn').forEach(b => {
            b.classList.remove('active');
          });
          btn.classList.add('active');
        } else {
          buttonsWrapper.querySelector('[data-tag="all"]').classList.remove('active');
          
          if (state.activeTags.has(tag)) {
            state.activeTags.delete(tag);
            btn.classList.remove('active');
          } else {
            state.activeTags.add(tag);
            btn.classList.add('active');
          }

          // אם לא נבחרה אף תגית, חזור ל"הכל"
          if (state.activeTags.size === 0) {
            buttonsWrapper.querySelector('[data-tag="all"]').classList.add('active');
          }
        }

        applyFilters();
      });

      tagsContainer.appendChild(buttonsWrapper);
      return tagsContainer;
    }

    /**
     * רינדור אפשרויות מיון
     */
    function renderSortOptions() {
      if (!options.sortOptions || options.sortOptions.length === 0) {
        return null;
      }

      const sortContainer = document.createElement('div');
      sortContainer.className = 'filter-sort mb-3';

      const label = document.createElement('label');
      label.className = 'form-label text-white';
      label.textContent = options.sortLabel || 'מיין לפי:';

      const wrapper = document.createElement('div');
      wrapper.className = 'd-flex gap-2';

      const select = document.createElement('select');
      select.className = 'form-select bg-dark text-white border-secondary filter-sort-select';
      
      // אפשרות ברירת מחדל
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'ברירת מחדל';
      select.appendChild(defaultOption);

      // אפשרויות מיון
      options.sortOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
      });

      // כפתור היפוך סדר
      const orderBtn = document.createElement('button');
      orderBtn.className = 'btn btn-outline-secondary filter-order-btn';
      orderBtn.innerHTML = '<i class="bi bi-sort-down"></i>';
      orderBtn.title = 'הפוך סדר מיון';

      select.addEventListener('change', (e) => {
        state.sortBy = e.target.value || null;
        applyFilters();
      });

      orderBtn.addEventListener('click', () => {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        orderBtn.innerHTML = state.sortOrder === 'asc' 
          ? '<i class="bi bi-sort-down"></i>' 
          : '<i class="bi bi-sort-up"></i>';
        applyFilters();
      });

      wrapper.appendChild(select);
      wrapper.appendChild(orderBtn);
      sortContainer.appendChild(label);
      sortContainer.appendChild(wrapper);

      return sortContainer;
    }

    /**
     * רינדור סטטיסטיקות
     */
    function renderStats(filteredCount, totalCount) {
      let statsEl = containerEl.querySelector('.filter-stats');
      
      if (!statsEl) {
        statsEl = document.createElement('div');
        statsEl.className = 'filter-stats alert alert-info';
        containerEl.appendChild(statsEl);
      }

      statsEl.innerHTML = `
        <i class="bi bi-info-circle me-2"></i>
        מציג <strong>${filteredCount}</strong> מתוך <strong>${totalCount}</strong> פריטים
      `;

      statsEl.style.display = filteredCount !== totalCount ? 'block' : 'none';
    }

    /**
     * החלת הפילטרים
     */
    function applyFilters() {
      const filtered = SearchModule.searchAndSort(items, {
        searchTerm: state.searchTerm,
        searchFields: filterFields,
        tags: state.activeTags.size > 0 ? Array.from(state.activeTags) : null,
        tagField: options.tagField || 'tags',
        sortBy: state.sortBy,
        order: state.sortOrder
      });

      if (options.showStats !== false) {
        renderStats(filtered.length, items.length);
      }

      if (onFilter) {
        onFilter(filtered, state);
      }

      return filtered;
    }

    /**
     * איפוס כל הפילטרים
     */
    function reset() {
      state.searchTerm = '';
      state.activeTags.clear();
      state.sortBy = options.defaultSort || null;
      state.sortOrder = 'asc';

      // איפוס UI
      const searchInput = containerEl.querySelector('.filter-search-input');
      if (searchInput) searchInput.value = '';

      const tagButtons = containerEl.querySelectorAll('.filter-tag-btn');
      tagButtons.forEach(btn => btn.classList.remove('active'));
      
      const allBtn = containerEl.querySelector('[data-tag="all"]');
      if (allBtn) allBtn.classList.add('active');

      const sortSelect = containerEl.querySelector('.filter-sort-select');
      if (sortSelect) sortSelect.value = '';

      applyFilters();
    }

    /**
     * אתחול הממשק
     */
    function init() {
      containerEl.innerHTML = '';
      containerEl.className = 'filters-container glass p-3 rounded mb-4';

      // הוספת כותרת
      if (options.title) {
        const title = document.createElement('h5');
        title.className = 'text-warning mb-3';
        title.innerHTML = `<i class="bi bi-funnel"></i> ${options.title}`;
        containerEl.appendChild(title);
      }

      // הוספת רכיבי UI
      const searchBox = renderSearchBox();
      if (searchBox) containerEl.appendChild(searchBox);

      const tagButtons = renderTagButtons();
      if (tagButtons) containerEl.appendChild(tagButtons);

      const sortOptions = renderSortOptions();
      if (sortOptions) containerEl.appendChild(sortOptions);

      // כפתור איפוס
      const resetBtn = document.createElement('button');
      resetBtn.className = 'btn btn-sm btn-outline-danger mt-2';
      resetBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> אפס פילטרים';
      resetBtn.addEventListener('click', reset);
      containerEl.appendChild(resetBtn);

      // החלת פילטרים ראשוני
      applyFilters();
    }

    // אתחול
    init();

    // Public API
    return {
      applyFilters,
      reset,
      getState: () => ({ ...state }),
      setState: (newState) => {
        Object.assign(state, newState);
        applyFilters();
      }
    };
  }

  /**
   * יצירת פילטר פשוט בלי UI
   * @param {Array} items - הפריטים לפילטור
   * @param {Function} onChange - callback לשינויים
   * @returns {Object}
   */
  function createSimpleFilter(items, onChange) {
    const state = {
      searchTerm: '',
      tags: [],
      sortBy: null,
      sortOrder: 'asc'
    };

    function apply() {
      const filtered = SearchModule.searchAndSort(items, {
        searchTerm: state.searchTerm,
        searchFields: ['title', 'name', 'description', 'superName', 'privateName'],
        tags: state.tags.length > 0 ? state.tags : null,
        sortBy: state.sortBy,
        order: state.sortOrder
      });

      if (onChange) onChange(filtered);
      return filtered;
    }

    return {
      setSearch: (term) => { state.searchTerm = term; return apply(); },
      setTags: (tags) => { state.tags = Array.isArray(tags) ? tags : [tags]; return apply(); },
      setSort: (by, order = 'asc') => { state.sortBy = by; state.sortOrder = order; return apply(); },
      reset: () => { 
        state.searchTerm = ''; 
        state.tags = []; 
        state.sortBy = null; 
        state.sortOrder = 'asc';
        return apply(); 
      },
      getState: () => ({ ...state })
    };
  }

  // Public API
  return {
    createFilterUI,
    createSimpleFilter
  };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FiltersModule;
}
