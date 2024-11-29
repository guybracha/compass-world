let heroes = ["Paladin","Voltage","Lady Astral","Gigatnic","Comrade","Tsunami","Eastwind","Sunshine","Jupiterian"];

const surprise = heroes[(Math.floor(Math.random() * (heroes.length)))];
function clickMe(){
    document.getElementById("random").innerHTML = "<h1>And our Hero is... " + "<i>" + surprise + "</i>" + "</h1>";
    document.getElementById("random").style = "font-size: 40px; color: blue; text-align: center;";
}