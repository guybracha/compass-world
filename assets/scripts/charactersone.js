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
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: רפלקסים משופרים";
      characterImageElement.src = "assets/scripts/ref/paladin.png";
    } else if (selectedCharacter === "character2") {
      characterNameElement.textContent = "וולטאז'";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: מהירות על ויריית חשמל";
      characterImageElement.src = "assets/scripts/ref/voltage.png";
    } else if (selectedCharacter === "character3") {
      characterNameElement.textContent = "ליידי אסטרל";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: טלפתיה ותקשורת שמיימית";
      characterImageElement.src = "assets/scripts/ref/astral.png";
    } else if (selectedCharacter === "character4") {
      characterNameElement.textContent = "קומראד";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: ספיגת פלזמה ואנרגיה גרעינית";
      characterImageElement.src = "assets/scripts/ref/comrade.png";
    } else if (selectedCharacter === "character5") {
      characterNameElement.textContent = "ג'ייגנטיק";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: חוזק על ושרירי ענק";
      characterImageElement.src = "assets/scripts/ref/gigantic.png";
    } else if (selectedCharacter === "character6") {
      characterNameElement.textContent = "דרגון פייטר";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: גישה לכל אמנויות הלחימה הסודיות של המזרח";
      characterImageElement.src = "assets/scripts/ref/dragon.png";
    } else if (selectedCharacter === "character7") {
      characterNameElement.textContent = "סייז";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: גדילה והתכווצות בממדים שונים";
      characterImageElement.src = "assets/scripts/ref/size.png";
    } else if (selectedCharacter === "character8") {
      characterNameElement.textContent = "מריפוסה";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: קסם פיות";
      characterImageElement.src = "assets/scripts/ref/mariposa.png";
    } else if (selectedCharacter === "character9") {
      characterNameElement.textContent = "צונאמי";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: שליטה בצורות המים באשר הם";
      characterImageElement.src = "assets/scripts/ref/tsunami.png";
    } else if (selectedCharacter === "character10") {
      characterNameElement.textContent = "סימבול";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח: תעופה וראייה סולארית";
      characterImageElement.src = "assets/scripts/ref/symbol.png";
    }
  }
  