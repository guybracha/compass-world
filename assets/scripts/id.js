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
},{
    Hero_Name: "סימבול",
    Private_Name: "נתניאל כהן",
    Powers: "יכולות על אנושיות",
    Image: "contents\\avatars\\symbol.png",
},{
    Hero_Name: "צונאמי",
    Private_Name: "טליה",
    Powers: "שליטה במים",
    Image: "contents\\avatars\\tsunami.png",
},{
    Hero_Name: "דרגון פייטר",
    Private_Name: "בלייק וו-צ'אנג",
    Powers: "שליטת בסודות הקונג-פו",
    Image: "contents\\avatars\\dragon.png",
},{
    Hero_Name: "סייז",
    Private_Name: "בן גורדון",
    Powers: "גדילה וצמיחה לממדי על",
    Image: "contents\\avatars\\size.png",
}];

const Random = Hero[Math.floor(Math.random() * Hero.length)];

function Id() {
    document.getElementById("heroName").innerHTML = "שם על: " + Random.Hero_Name;
    document.getElementById("Private").innerHTML = "שם פרטי: " + Random.Private_Name;
    document.getElementById("powers").innerHTML = "כוחות: " + Random.Powers;
    document.getElementById("image").src = Random.Image;
}

Id();