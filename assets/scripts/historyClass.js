class HistoryClass {
    constructor(year, description, index) {
        this.year = year;
        this.description = description;
        this.index = index;
    }

    render() {
        let div = document.createElement("div");

        // Alternating layout classes
        div.className = this.index % 2 === 0 ? "timeline-card timeline-card-left bg-warning text-dark" : "timeline-card timeline-card-right bg-info text-dark";

        div.innerHTML = `
            <h5>${this.year}</h5>
            <p>${this.description}</p>
        `;

        document.querySelector("#showMe").append(div);
    }
}
