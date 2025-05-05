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
    { name: "Doc Physics", image: "./contents/profile/doctorPhysics-min.png"},
    { name: "Enforcer", image: "./contents/profile/enforcer-min.png"},
    { name: "Melody", image: "./contents/profile/melody-min.png"},
    { name: "Captain Space", image: "./contents/profile/captainSpace-min.png"},
    { name: "Honeybee", image: "./contents/profile/honeybee-min.png"},
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
    { name: "Captain Phoenix", image: "./contents/profile/captainPhoenix-min.png"},
    { name: "Wetlander", image: "./contents/profile/wetlander-min.png"},
    { name: "Bloom", image: "./contents/profile/bloom-min.png"},
    { name: "Squire", image: "./contents/profile/squire-min.png"},
    { name: "Snowie", image: "./contents/profile/snowie-min.png"},
    { name: "Optimus Quantum", image: "./contents/profile/optimusQuantum-min.png"},
    { name: "Guardsman", image: "./contents/profile/guardsman-min.png"},
    { name: "Nighthunter", image: "./contents/profile/nighthunter-min.png"},
    { name: "Wonderbeast", image: "./contents/profile/wonderbeast-min.png"},
    { name: "Mirror Girl", image: "./contents/profile/mirrorgirl-min.png"},
    { name: "The Alchemist", image: "./contents/profile/alchemist-min.png"},
    { name: "Hightask", image: "./contents/profile/hightask-min.png"},
    { name: "Polar", image: "./contents/profile/polar-min.png"},
    { name: "Genesis", image: "./contents/profile/genesis-min.png"},
    { name: "Bricktown", image: "./contents/profile/bricktown-min.png"},
    { name: "Cheshire Surprise", image: "./contents/profile/cheshiresurprise-min.png"},
    { name: "New Age", image: "./contents/profile/newage-min.png"},
    { name: "Astro Sentry", image: "./contents/profile/astrosentry-min.png"}
];

const galleryContainer = document.getElementById("dynamicGallery");
teamMembers.forEach(member => {
    const col = document.createElement("div");
    col.className = "col-4 col-md-2 mb-4 text-center";
    col.innerHTML = `
        <div class="card border-0 shadow-sm" style="background: #222; border-radius: 15px;">
            <img 
                class="img-fluid hover-zoom"
                style="border-radius: 50%; cursor: pointer; transition: transform 0.3s ease;"
                src="${member.image}" 
                alt="${member.name}" 
                data-bs-toggle="modal" 
                data-bs-target="#imageModal"
                onclick="openModal('${member.image}', '${member.name}', '${member.bio}')"
            >
            <h5 class="mt-2" style="color: #fdd835; font-weight: bold;">${member.name}</h5>
        </div>
    `;
    galleryContainer.appendChild(col);
});

// פונקציה לפתיחת ה-MODAL
function openModal(image, name, bio) {
    document.getElementById("modalImage").src = image;
    document.getElementById("modalTitle").textContent = name;
    document.getElementById("modalBio").textContent = bio;
}