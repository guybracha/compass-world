class Hero{
    superName: String;
    powers: String;
    imgUrl: String;
    quote: String;

    constructor(superName: String, powers: String, imgUrl: String, quote: String){
        this.superName = superName;
        this.powers = powers;
        this.imgUrl = imgUrl;
        this.quote = quote;
    }
}
function whoAmI(quote: String): void{
        alert(`${quote}`);
}