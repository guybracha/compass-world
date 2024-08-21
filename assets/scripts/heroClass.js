class heroClass{
    constructor(superName,privateName,Powers,img,quote){
        this.superName =  superName;
        this.privateName = privateName;
        this.Powers = Powers;
        this.img = img;
        this.quote = quote;
    }
    myText(buttonElement) {
        const quoteParagraph = buttonElement.nextElementSibling;
        quoteParagraph.innerHTML = this.quote;
    }
    
    render(){
        let div = document.createElement("div");
        div.className = "col-md-4";
        document.querySelector("#showMe").append(div);
    
        div.innerHTML = `
            <div class="card">
                <img src="${this.img}" alt="${this.superName}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${this.superName}</h5>
                    <p class="card-text">Secret identity: ${this.privateName}</p>
                    <p class="card-text">Powers: ${this.Powers}</p>
                    <p class="card-text"><i>${this.quote}</i></p>
                </div>
            </div>
        `;
    }    
}    