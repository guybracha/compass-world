const init = () =>{
    createList();
}

const createList = () => {
    HistoryList.forEach((item) =>{
        let vip1 = new HistoryClass(item.year,item.description);
        vip1.render();
    })
}

init();