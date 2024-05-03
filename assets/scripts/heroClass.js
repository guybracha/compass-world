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
        div.className = "col-md-6 col-sm-6 col-sx-6 border";
        document.querySelector("#showMe").append(div);

        div.innerHTML = `
            <div class="row">
            <div class="col-md-4">
            <img src="${this.img}" alt="${this.superName}" class="img-fluid">
            </div>
            <div class="col-md-8">
            <h2>${this.superName}</h2>
            <div>Secret identity: ${this.privateName}</div>
            <div>Powers: ${this.Powers}</div>
            <p><i>${this.quote}</i></p>  
            </div>
            </div>          
        `
    }
}