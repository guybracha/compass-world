function displayCharacterDetails() {
    var characterDropdown = document.getElementById("characterDropdown");
    var characterNameElement = document.getElementById("characterName");
    var characterBioElement = document.getElementById("characterBiography");
    var characterPowerElement = document.getElementById("characterPower");
    var characterImageElement = document.getElementById("characterImage");
    
    // Clear previous character details
    characterNameElement.textContent = "";
    characterBioElement.textContent = "";
    characterPowerElement.textContent = "";
    characterImageElement.src = "";
  
    // Get the selected character value
    var selectedCharacter = characterDropdown.value;
  
    // Display details based on the selected character
    if (selectedCharacter === "character1") {
      characterNameElement.textContent = "פלאדין";
      characterBioElement.textContent = "ביוגרפיה: בעקבות בילוי בתא לחץ נסיוני, שופרו יכולות הרפלקסים של מרדכי רמון במאות אחוזים. משמש כמנהיג הצוות. אח גדול לאנפורסר ולמלודי.";
      characterPowerElement.textContent = "כוח: רפלקסים משופרים";
      characterImageElement.src = "assets/scripts/ref/paladin.png";
    } else if (selectedCharacter === "character2") {
      characterNameElement.textContent = "וולטאז'";
      characterBioElement.textContent = "ביוגרפיה: איבד את הוריו בגיל צעיר, את אחיו הגדול איבד בנעוריו. קיבל את כוחותיו החשמליים לאחר שספג פיצוץ חשמלי מהמצאה שהתקלקלה. משרת בתור ממציא ההמצאות של הצוות.";
      characterPowerElement.textContent = "כוח: מהירות על ויריית חשמל";
      characterImageElement.src = "assets/scripts/ref/voltage.png";
    } else if (selectedCharacter === "character3") {
      characterNameElement.textContent = "ליידי אסטרל";
      characterBioElement.textContent = "ביוגרפיה: נולדה כנסיכה למשפחת מלוכה אי שם בכוכבים, אך מצאה את מקומה בכדור הארץ לאחר ביצוע הפיכה בעולם הבית שלה. אוהבת נורא את חבריה וחשוב לה שאף אחד לא יריב.";
      characterPowerElement.textContent = "כוח: טלפתיה ותקשורת שמיימית";
      characterImageElement.src = "assets/scripts/ref/astral.png";
    } else if (selectedCharacter === "character4") {
      characterNameElement.textContent = "קומראד";
      characterBioElement.textContent = "ביוגרפיה: קיבל את כוחותיו בניסוי גרעיני שבוצע עליו בכפייה, ברח מארצו כדי למצוא מקלט במערב. קצת קשוח וחריף, אבל חם ואוהב שמתגעגע למשפחתו.";
      characterPowerElement.textContent = "כוח: ספיגת פלזמה ואנרגיה גרעינית";
      characterImageElement.src = "assets/scripts/ref/comrade.png";
    } else if (selectedCharacter === "character5") {
      characterNameElement.textContent = "ג'ייגנטיק";
      characterBioElement.textContent = "ביוגרפיה: חלם להיות ספורטאי מצליח, אבל שאיפתו נקטעה כאשר אביו הכימאי הזריק לו נסיוב סטרואידים שנתן לו את שריריו העצומים. בשעות הפנאי נוהג לברוח ממטלות כדי לשחק שש-בש בפנאן.";
      characterPowerElement.textContent = "כוח: חוזק על ושרירי ענק";
      characterImageElement.src = "assets/scripts/ref/gigantic.png";
    } else if (selectedCharacter === "character6") {
      characterNameElement.textContent = "דרגון פייטר";
      characterBioElement.textContent = "ביוגרפיה: דרקון אנושי צעיר שגורש ממקדשו לאחר שהואשם על לא עוול בכפו ברצח המורה שלו, מצא את גאולתו בחבורה לאחר שהבין שכל אחד הוא תוצר של חריגות ונידוי.";
      characterPowerElement.textContent = "כוח: גישה לכל אמנויות הלחימה הסודיות של המזרח";
      characterImageElement.src = "assets/scripts/ref/dragon.png";
    } else if (selectedCharacter === "character7") {
      characterNameElement.textContent = "סייז";
      characterBioElement.textContent = "ביוגרפיה: מצא יום אחד את חליפת הניסוי שהשאיר אביו שנעלם כמה שנים לפני, גילה שהחליפה בעצם יכול לשנות את מידותיו של כל מי שלובש אותה. נחשב עילוי מדעי.";
      characterPowerElement.textContent = "כוח: גדילה והתכווצות בממדים שונים";
      characterImageElement.src = "assets/scripts/ref/size.png";
    } else if (selectedCharacter === "character8") {
      characterNameElement.textContent = "מריפוסה";
      characterBioElement.textContent = "ביוגרפיה: החברה החדשה של הצוות, פיה שהחלה להתעסק בקסמים ובתעופה לפני חצי שנה, הצטרפה לצוות לאחר שניצלה מציידים מסתוריים שרצו את כוחותיה. חברה טובה של סייז.";
      characterPowerElement.textContent = "כוח: קסם פיות";
      characterImageElement.src = "assets/scripts/ref/mariposa.png";
    } else if (selectedCharacter === "character9") {
      characterNameElement.textContent = "צונאמי";
      characterBioElement.textContent = "ביוגרפיה: בת ים ממושבה באוקיינוס האטלנטי שכל חייה הרגישה מנודה, ברחה לעולם היבשה כדי למצוא מקום שבו תרגיש שייכת, ככה הכירה את פלאדין והחבורה.";
      characterPowerElement.textContent = "כוח: שליטה בצורות המים באשר הם";
      characterImageElement.src = "assets/scripts/ref/tsunami.png";
    } else if (selectedCharacter === "character10") {
      characterNameElement.textContent = "סימבול";
      characterBioElement.textContent = "ביוגרפיה: נוצר כדי להיות אל סינתטי דמוי-אנוש, אך הצליח לברוח מהמעבדה שבה הוא נוצר, התחיל כמגנה של העיר מאוטיינס סיטי, ולאחר מכן החליט להצטרף לחבורה של פלאדין.";
      characterPowerElement.textContent = "כוח: תעופה וראייה סולארית";
      characterImageElement.src = "assets/scripts/ref/symbol.png";
    }
  }
  