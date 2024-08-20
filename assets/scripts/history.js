const init = () => {
    createList();
}

const createList = () => {
    HistoryList.forEach((item, index) => {
        let historyItem = new HistoryClass(item.year, item.description, index);
        historyItem.render();
    });
}

init();
