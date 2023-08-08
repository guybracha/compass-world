let Hero = [{
    "superName": "פלאדין",
    "privateName": "מודי רמון",
    "Powers": "רפלקסים גבוהים ומשופרים",
    "img": "contents\\avatars\\paladin.png"
    },
    {
    "superName": "אסטרל",
    "privateName": "הנסיכה מיאנסקה",
    "Powers": "טלפתיה והשתגרות שמיימית",
    "img": "contents\\avatars\\astral.png"
    },{
    "superName": "וולטאז'",
    "privateName": "אלק אטלס",
    "Powers": "יריית חשמל",
    "img": "contents\\avatars\\voltage.png"
    },{
    "superName": "ג'ייגנטיק",
    "privateName": "מיכה הייד",
    "Powers": "חוזקת על ושרירי ענק",
    "img": "contents\\avatars\\gigantic.png"
    },{
    "superName":"קומראד",
    "privateName": "רוסלן",
    "Powers": "ירי פלזמה גרעינית",
    "img": "contents\\avatars\\comrade.png"
    },{
    "superName":"צונאמי",
    "privateName": "טליה",
    "Powers": "שליטה בצורות המים",
    "img": "contents\\avatars\\tsunami.png"
    },{
    "superName":"דרגון פייטר",
    "privateName": "בלייק וו-צ'אנג",
    "Powers": "שליטה באמנות הדרקון",
    "img": "contents\\avatars\\dragon.png"
    },{
        "superName":"סימבול",
        "privateName": "נתניאל",
        "Powers": "תעופת על, חוזקת ועוד",
        "img": "contents\\avatars\\symbol.png"
    },{
        "superName":"סייז",
        "privateName": "בן גורדון",
        "Powers": "גדילה לממדי ענק",
        "img": "contents\\avatars\\size.png"
    },{
        "superName":"מריפוסה",
        "privateName": "נלי אנדור",
        "Powers": "קסם פיות",
        "img": "contents\\avatars\\mariposa.png"
    },{
        "superName":"אנפורסר",
        "privateName": "אלי רמון",
        "Powers": "בלש על, ראיית רנטגן",
        "img": "contents\\avatars\\enforcer.png"
    },{
        "superName":"מלודי",
        "privateName": "שירה רמון",
        "Powers": "גלי קול",
        "img": "contents\\avatars\\melody.png"
    },{
        "superName":"טכנולאד",
        "privateName": "אריק קרלטון",
        "Powers": "טכנופתיה - תקשורת עם מכונות",
        "img": "contents\\avatars\\techno.png"
    },{
        "superName":"רוקט פריים",
        "privateName": "חי גרינברג",
        "Powers": "שריון טילים היכול להטיס אותו",
        "img": "contents\\avatars\\rocket.png"
    },{
        "superName":"נורת'לייט",
        "privateName": "אורורה אנרדסן",
        "Powers": "יצירת אורות",
        "img": "contents\\avatars\\northlight.png"
    },{
        "superName":"קפטן חלל",
        "privateName": "דן אוקס",
        "Powers": "יצירת אובייקטים מריק",
        "img": "contents\\avatars\\captain.png"
    },{
        "superName":"הרקאדיוס",
        "privateName": "הרקאדיוס",
        "Powers": "קנטאור, מומחה בחרבות",
        "img": "contents\\avatars\\harkadius.png"
    },{
        "superName":"הייליתיאה",
        "privateName": "הייליתיאה",
        "Powers": "קנטאורית, מומחית בחץ וקשת",
        "img": "contents\\avatars\\hallethea.png"
    }];

const Random = Hero[Math.floor(Math.random() * Hero.length)];

function Id() {
    document.getElementById("heroName").innerHTML = "שם על: " + Random.superName;
    document.getElementById("Private").innerHTML = "שם פרטי: " + Random.privateName;
    document.getElementById("powers").innerHTML = "כוחות: " + Random.Powers;
    document.getElementById("image").src = Random.img;
}

Id();