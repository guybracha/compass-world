// heroes.js
(function () {
  function normPath(p) {
    return (p || "").replace(/\\/g, "/");
  }

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

  function init() {
    if (typeof superList === "undefined" || typeof villainList === "undefined") {
      console.error("[heroes.js] Data lists not loaded. Check script order.");
      return;
    }
    createList(superList, "#showMeHeroes");
    createList(villainList, "#showMeVillains");
  }

  // אם הסקריפט נטען עם defer, ה-DOM כבר מוכן; בכל מקרה נקשיב לגיבוי:
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
