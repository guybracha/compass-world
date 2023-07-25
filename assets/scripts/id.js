let Hero = [{
    Hero_Name: "פלאדין",
    Private_Name: "מרדכי רמון",
    Powers: "רפלקסים משופרים",
    Image: "C:\\Users\\guybr\\OneDrive\\שולחן העבודה\\CompassHtml\\compass-world\\assets\\scripts\\ref\\paladin.png",
}, {
    Hero_Name: "אסטרל",
    Private_Name: "מיאנסקה",
    Powers: "טלפתיה וראיית העתיד",
    Image: "C:\\Users\\guybr\\OneDrive\\שולחן העבודה\\CompassHtml\\compass-world\\assets\\scripts\\ref\\astral.png",
}, {
    Hero_Name: "וולטאז'",
    Private_Name: "אלק אטלס",
    Powers: "יריית חשמל ומהירות על",
    Image: "C:\\Users\\guybr\\OneDrive\\שולחן העבודה\\CompassHtml\\compass-world\\assets\\scripts\\ref\\voltage.png",
}];

const Random = Hero[Math.floor(Math.random() * Hero.length)];

function Id() {
    document.getElementById("heroName").innerHTML = "שם על: " + Random.Hero_Name;
    document.getElementById("Private").innerHTML = "שם פרטי: " + Random.Private_Name;
    document.getElementById("powers").innerHTML = "כוחות: " + Random.Powers;
    document.getElementById("image").src = Random.Image;
}

Id();