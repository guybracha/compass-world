// --- נתוני בסיס ---
const teamMembers = [
  { name: "Paladin", image: "./contents/profile/paladin-min.png" },
  { name: "Voltage", image: "./contents/profile/voltage-min.png" },
  { name: "Lady Astral", image: "./contents/profile/ladyAstral-min.png" },
  { name: "Gigantic", image: "./contents/profile/gigantic-min.png" },
  { name: "Comrade", image: "./contents/profile/comrade-min.png" },
  { name: "Tsunami", image: "./contents/profile/tsunami-min.png" },
  { name: "Size", image: "./contents/profile/size-min.png" },
  { name: "Dragon Fighter", image: "./contents/profile/dragonFighter-min.png" },
  { name: "Mariposa", image: "./contents/profile/mariposa-min.png" },
  { name: "Symbol", image: "./contents/profile/symbol-min.png" },
  { name: "Eastwind", image: "./contents/profile/eastwind-min.png" },
  { name: "Sunshine", image: "./contents/profile/sunshine-min.png" },
  { name: "Doc Physics", image: "./contents/profile/doctorPhysics-min.png" },
  { name: "Enforcer", image: "./contents/profile/enforcer-min.png" },
  { name: "Melody", image: "./contents/profile/melody-min.png" },
  { name: "Captain Space", image: "./contents/profile/captainSpace-min.png" },
  { name: "Honeybee", image: "./contents/profile/honeybee-min.png" },
  { name: "Maltese Cross", image: "./contents/profile/malteseCross-min.png" },
  { name: "Rocket Prime", image: "./contents/profile/rocketPrime-min.png" },
  { name: "Cheerstar", image: "./contents/profile/cheerstar-min.png" },
  { name: "Red Mole", image: "./contents/profile/redMole-min.png" },
  { name: "Metalclad", image: "./contents/profile/metalclad-min.png" },
  { name: "Western", image: "./contents/profile/western-min.png" },
  { name: "Scarab", image: "./contents/profile/scarab-min.png" },
  { name: "Timer", image: "./contents/profile/timer-min.png" },
  { name: "Rubberman", image: "./contents/profile/rubberman-min.png" },
  { name: "Techno", image: "./contents/profile/techno-min.png" },
  { name: "Captain Phoenix", image: "./contents/profile/captainPhoenix-min.png" },
  { name: "Wetlander", image: "./contents/profile/wetlander-min.png" },
  { name: "Bloom", image: "./contents/profile/bloom-min.png" },
  { name: "Squire", image: "./contents/profile/squire-min.png" },
  { name: "Snowie", image: "./contents/profile/snowie-min.png" },
  { name: "Optimus Quantum", image: "./contents/profile/optimusQuantum-min.png" },
  { name: "Ra", image: "./contents/profile/ra-min.png" }
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
