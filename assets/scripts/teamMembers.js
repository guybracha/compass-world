const teamMembers = [
    { name: "Paladin", image: "./contents/profile/paladin-min.png"},
    { name: "Voltage", image: "./contents/profile/voltage-min.png"},
    { name: "Lady Astral", image: "./contents/profile/ladyAstral-min.png"},
    { name: "Gigantic", image: "./contents/profile/gigantic-min.png"},
    { name: "Comrade", image: "./contents/profile/comrade-min.png"},
    { name: "Tsunami", image: "./contents/profile/tsunami-min.png"},
    { name: "Size", image: "./contents/profile/size-min.png"},
    { name: "Dragon Fighter", image: "./contents/profile/dragonFighter-min.png"},
    { name: "Mariposa", image: "./contents/profile/mariposa-min.png"},
    { name: "Symbol", image: "./contents/profile/symbol-min.png"},
    { name: "Eastwind", image: "./contents/profile/eastwind-min.png"},
    { name: "Sunshine", image: "./contents/profile/sunshine-min.png"},
    { name: "Doctor Physics", image: "./contents/profile/doctorPhysics-min.png"},
    { name: "Enforcer", image: "./contents/profile/enforcer-min.png"},
    { name: "Melody", image: "./contents/profile/melody-min.png"},
    { name: "captain Space", image: "./contents/profile/captainSpace-min.png"},
    { name: "honeybee", image: "./contents/profile/honeybee-min.png"},
    { name: "Maltese Cross", image: "./contents/profile/malteseCross-min.png"},
    { name: "Rocket Prime", image: "./contents/profile/rocketPrime-min.png"},
    { name: "Cheerstar", image: "./contents/profile/cheerstar-min.png"},
    { name: "Red Mole", image: "./contents/profile/redMole-min.png"},
    { name: "Metalclad", image: "./contents/profile/metalclad-min.png"},
    { name: "Western", image: "./contents/profile/western-min.png"},
    { name: "Scarab", image: "./contents/profile/scarab-min.png"},
    { name: "Timer", image: "./contents/profile/timer-min.png"},
    { name: "Rubberman", image: "./contents/profile/rubberman-min.png"},
    { name: "Techno", image: "./contents/profile/techno-min.png"},
    { name: "Ra", image: "./contents/profile/ra-min.png"},
    { name: "Captain Phoenix", image: "./contents/profile/captainPhoenix-min.png"},
    { name: "Wetlander", image: "./contents/profile/wetlander-min.png"},
    { name: "Bloom", image: "./contents/profile/bloom-min.png"},
    { name: "Squire", image: "./contents/profile/squire-min.png"},
    { name: "Snowie", image: "./contents/profile/snowie-min.png"},
    { name: "Optimus Quantum", image: "./contents/profile/optimusQuantum-min.png"}
];

const galleryContainer = document.getElementById("dynamicGallery");
  teamMembers.forEach(member => {
    // צור עמודה לכל דמות
    const col = document.createElement("div");
    col.className = "col-4 col-md-2 mb-6 text-center";
    col.innerHTML = `
      <img 
        class="img-fluid" 
        style="border-radius: 50%; cursor: pointer;" 
        src="${member.image}" 
        alt="${member.name}" 
        data-bs-toggle="modal" 
        data-bs-target="#imageModal"
        onclick="openModal('${member.image}', '${member.name}')"
      >
      <h5 class="mt-2" style="color: black;">${member.name}</h5>
    `;
    galleryContainer.appendChild(col);
  });

  // פונקציה לפתיחת ה-MODAL
  function openModal(image, name) {
    document.getElementById("modalImage").src = image;
    document.getElementById("modalTitle").textContent = name;
  }