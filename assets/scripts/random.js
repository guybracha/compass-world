let heroes = ["פלאדין", "וולטאז'", "אסטרל", "דרגון פייטר", "סייז", "מריפוסה", "ג'ייגנטיק", "קומראד", "צונאמי", "סימבול", "אנפורסר", "נורת'לייט", "מלודי", "טכנו", "רוקט פריים","קפטן חלל","הרקאדיוס והייליתיאה"];

const surprise = heroes[(Math.floor(Math.random() * (heroes.length)))];
function clickMe(){
    document.getElementById("random").innerHTML = "<h1>And our Hero is... " + "<i>" + surprise + "</i>" + "</h1>";
    document.getElementById("random").style = "font-size: 40px; color: blue; text-align: center;";
}