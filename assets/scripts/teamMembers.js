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
  { name: "Mirror Girl", image: "./contents/avatar2024/heroes/mirrorGirl-min.webp" },
  { name: "Alchemist", image: "./contents/avatar2024/heroes/alchemist-min.webp" },
  { name: "Sweet Girl", image: "./contents/avatar2024/heroes/sweetGirl-min.webp" },
  { name: "Rubberman", image: "./contents/avatar2024/heroes/rubber-min.webp" },
  { name: "Maltese Cross", image: "./contents/avatar2024/heroes/maltese-min.webp" },
  { name: "Wonderbeast", image: "./contents/avatar2024/heroes/wonderbeast-min.webp" },
  { name: "Nighthunter", image: "./contents/avatar2024/heroes/nighthunter-min.webp" },
  { name: "Luna", image: "./contents/avatar2024/heroes/luna-min.webp" },
  { name: "Guardian Angel", image: "./contents/avatar2024/heroes/guardianAngel-min.webp" },
  { name: "Hydro-Zen", image: "./contents/avatar2024/heroes/hydroZen-min.webp" },
  { name: "Ivory", image: "./contents/avatar2024/heroes/ivory-min.webp" },
  { name: "King Sodalite", image: "./contents/avatar2024/heroes/kingSodalite-min.webp" },
  { name: "Northlight", image: "./contents/avatar2024/heroes/northlight-min.webp" },
  { name: "Lion Man", image: "./contents/avatar2024/heroes/lionMan-min.webp" },
].map(m => ({ ...m, bio: m.bio ?? "Member of the Compass Alliance." }));

// --- סדר לפי הגלריה ב-PDF ---
const pdfOrder = [
  "Comrade","Gigantic","Paladin","Tsunami","Voltage",
  "Bloom","Captain Phoenix","Dragon Fighter","Maltese Cross","Size","Mariposa",
  "Doc Physics","Enforcer","Honeybee","Metalclad","Optimus Quantum",
  "Eastwind","Sunshine","Ra","Rubberman","Rocket Prime",
  "Scarab","Symbol","Timer","Western","Wetlander",
  "Captain Space","Snowie","Squire","Techno",
  "Lady Astral","Cheerstar","Melody","Red Mole"
];

const byName = new Map(teamMembers.map(m => [m.name, m]));
const orderedMembers = [
  ...pdfOrder.map(n => byName.get(n)).filter(Boolean),
  ...teamMembers.filter(m => !pdfOrder.includes(m.name))
];

// --- רנדר גלריה ---
const galleryContainer = document.getElementById("dynamicGallery");

orderedMembers.forEach(member => {
  const col = document.createElement("div");
  col.className = "col-6 col-sm-4 col-md-3 col-lg-2 d-flex";

  col.innerHTML = `
    <div class="card border-0 shadow-sm w-100 text-center" style="background:#222; border-radius:16px;">
      <img
        class="img-fluid mx-auto mt-3"
        style="width:120px; height:120px; object-fit:cover; border-radius:50%; cursor:pointer; transition:transform .25s ease;"
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

const scaleAvatar = (img, scale) => {
  if (!img) return;
  if (typeof window.gsap !== "undefined") {
    window.gsap.to(img, { scale, duration: 0.25, ease: "power2.out" });
  } else {
    img.style.transform = `scale(${scale})`;
  }
};
// האפקט הקטן של זום הובר
galleryContainer.addEventListener("mouseover", (e) => {
  const img = e.target.closest("img");
  if (img) scaleAvatar(img, 1.04);
});
galleryContainer.addEventListener("mouseout", (e) => {
  const img = e.target.closest("img");
  if (img) scaleAvatar(img, 1);
});

// --- פתיחת מודאל לדמויות ---
// שים לב: HTML עודכן ל-id="profileModal" (לא imageModal).
const modalEl =
  document.getElementById("profileModal") || // החדש
  document.getElementById("imageModal");     // תאימות לאחור אם שכחת לעדכן HTML

galleryContainer.addEventListener("click", (e) => {
  const img = e.target.closest("img[data-image]");
  if (!img || !modalEl) return;

  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalBio   = document.getElementById("modalBio");

  if (modalImage) {
    modalImage.src = img.dataset.image;
    modalImage.alt = img.dataset.name;
  }
  if (modalTitle) modalTitle.textContent = img.dataset.name;
  if (modalBio)   modalBio.textContent   = img.dataset.bio || "Member of the Compass Alliance.";

  // Bootstrap 5
  if (window.bootstrap && bootstrap.Modal) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
});

