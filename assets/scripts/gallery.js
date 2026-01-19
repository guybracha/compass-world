// assets/scripts/gallery.js
// ====== Gallery with Modular Search & Filters ======

// ====== Gallery data (עדכן נתיבים/תגיות לפי הקבצים שלך) ======
const GALLERY_ITEMS = [
  {
    title: "Unite to Action!",
    src: "contents/art2025/toAction.webp",
    caption: "Core poster – Compass Alliance to action.",
    tags: ["poster","alliance"]
  },
  {
    title: "Bright lights, bigger city",
    src: "contents/art2025/cyberpunk.webp",
    caption: "Mysterious cyberpunk cityscape.",
    tags: ["prime","poster","myth"]
  },
  {
    title: "Wing Squad",
    src: "contents/art2025/wings.webp",
    caption: "The winged members of the alliance: Dragon Fighter, Captain Phoenix, and Mariposa.",
    tags: ["prime","poster"]
  },
  {
    title: "Honey, I Shrunk the Heroes",
    src: "contents/art2025/shrink.webp",
    caption: "Dr. monstro has shrunk paladin, voltage, and lady astral",
    tags: ["prime","poster"]
  },
  {
    title: "Kaiju Royale",
    src: "contents/art2025/kaiju.webp",
    caption: "The whole alliance faces off against gigantic kaiju.",
    tags: ["alliance","poster"]
  },
    {
    title: "Hero Summit",
    src: "contents/art2025/kaiju1.webp",
    caption: "The compass alliance convention of young heroes.",
    tags: ["alliance","poster"]
  },
    {
    title: "Team Voltage",
    src: "contents/art2025/voltage.webp",
    caption: "Voltage and his secret group.",
    tags: ["alliance","poster"]
  },
  {
    title: "Election day",
    src: "contents/art2025/election.webp",
    caption: "Voltage, Gigantic, Lady Astral, and Astro Sentry are fighting each other to be the new leader.",
    tags: ["myth","villains","poster"]
  },
  {
    title: "Giant Size Alliance",
    src: "contents/art2025/giantSize.webp",
    caption: "An homage to the classic giant-size x-men #1 comics.",
    tags: ["space","poster"]
  },
  {
    title: "A wide Circle",
    src: "contents/art2025/circle.webp",
    caption: "A concept art for a new project in 2026.",
    tags: ["concept art","poster"]
  },
  {
    title: "My Dream Team",
    src: "contents/art2025/dreamteam.webp",
    caption: "A widescreen concept art featuring the compass alliance.",
    tags: ["concept art","poster", "widescreen"]
  },
  {
    title: "One Piece Remake",
    src: "contents/art2025/onePiece.webp",
    caption: "A scene remake from one piece featuring compass alliance characters.",
    tags: ["cartoon","remake"]
  },
  {
    title: "Spectrum Man",
    src: "contents/art2025/spectrumMan.webp",
    caption: "A concept art featuring Spectrum Man.",
    tags: ["concept art","spectrum man"]
  },
  {
    title: "Futureberg Branch - PowerPoint",
    src: "contents/art2025/powerPoint.webp",
    caption: "A comedic scene of the futureberg staff based on the office.",
    tags: ["comedy","remake"]
  }
];

// ====== Selectors ======
const grid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterBtns = [...document.querySelectorAll('.filter-btn')];
const clearBtn = document.getElementById('clearFilters');

// ====== Template ======
function cardTemplate(item, idx){
  const tagsHtml = item.tags.map(t => `<span class="badge rounded-pill tag-badge me-1">${t}</span>`).join("");
  return `
    <div class="col-6 col-md-4 col-lg-3 gallery-col" data-tags="${item.tags.join(',')}" data-title="${item.title.toLowerCase()}">
      <article class="gallery-card glass rounded-4 h-100 p-2">
        <button class="btn p-0 border-0 bg-transparent w-100 text-start" 
                data-src="${item.src}" 
                data-title="${item.title}" 
                data-caption="${item.caption || ''}"
                data-bs-toggle="modal" 
                data-bs-target="#imgModal" 
                aria-label="Open ${item.title}">
          <img class="img-fluid rounded-3 w-100" src="${item.src}" alt="${item.title}" loading="lazy"/>
        </button>
        <div class="px-1 py-2">
          <h6 class="mb-1">${item.title}</h6>
          <div class="small text-secondary">${tagsHtml}</div>
        </div>
      </article>
    </div>
  `;
}

// ====== Render ======
function render(items){
  grid.innerHTML = items.map(cardTemplate).join('');
  emptyState.classList.toggle('d-none', items.length > 0);
}

// ====== Filtering & Search (Using Modular Functions) ======
let currentFilter = 'all';

function applyFilters(){
  const q = (searchInput.value || '').trim().toLowerCase();
  
  // שימוש במודול החיפוש המרכזי
  const filtered = SearchModule.searchAndSort(GALLERY_ITEMS, {
    searchTerm: q,
    searchFields: ['title', 'caption'],
    tags: currentFilter === 'all' ? null : [currentFilter],
    tagField: 'tags'
  });
  
  render(filtered);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);
clearBtn.addEventListener('click', () => {
  currentFilter = 'all';
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  searchInput.value = '';
  applyFilters();
});

// ====== Modal Logic ======
const imgModal = document.getElementById('imgModal');
const imgEl = document.getElementById('imgModalImg');
const titleEl = document.getElementById('imgModalTitle');
const captionEl = document.getElementById('imgModalCaption');

imgModal.addEventListener('show.bs.modal', (e) => {
  const btn = e.relatedTarget;
  const src = btn.getAttribute('data-src');
  const title = btn.getAttribute('data-title');
  const caption = btn.getAttribute('data-caption');
  
  if(!src) return;
  imgEl.src = src;
  imgEl.alt = title;
  titleEl.textContent = title;
  captionEl.textContent = caption || '';
});

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
  // אתחול ניווט
  NavigationModule.init({
    currentPage: 'gallery'
  });
  
  // אתחול תצוגה
  document.getElementById('year').textContent = new Date().getFullYear();
  render(GALLERY_ITEMS);
  
  // הוספת אנימציות
  if (typeof UIUtils !== 'undefined') {
    UIUtils.fadeInElements('.gallery-col', 50);
  }
});
