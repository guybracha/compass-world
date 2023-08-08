class HistoryClass {
    constructor(year,description){
        this.year = year;
        this.description = description;
    }
    render(){
        let div = document.createElement("div");
        div.className = "col-md-12 border";
        document.querySelector("#showMe").append(div);

        div.innerHTML = `
            <h2>${this.year}</h2>
            <div>${this.description}</div>
        `
    }
}