const init = () => {
  createList();
};

const createList = () => {
  const host = document.querySelector("#showMe");
  if (!host) return;

  // נקה לפני רינדור (אם מרנדרים שוב)
  host.innerHTML = "";

  HistoryList.forEach((item, index) => {
    const historyItem = new HistoryClass(item.year, item.description, index);
    historyItem.render();
  });
};

init();
