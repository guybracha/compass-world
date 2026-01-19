// heroes.js
// Enhanced with modular search functionality
(function () {
  function normPath(p) {
    return (p || "").replace(/\\/g, "/");
  }

  // Store original lists for search functionality
  let originalHeroesList = [];
  let originalVillainsList = [];

  function createList(list, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.warn("[heroes.js] container not found:", containerSelector);
      return;
    }
    // נקה לפני רינדור (כדי לא לצבור כפילויות בריענון)
    container.innerHTML = "";

    list.forEach((item) => {
      const superName = item.superName || item.supername || "Unknown";
      const privateName = item.privateName || "Unknown";
      const powers = item.Powers || item.powers || "Unknown";
      const quote = item.quote || "No quote available.";
      const img = normPath(item.img);

      try {
        const character = new heroClass(superName, privateName, powers, img, quote);
        character.render(containerSelector);
      } catch (err) {
        console.error("[heroes.js] render failed for:", superName, err);
      }
    });
  }

  function setupSearch() {
    const searchInput = document.getElementById('heroesSearchInput');
    const clearBtn = document.getElementById('clearHeroSearch');

    if (!searchInput || !SearchModule) return;

    function performSearch() {
      const searchTerm = searchInput.value.trim();

      // חיפוש גיבורים
      const filteredHeroes = SearchModule.search(originalHeroesList, {
        searchTerm,
        searchFields: ['superName', 'supername', 'privateName', 'powers', 'Powers']
      });

      // חיפוש נבלים
      const filteredVillains = SearchModule.search(originalVillainsList, {
        searchTerm,
        searchFields: ['superName', 'supername', 'privateName', 'powers', 'Powers']
      });

      // עדכון תצוגה
      createList(filteredHeroes, "#showMeHeroes");
      createList(filteredVillains, "#showMeVillains");

      // הצגת הודעה אם אין תוצאות
      if (searchTerm && filteredHeroes.length === 0 && filteredVillains.length === 0) {
        if (typeof UIUtils !== 'undefined') {
          const activeTab = document.querySelector('.tab-pane.active');
          if (activeTab) {
            const container = activeTab.querySelector('.row[id^="showMe"]');
            if (container) {
              container.innerHTML = `
                <div class="col-12 text-center py-5">
                  <i class="bi bi-search text-warning" style="font-size: 3rem;"></i>
                  <h4 class="text-white mt-3">לא נמצאו תוצאות</h4>
                  <p class="text-secondary">נסה מונח חיפוש אחר</p>
                </div>
              `;
            }
          }
        }
      }
    }

    searchInput.addEventListener('input', performSearch);
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
      });
    }
  }

  function init() {
    if (typeof superList === "undefined" || typeof villainList === "undefined") {
      console.error("[heroes.js] Data lists not loaded. Check script order.");
      return;
    }

    // שמירת הרשימות המקוריות
    originalHeroesList = [...superList];
    originalVillainsList = [...villainList];

    createList(superList, "#showMeHeroes");
    createList(villainList, "#showMeVillains");

    // אתחול חיפוש
    setupSearch();

    // אתחול ניווט
    if (typeof NavigationModule !== 'undefined') {
      NavigationModule.init({
        currentPage: 'files'
      });
    }
  }

  // אם הסקריפט נטען עם defer, ה-DOM כבר מוכן; בכל מקרה נקשיב לגיבוי:
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
