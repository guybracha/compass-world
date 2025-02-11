let heroes = ["Paladin", "Voltage", "Lady Astral", "Gigatnic", "Comrade", "Tsunami", "Eastwind", "Sunshine", "Jupiterian", "Symbol", "Captain Space"];

function clickMe() {
    let countdown = 3;
    let countdownElement = document.getElementById("random");
    
    let interval = setInterval(() => {
        countdownElement.innerHTML = `<h1>${countdown}</h1>`;
        countdownElement.style = "font-size: 40px; color: red; text-align: center;";
        countdown--;
        
        if (countdown < 0) {
            clearInterval(interval);
            revealHero();
        }
    }, 1000);
}

function revealHero() {
    let surprise = heroes[Math.floor(Math.random() * heroes.length)];
    let randomElement = document.getElementById("random");

    randomElement.innerHTML = `<h1>And our Hero is... <i>${surprise}</i></h1>`;
    randomElement.style = "font-size: 40px; color: blue; text-align: center; opacity: 0;";

    // הוספת אנימציה חלקה לחשיפה
    let opacity = 0;
    let animation = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(animation);
        } else {
            opacity += 0.05;
            randomElement.style.opacity = opacity;
        }
    }, 50);
}
