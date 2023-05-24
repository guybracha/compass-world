function displayCharacterDetails() {
    var characterDropdown = document.getElementById("characterDropdown");
    var characterNameElement = document.getElementById("characterName");
    var characterPowerBio = document.getElementById("characterBiography");
    var characterImageElement = document.getElementById("characterImage");
    
    // Clear previous character details
    characterNameElement.textContent = "";
    characterPowerBio.textContent = "";
    characterImageElement.src = "";
  
    // Get the selected character value
    var selectedCharacter = characterDropdown.value;
  
    // Display details based on the selected character
    if (selectedCharacter === "character1") {
      characterNameElement.textContent = "פלאדין";
      characterPowerBio.textContent = "Power: Super Strength";
      characterImageElement.src = "assets/scripts/ref/paladin.png";
    } else if (selectedCharacter === "character2") {
      characterNameElement.textContent = "וולטאז'";
      characterPowerBio.textContent = "Power: Telekinesis";
      characterImageElement.src = "assets/scripts/ref/voltage.png";
    } else if (selectedCharacter === "character3") {
      characterNameElement.textContent = "אסטרל";
      characterPowerBio.textContent = "Power: Invisibility";
      characterImageElement.src = "assets/scripts/ref/astral.png";
    }
  }
  