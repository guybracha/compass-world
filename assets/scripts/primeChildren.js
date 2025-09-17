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
  { name: "Voltage", side: SIDE.HERO, power: "Electricity", tags: [CATS.PRIME, CATS.TECH, CATS.ELEMENTAL] },
  { name: "Bloom", side: SIDE.HERO, power: "Plant control", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Rubberman", side: SIDE.HERO, power: "Elasticity", tags: [CATS.PRIME] },
  { name: "Enforcer", side: SIDE.HERO, power: "Living shadow", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK] },
  { name: "Melody", side: SIDE.HERO, power: "Super-song", tags: [CATS.PRIME] },
  { name: "Cheerstar", side: SIDE.HERO, power: "Firework blasts", tags: [CATS.PRIME] },
  { name: "Snowie", side: SIDE.HERO, power: "Snow creation", tags: [CATS.PRIME, CATS.MYSTIC, CATS.ELEMENTAL] },
  { name: "Polar", side: SIDE.HERO, power: "Magnetic fields", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Captain Phoenix", side: SIDE.HERO, power: "Pyrokinesis", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "The Alchemist", side: SIDE.HERO, power: "Matter transmutation", tags: [CATS.PRIME, CATS.MYSTIC, CATS.SCIENCE] },
  { name: "Bricktown", side: SIDE.HERO, power: "Stone/brick control", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Cheshire Surprise", side: SIDE.HERO, power: "Teleportation", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Northlight", side: SIDE.HERO, power: "Light control", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Spectrum Man", side: SIDE.HERO, power: "Telekinesis & spectrum sight", tags: [CATS.PRIME] },
  { name: "Jawbreaker", side: SIDE.HERO, power: "Chews any material", tags: [CATS.PRIME] },
  { name: "Dice", side: SIDE.HERO, power: "Good luck manipulation", tags: [CATS.PRIME] },
  { name: "The Phoenician", side: SIDE.HERO, power: "Slow aging", tags: [CATS.PRIME, CATS.LEGEND] },
  { name: "Genesis", side: SIDE.HERO, power: "Object creation from imagination", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Titanium", side: SIDE.HERO, power: "Metallic skin", tags: [CATS.PRIME] },
  { name: "Sand Nomad", side: SIDE.HERO, power: "Sand control & dream-walking", tags: [CATS.PRIME, CATS.MYSTIC, CATS.ELEMENTAL] },
  { name: "EMP", side: SIDE.HERO, power: "Electromagnetic pulses", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Rapunzel", side: SIDE.HERO, power: "Living hair", tags: [CATS.PRIME] },
  { name: "The Architect", side: SIDE.HERO, power: "Constructs from existing matter", tags: [CATS.PRIME] },
  { name: "Stuck", side: SIDE.HERO, power: "Adhesive shots", tags: [CATS.PRIME] },
  { name: "Basalt", side: SIDE.HERO, power: "Basalt-like tough skin", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Gunpowder", side: SIDE.HERO, power: "Explosions", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "The Dreamer", side: SIDE.HERO, power: "Future sight", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Mirror Girl", side: SIDE.HERO, power: "Invisibility", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "The Impossible", side: SIDE.HERO, power: "Unstable over-power", tags: [CATS.PRIME] },
  { name: "Captain Israel", side: SIDE.HERO, power: "Flight", tags: [CATS.PRIME] },
  { name: "Frog Girl", side: SIDE.HERO, power: "Super-leaps & long tongue", tags: [CATS.PRIME] },
  { name: "Third-Eye", side: SIDE.HERO, power: "Tri-ocular super-vision", tags: [CATS.PRIME, CATS.MYSTIC] },
  { name: "Fortress", side: SIDE.HERO, power: "Giant growth", tags: [CATS.PRIME] },
  { name: "Shrink", side: SIDE.HERO, power: "Miniaturization", tags: [CATS.PRIME] },
  { name: "Mermaid", side: SIDE.HERO, power: "Shapeshift into mermaid", tags: [CATS.PRIME, CATS.UNDERSEA, CATS.MYSTIC, CATS.LEGEND] },
  { name: "Art Einstein", side: SIDE.HERO, power: "Super-intellect", tags: [CATS.PRIME, CATS.SCIENCE] },
  { name: "Airdance", side: SIDE.HERO, power: "Aerokinesis", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "McBot", side: SIDE.HERO, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Kid Dimension", side: SIDE.HERO, power: "Interdimensional portals", tags: [CATS.PRIME, CATS.MYSTIC, CATS.COSMIC] },
  { name: "Crystallo", side: SIDE.HERO, power: "Crystal form & creation", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Meir Yarkoni", side: SIDE.HERO, power: "Rapid healing", tags: [CATS.PRIME] },
  { name: "Mindbend", side: SIDE.HERO, power: "Mind power", tags: [CATS.PRIME] },
  { name: "Sweet Girl", side: SIDE.HERO, power: "Sugar storm", tags: [CATS.PRIME] },
  { name: "Golda", side: SIDE.HERO, power: "Golden energy", tags: [CATS.PRIME] },
  { name: "Starguard", side: SIDE.HERO, power: "Cosmic energy generation", tags: [CATS.PRIME, CATS.COSMIC] },

  // === VILLAINS ===
  { name: "Killer Volt", side: SIDE.VILLAIN, power: "Electricity", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Human Rat", side: SIDE.VILLAIN, power: "Rat-like physiology", tags: [CATS.PRIME] },
  { name: "Mr. Chalk", side: SIDE.VILLAIN, power: "Turns matter to stone", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Neon Master", side: SIDE.VILLAIN, power: "Light control", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Ice Princess", side: SIDE.VILLAIN, power: "Ice", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Mad Mechanic", side: SIDE.VILLAIN, power: "Technopathy", tags: [CATS.PRIME, CATS.TECH] },
  { name: "Fossa", side: SIDE.VILLAIN, power: "Animalistic abilities", tags: [CATS.PRIME] },
  { name: "Übermensch", side: SIDE.VILLAIN, power: "Deadly super-strength", tags: [CATS.PRIME] },
  { name: "The Human Reactor", side: SIDE.VILLAIN, power: "Nuclear", tags: [CATS.PRIME, CATS.SCIENCE] },
  { name: "Bushmaster", side: SIDE.VILLAIN, power: "Poison creation", tags: [CATS.PRIME] },
  { name: "Mudman", side: SIDE.VILLAIN, power: "Shapeshifting (mud)", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "The Golden Thief", side: SIDE.VILLAIN, power: "Super-speed", tags: [CATS.PRIME] },
  { name: "Dynamito", side: SIDE.VILLAIN, power: "Explosions", tags: [CATS.PRIME, CATS.ELEMENTAL] },
  { name: "Q", side: SIDE.VILLAIN, power: "Body reading & mimicry", tags: [CATS.PRIME] },
  { name: "The Exterminator", side: SIDE.VILLAIN, power: "Anesthetic gas", tags: [CATS.PRIME] },
  { name: "Parkour", side: SIDE.VILLAIN, power: "Super-leaps & vaults", tags: [CATS.PRIME] },
  { name: "General Darkness", side: SIDE.VILLAIN, power: "Consumes dark energy", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK] },
  { name: "Ramesses the Immortal", side: SIDE.VILLAIN, power: "Immortality", tags: [CATS.PRIME, CATS.MYSTIC, CATS.LEGEND] },
  { name: "Black Eagle", side: SIDE.VILLAIN, power: "Reflexes", tags: [CATS.PRIME] },
  { name: "Dark Mind", side: SIDE.VILLAIN, power: "Telekinesis", tags: [CATS.PRIME, CATS.DARK] },
  { name: "Alternatasha", side: SIDE.VILLAIN, power: "Matter transmutation", tags: [CATS.PRIME] },
  { name: "Scarfield", side: SIDE.VILLAIN, power: "Vampiric abilities", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK] },
  { name: "Sticker Man", side: SIDE.VILLAIN, power: "Explosive stickers", tags: [CATS.PRIME] },
  { name: "Madame Blackout", side: SIDE.VILLAIN, power: "Shadow phasing", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK] },
  { name: "The Sphinx", side: SIDE.VILLAIN, power: "Rapid healing", tags: [CATS.PRIME, CATS.LEGEND] },
  { name: "Wizmaster", side: SIDE.VILLAIN, power: "Dark magic", tags: [CATS.PRIME, CATS.MYSTIC, CATS.DARK] },
  { name: "Headmaster Vile", side: SIDE.VILLAIN, power: "Mind Manipulation & Control", tags: [CATS.PRIME, CATS.DARK] }
];

// Expose to window (for renderer)
window.CATS = CATS;
window.SIDE = SIDE;
window.characters = characters;

// (optional) Export badgeForTags for other pages/modals
window.badgeForTags = function badgeForTags(tags) {
  return (tags || []).map((t) => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
};
