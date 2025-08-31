// --- נתוני בסיס ---
const teamMembers = [
  { name: "Paladin", image: "./contents/avatar2024/heroes/paladin-min.webp" },
  { name: "Voltage", image: "./contents/avatar2024/heroes/voltage-min.webp" },
  { name: "Lady Astral", image: "./contents/avatar2024/heroes/ladyAstral-min.webp" },
  { name: "Gigantic", image: "./contents/avatar2024/heroes/gigantic-min.webp" },
  { name: "Comrade", image: "./contents/avatar2024/heroes/comrade-min.webp" },
  { name: "Tsunami", image: "./contents/avatar2024/heroes/tsunami-min.webp" },
  { name: "Size", image: "./contents/avatar2024/heroes/size-min.webp" },
  { name: "Dragon Fighter", image: "./contents/avatar2024/heroes/dragonFighter-min.webp" },
  { name: "Mariposa", image: "./contents/avatar2024/heroes/kittyposa-min.webp" },
  { name: "Symbol", image: "./contents/avatar2024/heroes/symbol-min.webp" },
  { name: "Eastwind", image: "./contents/avatar2024/heroes/eastwind-min.webp" },
  { name: "Sunshine", image: "./contents/avatar2024/heroes/sunshine-min.webp" },
  { name: "Doc Physics", image: "./contents/avatar2024/heroes/docPhysics-min.webp" },
  { name: "Enforcer", image: "./contents/avatar2024/heroes/enforcer-min.webp" },
  { name: "Melody", image: "./contents/avatar2024/heroes/melody-min.webp" },
  { name: "Captain Space", image: "./contents/avatar2024/heroes/captainSpace-min.webp" },
  { name: "Honeybee", image: "./contents/avatar2024/heroes/honeybee-min.webp" },
  { name: "Rocket Prime", image: "./contents/avatar2024/heroes/rocketPrime-min.webp" },
  { name: "Cheerstar", image: "./contents/avatar2024/heroes/cheerstar-min.webp" },
  { name: "Red Mole", image: "./contents/avatar2024/heroes/redMole-min.webp" },
  { name: "Metalclad", image: "./contents/avatar2024/heroes/metalclad-min.webp" },
  { name: "Western", image: "./contents/avatar2024/heroes/western-min.webp" },
  { name: "Scarab", image: "./contents/avatar2024/heroes/scarab-min.webp" },
  { name: "Timer", image: "./contents/avatar2024/heroes/timer-min.webp" },
  { name: "Techno", image: "./contents/avatar2024/heroes/techno-min.webp" },
  { name: "Captain Phoenix", image: "./contents/avatar2024/heroes/captainPhoenix-min.webp" },
  { name: "Wetlander", image: "./contents/avatar2024/heroes/wetlander-min.webp" },
  { name: "Bloom", image: "./contents/avatar2024/heroes/bloom-min.webp" },
  { name: "Squire", image: "./contents/avatar2024/heroes/squire-min.webp" },
  { name: "Snowie", image: "./contents/avatar2024/heroes/snowie-min.webp" },
  { name: "Optimus Quantum", image: "./contents/avatar2024/heroes/optimusQuantum-min.webp" },
  { name: "Ra", image: "./contents/avatar2024/heroes/ra-min.webp" },
  { name: "Mark Venture", image: "./contents/avatar2024/heroes/markVenture-min.webp" },
  { name: "Archer", image: "./contents/avatar2024/heroes/archer-min.webp" },
  { name: "Hoopoe", image: "./contents/avatar2024/heroes/hoopoe-min.webp" },
  { name: "Admiral Mars", image: "./contents/avatar2024/heroes/admiralMars-min.webp" },
  { name: "Sweet Girl", image: "./contents/avatar2024/heroes/sweetGirl-min.webp" },
  { name: "Rubberman", image: "./contents/avatar2024/heroes/rubber-min.webp" },
  { name: "Maltese Cross", image: "./contents/avatar2024/heroes/maltese-min.webp" }
].map(m => ({ ...m, bio: m.bio ?? "Member of the Compass Alliance." })); // ברירת מחדל ל-bio

// --- סדר לפי הגלריה ב-PDF ---
const pdfOrder = [
  // שורה 1
  "Comrade","Gigantic","Paladin","Tsunami","Voltage",
  // שורה 2
  "Bloom","Captain Phoenix","Dragon Fighter","Maltese Cross","Size","Mariposa",
  // שורה 3
  "Doc Physics","Enforcer","Honeybee","Metalclad","Optimus Quantum",
  // שורה 4
  "Eastwind","Sunshine","Ra","Rubberman","Rocket Prime",
  // שורה 5
  "Scarab","Symbol","Timer","Western","Wetlander",
  // שורה 6
  "Captain Space","Snowie","Squire","Techno",
  // שורה 7
  "Lady Astral","Cheerstar","Melody","Red Mole"
];

// למפות לפי שם ולהרכיב מערך מסודר
const byName = new Map(teamMembers.map(m => [m.name, m]));
const orderedMembers = [
  ...pdfOrder.map(n => byName.get(n)).filter(Boolean),
  ...teamMembers.filter(m => !pdfOrder.includes(m.name)) // אם יש דמויות נוספות שלא הוגדרו ב-PDF
];

// --- רנדר גלריה ---
const galleryContainer = document.getElementById("dynamicGallery");

orderedMembers.forEach(member => {
  const col = document.createElement("div");
  // רספונסיבי: 2 בעמודה ב-xs, 3 ב-sm, 4 ב-md, 6 ב-lg+
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2 d-flex";

  col.innerHTML = `
    <div class="card border-0 shadow-sm w-100 text-center" style="background:#222; border-radius:16px;">
      <img
        class="img-fluid mx-auto mt-3"
        style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; cursor: pointer; transition: transform .25s ease;"
        src="${member.image}"
        alt="${member.name}"
        loading="lazy"
        data-name="${member.name}"
        data-bio="${member.bio}"
        data-image="${member.image}"
      />
      <div class="card-body py-2">
        <h6 class="mb-0" style="color:#fdd835; font-weight:700;">${member.name}</h6>
      </div>
    </div>
  `;
  galleryContainer.appendChild(col);
});

// האפקט הקטן של זום הובר
galleryContainer.addEventListener("mouseover", (e) => {
  const img = e.target.closest("img");
  if (img) img.style.transform = "scale(1.04)";
});
galleryContainer.addEventListener("mouseout", (e) => {
  const img = e.target.closest("img");
  if (img) img.style.transform = "scale(1)";
});

// פתיחת מודאל בבטיחות (ללא onclick אינליין)
galleryContainer.addEventListener("click", (e) => {
  const img = e.target.closest("img[data-image]");
  if (!img) return;

  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalBio   = document.getElementById("modalBio");

  modalImage.src = img.dataset.image;
  modalImage.alt = img.dataset.name;
  modalTitle.textContent = img.dataset.name;
  modalBio.textContent = img.dataset.bio || "Member of the Compass Alliance.";

  // אם אתה משתמש בבוטסטראפ 5 ומאתחל דרך JS:
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("imageModal"));
  modal.show();
});
