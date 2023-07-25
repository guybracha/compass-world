let Hero = [{
    Hero_Name: "פלאדין",
    Private_Name: "מרדכי רמון",
    Powers: "רפלקסים משופרים",
    Image: "contents\\avatars\\paladin.png",
}, {
    Hero_Name: "אסטרל",
    Private_Name: "מיאנסקה",
    Powers: "טלפתיה וראיית העתיד",
    Image: "contents\\avatars\\astral.png",
}, {
    Hero_Name: "וולטאז'",
    Private_Name: "אלק אטלס",
    Powers: "יריית חשמל ומהירות על",
    Image: "contents\\avatars\\voltage.png",
}, {
    Hero_Name: "ג'ייגנטיק",
    Private_Name: "מיכה הייד",
    Powers: "שרירי על וחוזקה אדירה",
    Image: "contents\\avatars\\gigantic.png",
}, {
    Hero_Name: "קומראד",
    Private_Name: "מיכה אלחימסקי",
    Powers: "ספיגה גרעינית וירייתה החוצה",
    Image: "contents\\avatars\\comrade.png",
},{
    Hero_Name: "מריפוסה",
    Private_Name: "נלי אנדור",
    Powers: "קסם פיות",
    Image: "contents\\avatars\\mariposa.png",
}];

const Random = Hero[Math.floor(Math.random() * Hero.length)];

function Id() {
    document.getElementById("heroName").innerHTML = "שם על: " + Random.Hero_Name;
    document.getElementById("Private").innerHTML = "שם פרטי: " + Random.Private_Name;
    document.getElementById("powers").innerHTML = "כוחות: " + Random.Powers;
    document.getElementById("image").src = Random.Image;
}

Id();