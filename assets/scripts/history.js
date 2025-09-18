const init = () => {
  createList();
};

const createList = () => {
  const host = document.querySelector("#showMe");
  if (!host) return;

  // נקה לפני רינדור (אם מרנדרים שוב)
  host.innerHTML = "";

  HistoryList.forEach((item, index) => {
    const historyItem = new HistoryClass(item.year, item.description, item.image, index);
    historyItem.render();
  });
};

init();
