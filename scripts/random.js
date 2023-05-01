let heroes = ["Paladin", "Voltage", "Astral", "Dragon Fighter", "Size", "Mariposa", "Gigantic", "Comrade", "Tsunami", "Symbol", "Enforcer", "Northlight", "Melody", "Techno", "Rocket Prime"];

const surprise = heroes[(Math.floor(Math.random() * (heroes.length)))];
function clickMe(){
alert("This time the hero is " + surprise);
}