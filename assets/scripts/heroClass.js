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
        div.className = "col-md-6 border";
        document.querySelector("#showMe").append(div);

        div.innerHTML = `
            <img src="${this.img}" alt="${this.superName}" class="w-25 float-start me-2">
            <h2>${this.superName}</h2>
            <div>שם פרטי: ${this.privateName}</div>
            <div>כוחות: ${this.Powers}</div>
            <p>${this.quote}</p>            
        `
    }
}