class heroClass {
    constructor(superName, privateName = "Unknown", Powers, img, quote = "No quote available.") {
        this.superName = superName;
        this.privateName = privateName;
        this.Powers = Powers;
        this.img = img;
        this.quote = quote;
    }

    render(containerId) {
        let div = document.createElement("div");
        div.className = "col-md-4";
        document.querySelector(containerId).append(div);

        div.innerHTML = `
            <div class="card">
                <img src="${this.img}" alt="${this.superName}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${this.superName}</h5>
                    <p class="card-text">Secret identity: ${this.privateName}</p>
                    <p class="card-text">Powers: ${this.Powers}</p>
                </div>
            </div>
        `;
    }
}
