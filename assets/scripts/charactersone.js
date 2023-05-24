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
      characterPowerElement.textContent = "כוח";
      characterImageElement.src = "assets/scripts/ref/paladin.png";
    } else if (selectedCharacter === "character2") {
      characterNameElement.textContent = "וולטאז'";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח";
      characterImageElement.src = "assets/scripts/ref/voltage.png";
    } else if (selectedCharacter === "character3") {
      characterNameElement.textContent = "אסטרל";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח";
      characterImageElement.src = "assets/scripts/ref/astral.png";
    } else if (selectedCharacter === "character4") {
      characterNameElement.textContent = "קומראד";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח";
      characterImageElement.src = "assets/scripts/ref/comrade.png";
    } else if (selectedCharacter === "character5") {
      characterNameElement.textContent = "ג'ייגנטיק";
      characterBioElement.textContent = "ביוגרפיה";
      characterPowerElement.textContent = "כוח";
      characterImageElement.src = "assets/scripts/ref/gigantic.png";
    }
    
  }
  