// assets/scripts/primeChildren.js
// =====================================================
// Compass World — Prime-Children (DATA ONLY)
// This file exposes window.characters (+ CATS, SIDE, badgeForTags if needed).
// It does NOT wire any UI. Rendering is done in primeRender.js.
// =====================================================

'use strict';

// Categories & Sides
const CATS = {
  PRIME: "Prime",
  TECH: "Tech",
  MYSTIC: "Mystic",
  UNDERSEA: "Undersea",
  COSMIC: "Cosmic",
  ALIEN: "Alien",
  LEGEND: "Legendary",
  SCIENCE: "Science",
  DARK: "Dark",
  ELEMENTAL: "Elemental",
  MUTANT: "Mutant"
};

const SIDE = { HERO: "Hero", VILLAIN: "Villain" };

// Data
const characters = [
  // === HEROES ===
  { name: "Voltage", side: SIDE.HERO, power: "Electricity", tags: [CATS.PRIME, CATS.TECH, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/voltage-min.webp" },
  { name: "Bloom", side: SIDE.HERO, power: "Plant control", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/bloom-min.webp" },
  { name: "Rubberman", side: SIDE.HERO, power: "Elasticity", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/rubber-min.webp" },
  { name: "Enforcer", side: SIDE.HERO, power: "Living shadow", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK], img: "contents/avatar2024/heroes/enforcer-min.webp" },
  { name: "Melody", side: SIDE.HERO, power: "Super-song", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/melody-min.webp" },
  { name: "Cheerstar", side: SIDE.HERO, power: "Firework blasts", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/cheerstar-min.webp" },
  { name: "Snowie", side: SIDE.HERO, power: "Snow creation", tags: [CATS.PRIME, CATS.MYSTIC, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/snowie-min.webp" },
  { name: "Polar", side: SIDE.HERO, power: "Magnetic fields", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/polar-min.webp" },
  { name: "Captain Phoenix", side: SIDE.HERO, power: "Pyrokinesis", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/captainPhoenix-min.webp" },
  { name: "The Alchemist", side: SIDE.HERO, power: "Matter transmutation", tags: [CATS.PRIME, CATS.MYSTIC, CATS.SCIENCE], img: "contents/avatar2024/heroes/alchemist-min.webp" },
  { name: "Bricktown", side: SIDE.HERO, power: "Stone/brick control", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/bricktown-min.webp" },
  { name: "Cheshire Surprise", side: SIDE.HERO, power: "Teleportation", tags: [CATS.PRIME, CATS.MYSTIC], img: "contents/avatar2024/heroes/cheshireSurprise-min.webp" },
  { name: "Northlight", side: SIDE.HERO, power: "Light control", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/northlight-min.webp" },
  { name: "Spectrum Man", side: SIDE.HERO, power: "Telekinesis & spectrum sight", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/spectrumMan-min.webp" },
  { name: "Jawbreaker", side: SIDE.HERO, power: "Chews any material", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/jawbreaker-min.webp" },
  { name: "Dice", side: SIDE.HERO, power: "Good luck manipulation", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/dice-min.webp" },
  { name: "The Phoenician", side: SIDE.HERO, power: "Slow aging", tags: [CATS.PRIME, CATS.LEGEND], img: "contents/avatar2024/heroes/Phoenician-min.webp" },
  { name: "Genesis", side: SIDE.HERO, power: "Object creation from imagination", tags: [CATS.PRIME, CATS.MYSTIC], img: "contents/avatar2024/heroes/genesis-min.webp" },
  { name: "Titanium", side: SIDE.HERO, power: "Metallic skin", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/titanium-min.webp" },
  { name: "Sand Nomad", side: SIDE.HERO, power: "Sand control & dream-walking", tags: [CATS.PRIME, CATS.MYSTIC, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/sandNomad-min.webp" },
  { name: "EMP", side: SIDE.HERO, power: "Electromagnetic pulses", tags: [CATS.PRIME, CATS.TECH], img: "contents/avatar2024/heroes/emp-min.webp" },
  { name: "Rapunzel", side: SIDE.HERO, power: "Living hair", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/rapunzel-min.webp" },
  { name: "The Architect", side: SIDE.HERO, power: "Constructs from existing matter", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/architect-min.webp" },
  { name: "Stuck", side: SIDE.HERO, power: "Adhesive shots", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/stuck-min.webp" },
  { name: "Basalt", side: SIDE.HERO, power: "Basalt-like tough skin", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/basalt-min.webp" },
  { name: "Gunpowder", side: SIDE.HERO, power: "Explosions", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/gunpowder-min.webp" },
  { name: "The Dreamer", side: SIDE.HERO, power: "Future sight", tags: [CATS.PRIME, CATS.MYSTIC], img: "contents/avatar2024/heroes/dreamer-min.webp" },
  { name: "Mirror Girl", side: SIDE.HERO, power: "Invisibility", tags: [CATS.PRIME, CATS.MYSTIC], img: "contents/avatar2024/heroes/mirrorGirl-min.webp" },
  { name: "The Impossible", side: SIDE.HERO, power: "Unstable over-power", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/impossible-min.webp" },
  { name: "Captain Israel", side: SIDE.HERO, power: "Flight", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/captainIsrael-min.webp" },
  { name: "Frog Girl", side: SIDE.HERO, power: "Super-leaps & long tongue", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/frogGirl-min.webp" },
  { name: "Third-Eye", side: SIDE.HERO, power: "Tri-ocular super-vision", tags: [CATS.PRIME, CATS.MYSTIC], img: "contents/avatar2024/heroes/thirdEye-min.webp" },
  { name: "Fortress", side: SIDE.HERO, power: "Giant growth", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/fortress-min.webp" },
  { name: "Shrink", side: SIDE.HERO, power: "Miniaturization", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/shrink-min.webp" },
  { name: "Mermaid", side: SIDE.HERO, power: "Shapeshift into mermaid", tags: [CATS.PRIME, CATS.UNDERSEA, CATS.MYSTIC, CATS.LEGEND], img: "contents/avatar2024/heroes/mermaid-min.webp" },
  { name: "Art Einstein", side: SIDE.HERO, power: "Super-intellect", tags: [CATS.PRIME, CATS.SCIENCE], img: "contents/avatar2024/heroes/artEinstein-min.webp" },
  { name: "Airdance", side: SIDE.HERO, power: "Aerokinesis", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/airdance-min.webp" },
  { name: "McBot", side: SIDE.HERO, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH], img: "contents/avatar2024/heroes/mcBot-min.webp" },
  { name: "Kid Dimension", side: SIDE.HERO, power: "Interdimensional portals", tags: [CATS.PRIME, CATS.MYSTIC, CATS.COSMIC], img: "contents/avatar2024/heroes/kidDimension-min.webp" },
  { name: "Crystallo", side: SIDE.HERO, power: "Crystal form & creation", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/heroes/crystallo-min.webp" },
  { name: "Meir Yarkoni", side: SIDE.HERO, power: "Rapid healing", tags: [CATS.PRIME], img: "contents/avatar2024/otherCharacters/meirYarkoni-min.webp" },
  { name: "Mindbend", side: SIDE.HERO, power: "Mind power", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/mindbend-min.webp" },
  { name: "Sweet Girl", side: SIDE.HERO, power: "Sugar storm", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/sweetGirl-min.webp" },
  { name: "Golda", side: SIDE.HERO, power: "Golden energy", tags: [CATS.PRIME], img: "contents/avatar2024/heroes/golda-min.webp" },
  { name: "Starguard", side: SIDE.HERO, power: "Cosmic energy generation", tags: [CATS.PRIME, CATS.COSMIC], img: "contents/avatar2024/heroes/starguard-min.webp" },

  // === VILLAINS ===
  { name: "Killer Volt", side: SIDE.VILLAIN, power: "Electricity", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/killerVolt.webp" },
  { name: "Human Rat", side: SIDE.VILLAIN, power: "Rat-like physiology", tags: [CATS.PRIME], img: "contents/avatar2024/villains/humanRat.webp" },
  { name: "Mr. Chalk", side: SIDE.VILLAIN, power: "Turns matter to stone", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/mrChalk.webp" },
  { name: "Neon Master", side: SIDE.VILLAIN, power: "Light control", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/neonMaster.webp" },
  { name: "Ice Princess", side: SIDE.VILLAIN, power: "Ice", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/icePrincess.webp" },
  { name: "Mad Mechanic", side: SIDE.VILLAIN, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH], img: "contents/avatar2024/villains/madMechanic.webp" },
  { name: "Fossa", side: SIDE.VILLAIN, power: "Animalistic abilities", tags: [CATS.PRIME], img: "contents/avatar2024/villains/fossa.webp" },
  { name: "Übermensch", side: SIDE.VILLAIN, power: "Deadly super-strength", tags: [CATS.PRIME], img: "contents/avatar2024/villains/ubermensch.webp" },
  { name: "The Human Reactor", side: SIDE.VILLAIN, power: "Nuclear", tags: [CATS.PRIME, CATS.SCIENCE], img: "contents/avatar2024/villains/humanReactor.webp" },
  { name: "Bushmaster", side: SIDE.VILLAIN, power: "Poison creation", tags: [CATS.PRIME], img: "contents/avatar2024/villains/bushmaster.webp" },
  { name: "Mudman", side: SIDE.VILLAIN, power: "Shapeshifting (mud)", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/mudman.webp" },
  { name: "The Golden Thief", side: SIDE.VILLAIN, power: "Super-speed", tags: [CATS.PRIME], img: "contents/avatar2024/villains/goldenThief.webp" },
  { name: "Dynamito", side: SIDE.VILLAIN, power: "Explosions", tags: [CATS.PRIME, CATS.ELEMENTAL], img: "contents/avatar2024/villains/dynamito.webp" },
  { name: "Q", side: SIDE.VILLAIN, power: "Body reading & mimicry", tags: [CATS.PRIME], img: "contents/avatar2024/villains/q.webp" },
  { name: "The Exterminator", side: SIDE.VILLAIN, power: "Anesthetic gas", tags: [CATS.PRIME], img: "contents/avatar2024/villains/exterminator.webp" },
  { name: "Parkour", side: SIDE.VILLAIN, power: "Super-leaps & vaults", tags: [CATS.PRIME], img: "contents/avatar2024/villains/parkourFrog.webp" },
  { name: "General Darkness", side: SIDE.VILLAIN, power: "Consumes dark energy", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK], img: "contents/avatar2024/villains/generalDarkness.webp" },
  { name: "Ramesses the Immortal", side: SIDE.VILLAIN, power: "Immortality", tags: [CATS.PRIME, CATS.MYSTIC, CATS.LEGEND], img: "contents/avatar2024/villains/ramses.webp" },
  { name: "Black Eagle", side: SIDE.VILLAIN, power: "Reflexes", tags: [CATS.PRIME], img: "contents/avatar2024/villains/blackEagle.webp" },
  { name: "Dark Mind", side: SIDE.VILLAIN, power: "Telekinesis", tags: [CATS.PRIME, CATS.DARK], img: "contents/avatar2024/villains/darkMind.webp" },
  { name: "Alternatasha", side: SIDE.VILLAIN, power: "Matter transmutation", tags: [CATS.PRIME], img: "contents/avatar2024/villains/alternatasha.webp" },
  { name: "Scarfield", side: SIDE.VILLAIN, power: "Vampiric abilities", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK], img: "contents/avatar2024/villains/scarfield.webp" },
  { name: "Sticker Man", side: SIDE.VILLAIN, power: "Explosive stickers", tags: [CATS.PRIME], img: "contents/avatar2024/villains/stickerMan.webp" },
  { name: "Madame Blackout", side: SIDE.VILLAIN, power: "Shadow phasing", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK], img: "contents/avatar2024/villains/madameBlackout.webp" },
  { name: "The Sphinx", side: SIDE.VILLAIN, power: "Rapid healing", tags: [CATS.PRIME, CATS.LEGEND], img: "contents/avatar2024/villains/sphinx.webp" },
  { name: "Wizmaster", side: SIDE.VILLAIN, power: "Dark magic", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK], img: "contents/avatar2024/villains/wizmaster.webp" },
  { name: "Headmaster Vile", side: SIDE.VILLAIN, power: "Mind Manipulation & Control", tags: [CATS.PRIME, CATS.DARK], img: "contents/avatar2024/villains/headmasterVile.webp" }
];


// Expose to window (for renderer)
window.CATS = CATS;
window.SIDE = SIDE;
window.characters = characters;

// (optional) Export badgeForTags for other pages/modals
window.badgeForTags = function badgeForTags(tags) {
  return (tags || []).map((t) => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
};
