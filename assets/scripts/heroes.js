const init = () =>{
    createList();
}

const createList = () => {
    superList.forEach((item) =>{
        let vip1 = new heroClass(item.superName,item.privateName,item.Powers,item.img);
        vip1.render();
    })
}

init();