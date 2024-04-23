var Hero = /** @class */ (function () {
    function Hero(superName, powers, imgUrl, quote) {
        this.superName = superName;
        this.powers = powers;
        this.imgUrl = imgUrl;
        this.quote = quote;
    }
    return Hero;
}());
function whoAmI(quote) {
    alert("".concat(quote));
}
