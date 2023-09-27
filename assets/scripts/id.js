let Hero = [{
    "superName": "פלאדין",
    "privateName": "יואב רמון",
    "Powers": "רפלקסים גבוהים ומשופרים",
    "img": "contents\\avatars\\paladin.png"
    },
    {
    "superName": "אסטרל",
    "privateName": "מיקה/הנסיכה מיאנסקה",
    "Powers": "טלפתיה והשתגרות שמיימית",
    "img": "contents\\avatars\\astral.png"
    },{
    "superName": "וולטאז'",
    "privateName": "אדם אטלס",
    "Powers": "יריית חשמל",
    "img": "contents\\avatars\\voltage.png"
    },{
    "superName": "ג'ייגנטיק",
    "privateName": "מיכה הייד",
    "Powers": "חוזקת על ושרירי ענק",
    "img": "contents\\avatars\\gigantic.png"
    },{
    "superName":"קומראד",
    "privateName": "רועי",
    "Powers": "ירי פלזמה גרעינית",
    "img": "contents\\avatars\\comrade.png"
    },{
    "superName":"צונאמי",
    "privateName": "אגם",
    "Powers": "שליטה בצורות המים",
    "img": "contents\\avatars\\tsunami.png"
    },{
    "superName":"דרגון פייטר",
    "privateName": "דוד",
    "Powers": "שליטה באמנות הדרקון",
    "img": "contents\\avatars\\dragon.png"
    },{
        "superName":"סימבול",
        "privateName": "שחר",
        "Powers": "תעופת על, חוזקת ועוד",
        "img": "contents\\avatars\\symbol.png"
    },{
        "superName":"סייז",
        "privateName": "בני גורדון",
        "Powers": "גדילה לממדי ענק",
        "img": "contents\\avatars\\size.png"
    },{
        "superName":"מריפוסה",
        "privateName": "נטלי אנדור",
        "Powers": "קסם פיות",
        "img": "contents\\avatars\\mariposa.png"
    },{
        "superName":"אנפורסר",
        "privateName": "אבי רמון",
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
        "privateName": "אור אנרדסן",
        "Powers": "יצירת אורות",
        "img": "contents\\avatars\\northlight.png"
    },{
        "superName":"קפטן חלל",
        "privateName": "דניאל אוקס",
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
        document.querySelector(".id").style.backgroundImage = "url('" + Random.img + "')";
    }
    
    Id();