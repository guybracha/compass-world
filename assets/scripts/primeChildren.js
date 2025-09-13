// Categories & Sides
const CATS = { PRIME: "Prime", TECH: "Tech", MYSTIC: "Mystic", UNDERSEA: "Undersea" };
const SIDE = { HERO: "Hero", VILLAIN: "Villain" };

// Data (English names & powers; transliterations kept where it’s a proper name)
const characters = [
  // === HEROES ===
  { name: "Voltage", side: SIDE.HERO, power: "Electricity", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Bloom", side: SIDE.HERO, power: "Plant control", tags: [CATS.PRIME] },
  { name: "Rubberman", side: SIDE.HERO, power: "Elasticity", tags: [CATS.PRIME] },
  { name: "Enforcer", side: SIDE.HERO, power: "Living shadow", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Melody", side: SIDE.HERO, power: "Super-song", tags: [CATS.PRIME] },
  { name: "Cheerstar", side: SIDE.HERO, power: "Firework blasts", tags: [CATS.PRIME] },
  { name: "Snowy", side: SIDE.HERO, power: "Snow creation", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Polar", side: SIDE.HERO, power: "Magnetic fields", tags: [CATS.PRIME] },
  { name: "Captain Phoenix", side: SIDE.HERO, power: "Pyrokinesis", tags: [CATS.PRIME] },
  { name: "The Alchemist", side: SIDE.HERO, power: "Matter transmutation", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Bricktown", side: SIDE.HERO, power: "Stone/brick control", tags: [CATS.PRIME] },
  { name: "Cheshire Surprise", side: SIDE.HERO, power: "Teleportation", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Northlight", side: SIDE.HERO, power: "Light control", tags: [CATS.PRIME] },
  { name: "Spectrum Man", side: SIDE.HERO, power: "Telekinesis & spectrum sight", tags: [CATS.PRIME] },
  { name: "Jawbreaker", side: SIDE.HERO, power: "Chews any material", tags: [CATS.PRIME] },
  { name: "Dice", side: SIDE.HERO, power: "Good luck manipulation", tags: [CATS.PRIME] },
  { name: "The Phoenician", side: SIDE.HERO, power: "Slow aging", tags: [CATS.PRIME] },
  { name: "Genesis", side: SIDE.HERO, power: "Object creation from imagination", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Titanium", side: SIDE.HERO, power: "Metallic skin", tags: [CATS.PRIME] },
  { name: "Sand Nomad", side: SIDE.HERO, power: "Sand control & dream-walking", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "EMP", side: SIDE.HERO, power: "Electromagnetic pulses", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Rapunzel", side: SIDE.HERO, power: "Living hair", tags: [CATS.PRIME] },
  { name: "The Architect", side: SIDE.HERO, power: "Constructs from existing matter", tags: [CATS.PRIME] },
  { name: "Stack", side: SIDE.HERO, power: "Adhesive shots", tags: [CATS.PRIME] },
  { name: "Basalt", side: SIDE.HERO, power: "Basalt-like tough skin", tags: [CATS.PRIME] },
  { name: "Gunpowder", side: SIDE.HERO, power: "Explosions", tags: [CATS.PRIME] },
  { name: "The Dreamer", side: SIDE.HERO, power: "Future sight", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Mirror Girl", side: SIDE.HERO, power: "Invisibility", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "The Impossible", side: SIDE.HERO, power: "Unstable over-power", tags: [CATS.PRIME] },
  { name: "Captain Israel", side: SIDE.HERO, power: "Flight", tags: [CATS.PRIME] },
  { name: "Frog Girl", side: SIDE.HERO, power: "Super-leaps & long tongue", tags: [CATS.PRIME] },
  { name: "Third-Eye", side: SIDE.HERO, power: "Tri-ocular super-vision", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Fortress", side: SIDE.HERO, power: "Giant growth", tags: [CATS.PRIME] },
  { name: "Shrink", side: SIDE.HERO, power: "Miniaturization", tags: [CATS.PRIME] },
  { name: "Mermaid", side: SIDE.HERO, power: "Shapeshift into mermaid", tags: [CATS.PRIME, CATS.UNDERSEA, CATS.MYSTIC] },
  { name: "Art Einstein", side: SIDE.HERO, power: "Super-intellect", tags: [CATS.PRIME] },
  { name: "Airdance", side: SIDE.HERO, power: "Aerokinesis", tags: [CATS.PRIME] },
  { name: "McBot", side: SIDE.HERO, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Kid Dimension", side: SIDE.HERO, power: "Interdimensional portals", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Crystallo", side: SIDE.HERO, power: "Crystal form & creation", tags: [CATS.PRIME] },
  { name: "Meir Yarkoni", side: SIDE.HERO, power: "Rapid healing", tags: [CATS.PRIME] },
  { name: "Mindbend", side: SIDE.HERO, power: "Mind power", tags: [CATS.PRIME] },
  { name: "Sweet Girl", side: SIDE.HERO, power: "Sugar storm", tags: [CATS.PRIME] },

  // === VILLAINS ===
  { name: "Killer Volt", side: SIDE.VILLAIN, power: "Electricity", tags: [CATS.PRIME] },
  { name: "Human Rat", side: SIDE.VILLAIN, power: "Rat-like physiology", tags: [CATS.PRIME] },
  { name: "Mr. Chalk", side: SIDE.VILLAIN, power: "Turns matter to stone", tags: [CATS.PRIME] },
  { name: "Neon Master", side: SIDE.VILLAIN, power: "Light control", tags: [CATS.PRIME] },
  { name: "Ice Princess", side: SIDE.VILLAIN, power: "Ice", tags: [CATS.PRIME] },
  { name: "Mad Mechanic", side: SIDE.VILLAIN, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Fossa", side: SIDE.VILLAIN, power: "Animalistic abilities", tags: [CATS.PRIME] },
  { name: "Übermensch", side: SIDE.VILLAIN, power: "Deadly super-strength", tags: [CATS.PRIME] },
  { name: "The Human Reactor", side: SIDE.VILLAIN, power: "Nuclear", tags: [CATS.PRIME] },
  { name: "Bushmaster", side: SIDE.VILLAIN, power: "Poison creation", tags: [CATS.PRIME] },
  { name: "Mudman", side: SIDE.VILLAIN, power: "Shapeshifting (mud)", tags: [CATS.PRIME] },
  { name: "The Golden Thief", side: SIDE.VILLAIN, power: "Super-speed", tags: [CATS.PRIME] },
  { name: "Dynamito", side: SIDE.VILLAIN, power: "Explosions", tags: [CATS.PRIME] },
  { name: "Q", side: SIDE.VILLAIN, power: "Body reading & mimicry", tags: [CATS.PRIME] },
  { name: "The Exterminator", side: SIDE.VILLAIN, power: "Anesthetic gas", tags: [CATS.PRIME] },
  { name: "Parkour", side: SIDE.VILLAIN, power: "Super-leaps & vaults", tags: [CATS.PRIME] },
  { name: "General Darkness", side: SIDE.VILLAIN, power: "Consumes dark energy", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Immortal Ramses", side: SIDE.VILLAIN, power: "Immortality", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Black Eagle", side: SIDE.VILLAIN, power: "Reflexes", tags: [CATS.PRIME] },
  { name: "Dark Mind", side: SIDE.VILLAIN, power: "Telekinesis", tags: [CATS.PRIME] },
  { name: "Alternatia", side: SIDE.VILLAIN, power: "Matter transmutation", tags: [CATS.PRIME] },
  { name: "Scarfield", side: SIDE.VILLAIN, power: "Vampiric abilities", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Sticker Man", side: SIDE.VILLAIN, power: "Explosive stickers", tags: [CATS.PRIME] },
  { name: "Madame Blackout", side: SIDE.VILLAIN, power: "Shadow phasing", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "The Sphinx", side: SIDE.VILLAIN, power: "Rapid healing", tags: [CATS.PRIME] }
];

// Badges
function badgeForTags(tags) {
  return tags.map((t) => {
    let cls = "text-bg-secondary";
    if (t === CATS.PRIME) cls = "text-bg-primary";
    else if (t === CATS.MYSTIC) cls = "text-bg-info text-dark";
    else if (t === CATS.TECH) cls = "text-bg-warning text-dark";
    else if (t === CATS.UNDERSEA) cls = "text-bg-success";
    return `<span class="badge ${cls} me-1">${t}</span>`;
  }).join("");
}

// List item template
function li(c) {
  return `
    <li class="list-group-item">
      <div class="fw-semibold">${c.name}</div>
      <div class="small text-secondary">${c.power}</div>
      <div>${badgeForTags(c.tags)}</div>
    </li>`;
}

// Filtering state
const state = {
  q: "",
  side: "ALL",
  tags: new Set(["Prime"]) // default show Prime checked
};

// Debounce helper
function debounce(fn, ms = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// Apply filters
function getFiltered() {
  const q = state.q.trim().toLowerCase();
  const side = state.side;
  const activeTags = state.tags;

  return characters.filter((c) => {
    if (side !== "ALL" && c.side !== side) return false;
    if (activeTags.size > 0) {
      // require at least one of the active tags
      if (!c.tags.some(t => activeTags.has(t))) return false;
    }
    if (q) {
      const hay = `${c.name} ${c.power}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

// Render
function render() {
  const data = getFiltered();
  const heroes = data.filter(c => c.side === SIDE.HERO);
  const villains = data.filter(c => c.side === SIDE.VILLAIN);

  document.getElementById("pc-heroes-list").innerHTML = heroes.map(li).join("");
  document.getElementById("pc-villains-list").innerHTML = villains.map(li).join("");

  document.getElementById("pc-heroes-count").textContent = heroes.length;
  document.getElementById("pc-villains-count").textContent = villains.length;
}

// Wire controls
function wireControls() {
  const input = document.getElementById("pc-search");
  const sideSel = document.getElementById("pc-side");
  const tagChecks = Array.from(document.querySelectorAll(".pc-tag"));

  input.addEventListener("input", debounce((e) => { state.q = e.target.value; render(); }, 180));
  sideSel.addEventListener("change", (e) => { state.side = e.target.value; render(); });
  tagChecks.forEach(ch => {
    ch.addEventListener("change", (e) => {
      const v = e.target.value;
      if (e.target.checked) state.tags.add(v); else state.tags.delete(v);
      render();
    });
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  wireControls();
  render();
});
