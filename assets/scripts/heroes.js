const init = () => {
    createList(superList, "#showMeHeroes");
    createList(villainList, "#showMeVillains");
}

const createList = (list, containerId) => {
    list.forEach((item) => {
        // Set default values for missing fields
        let privateName = item.privateName || "Unknown";
        let quote = item.quote || "No quote available.";
        
        let character = new heroClass(item.superName || item.supername, privateName, item.Powers || item.powers, item.img, quote);
        character.render(containerId);
    });
}

init();
