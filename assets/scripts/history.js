// Enhanced with modular search and filter functionality
let originalHistoryList = [];

const init = () => {
  if (typeof HistoryList !== 'undefined') {
    originalHistoryList = [...HistoryList];
  }
  createList();
  
  // אתחול ניווט
  if (typeof NavigationModule !== 'undefined') {
    NavigationModule.init({
      currentPage: 'history'
    });
  }
};

const createList = (itemsToShow = null) => {
  const host = document.querySelector("#showMe");
  if (!host) return;

  // נקה לפני רינדור (אם מרנדרים שוב)
  host.innerHTML = "";

  const items = itemsToShow || originalHistoryList || HistoryList;

  items.forEach((item, index) => {
    const historyItem = new HistoryClass(item.year, item.description, item.image, index);
    historyItem.render();
  });
};

// הוספת פונקציית חיפוש ומיון
function setupHistoryFilters() {
  // חיפוש לפי שנה או תיאור
  window.searchHistory = function(term) {
    if (!term || !SearchModule) {
      createList();
      return;
    }

    const filtered = SearchModule.search(originalHistoryList, {
      searchTerm: term,
      searchFields: ['year', 'description']
    });

    createList(filtered);

    if (filtered.length === 0 && typeof UIUtils !== 'undefined') {
      const host = document.querySelector("#showMe");
      if (host) {
        UIUtils.showEmptyState("#showMe", {
          title: 'לא נמצאו אירועים',
          message: 'נסה מונח חיפוש אחר',
          actionText: 'אפס חיפוש',
          actionCallback: () => {
            createList();
          }
        });
      }
    }
  };

  // מיון לפי שנה
  window.sortHistory = function(order = 'asc') {
    if (!SearchModule) {
      createList();
      return;
    }

    const sorted = SearchModule.sort(originalHistoryList, 'year', order);
    createList(sorted);
  };
}

init();
setupHistoryFilters();
