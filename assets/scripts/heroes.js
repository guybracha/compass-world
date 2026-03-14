// heroes.js
// Enhanced with modular search + category filter functionality
(function () {
  function normPath(p) {
    return (p || "").replace(/\\/g, "/");
  }

  // Store original lists for search/filter functionality
  let originalHeroesList = [];
  let originalVillainsList = [];
  let activeCategory = "all";

  function createList(list, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.warn("[heroes.js] container not found:", containerSelector);
      return;
    }
    container.innerHTML = "";

    list.forEach((item) => {
      const superName   = item.superName   || item.supername   || "Unknown";
      const privateName = item.privateName || "Unknown";
      const powers      = item.Powers      || item.powers      || "Unknown";
      const quote       = item.quote       || "No quote available.";
      const img         = normPath(item.img);
      const category    = item.category    || "";
      const allies      = item.allies      || [];
      const enemies     = item.enemies     || [];
      const stats       = item.stats       || null;

      try {
        const character = new heroClass(superName, privateName, powers, img, quote, category, allies, enemies, stats);
        character.render(containerSelector);
      } catch (err) {
        console.error("[heroes.js] render failed for:", superName, err);
      }
    });
  }

  // Build category filter pills above the heroes grid
  function buildCategoryFilters() {
    const filterHost = document.getElementById("heroCategoryFilters");
    if (!filterHost) return;

    const categories = [...new Set(originalHeroesList.map(h => h.category).filter(Boolean))].sort();

    filterHost.innerHTML = `
      <button class="btn btn-sm btn-warning category-filter active" data-cat="all">All</button>
      ${categories.map(cat =>
        `<button class="btn btn-sm btn-outline-secondary category-filter" data-cat="${cat}">${cat}</button>`
      ).join("")}
    `;

    filterHost.querySelectorAll(".category-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        filterHost.querySelectorAll(".category-filter").forEach(b => b.classList.remove("active", "btn-warning"));
        btn.classList.add("active", "btn-warning");
        btn.classList.remove("btn-outline-secondary");

        activeCategory = btn.dataset.cat;
        applyFiltersAndRender();
      });
    });
  }

  function applyFiltersAndRender() {
    const searchInput = document.getElementById("heroesSearchInput");
    const searchTerm  = searchInput ? searchInput.value.trim() : "";

    let filtered = originalHeroesList;

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(h => h.category === activeCategory);
    }

    // Text search
    if (searchTerm && typeof SearchModule !== "undefined") {
      filtered = SearchModule.search(filtered, {
        searchTerm,
        searchFields: ["superName", "privateName", "Powers", "category"]
      });
    }

    createList(filtered, "#showMeHeroes");

    // Villains: only text search, no category
    let filteredVillains = originalVillainsList;
    if (searchTerm && typeof SearchModule !== "undefined") {
      filteredVillains = SearchModule.search(filteredVillains, {
        searchTerm,
        searchFields: ["supername", "powers"]
      });
    }
    createList(filteredVillains, "#showMeVillains");

    if (filtered.length === 0) {
      const heroesContainer = document.querySelector("#showMeHeroes");
      if (heroesContainer) {
        heroesContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-search text-warning" style="font-size:3rem;"></i>
            <h4 class="text-white mt-3">No results found</h4>
            <p class="text-secondary">Try a different search or category</p>
          </div>`;
      }
    }
  }

  function setupSearch() {
    const searchInput = document.getElementById("heroesSearchInput");
    const clearBtn    = document.getElementById("clearHeroSearch");
    if (!searchInput) return;

    searchInput.addEventListener("input", applyFiltersAndRender);
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        applyFiltersAndRender();
      });
    }
  }

  function init() {
    if (typeof superList === "undefined" || typeof villainList === "undefined") {
      console.error("[heroes.js] Data lists not loaded. Check script order.");
      return;
    }

    originalHeroesList  = [...superList];
    originalVillainsList = [...villainList];

    createList(superList,    "#showMeHeroes");
    createList(villainList,  "#showMeVillains");

    buildCategoryFilters();
    setupSearch();

    if (typeof NavigationModule !== "undefined") {
      NavigationModule.init({ currentPage: "files" });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
