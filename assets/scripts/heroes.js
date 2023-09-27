const init = () =>{
    createList();
}

const createList = () => {
    superList.forEach((item) =>{
        let vip1 = new heroClass(item.superName,item.privateName,item.Powers,item.img,item.quote);
        vip1.render();
    })
}

init();