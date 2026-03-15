// character.js — Dynamic character profile page
// Reads ?name=<slug> from URL, finds the character in heroJson/villainJson, and renders the full page.
(function () {
  'use strict';

  // ── Chart.js (lazy) ────────────────────────────────────────────
  if (!document.getElementById('chartjs-cdn')) {
    const s = document.createElement('script');
    s.id  = 'chartjs-cdn';
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js';
    document.head.appendChild(s);
  }

  // ── Category → brand colour ────────────────────────────────────
  const CATEGORY_COLORS = {
    Combat: '#ef4444', Physical: '#f97316', Cosmic: '#a855f7',
    Energy: '#facc15', Radiation: '#84cc16', Water: '#38bdf8',
    Magic: '#ec4899', Shadow: '#6366f1', Sonic: '#14b8a6',
    Tech: '#60a5fa', Air: '#94a3b8', Light: '#f59e0b', Quantum: '#c084fc',
    Villain: '#dc2626'
  };

  // ── URL helpers ────────────────────────────────────────────────
  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }
  function nameToSlug(name) {
    return (name || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  function slugToUrl(slug) {
    return 'character.html?name=' + encodeURIComponent(slug);
  }

  // ── Unified character list ─────────────────────────────────────
  function normalizePrimeChild(pc) {
    const tags = Array.isArray(pc && pc.tags) ? pc.tags : [];
    const side = (pc && pc.side) || 'Hero';
    const derivedCategory = tags.find((t) => t && t !== 'Prime') || 'Prime';
    const isVillain = side === 'Villain';

    return {
      superName:   (pc && pc.name) || 'Unknown',
      privateName: 'Unknown',
      Powers:      (pc && pc.power) || 'Unknown',
      img:         (pc && pc.img) || '',
      quote:       '',
      category:    isVillain ? 'Villain' : derivedCategory,
      color:       isVillain ? '#dc2626' : '#ffb703',
      status:      isVillain ? 'Villain' : 'Prime-Child',
      team:        isVillain ? 'Rogue Prime-Children' : 'Prime-Children',
      description: '',
      allies:      [],
      enemies:     [],
      stats:       null
    };
  }

  function getAllCharacters() {
    const heroes   = typeof superList   !== 'undefined' ? superList   : [];
    const villains = typeof villainList !== 'undefined'
      ? villainList.map(v => ({
          superName:   v.supername   || v.superName || 'Unknown',
          privateName: v.privateName || 'Unknown',
          Powers:      v.powers      || v.Powers    || 'Unknown',
          img:         v.img || '',
          quote:       v.quote       || '',
          category:    v.category    || 'Villain',
          color:       v.color       || '#dc2626',
          status:      v.status      || 'Villain',
          team:        v.team        || 'Independent',
          description: v.description || '',
          allies:      v.allies      || [],
          enemies:     v.enemies     || [],
          stats:       v.stats       || null
        }))
      : [];

    const primeChildren = Array.isArray(window.characters)
      ? window.characters.map(normalizePrimeChild)
      : [];

    // Keep rich profiles from hero/villain JSON as source of truth.
    const merged = new Map();
    [...heroes, ...villains].forEach((c) => merged.set(nameToSlug(c.superName), c));

    primeChildren.forEach((pc) => {
      const slug = nameToSlug(pc.superName);
      if (!merged.has(slug)) {
        merged.set(slug, pc);
        return;
      }

      const existing = merged.get(slug);
      merged.set(slug, {
        ...pc,
        ...existing,
        img: existing.img || pc.img,
        Powers: existing.Powers || pc.Powers,
        category: existing.category || pc.category,
        color: existing.color || pc.color,
        status: existing.status || pc.status,
        team: existing.team || pc.team
      });
    });

    return Array.from(merged.values());
  }

  function findCharacter(slug, allChars) {
    const normalizedSlug = nameToSlug(slug);
    return allChars.find(c => nameToSlug(c.superName) === normalizedSlug) || null;
  }

  function charColor(char) {
    return char.color || CATEGORY_COLORS[char.category] || '#ffb703';
  }

  // ── Theme application ──────────────────────────────────────────
  function applyTheme(char) {
    const color = charColor(char);
    const root  = document.documentElement;
    root.style.setProperty('--char-color',     color);
    root.style.setProperty('--char-color-dim', color + '22');
    root.style.setProperty('--char-color-mid', color + '44');

    const banner = document.getElementById('char-banner');
    if (banner) {
      banner.style.background =
        `radial-gradient(ellipse at 65% 35%, ${color}2e 0%, transparent 60%),
         linear-gradient(160deg, #0b0f16 40%, ${color}18 100%)`;
    }
    const portraitCard = document.getElementById('char-portrait-card');
    if (portraitCard) portraitCard.style.borderTop = `3px solid ${color}`;
  }

  // ── Side navigation ────────────────────────────────────────────
  function buildSideNav(heroes, currentSlug) {
    const nav = document.getElementById('charSideNav');
    if (!nav) return;
    nav.innerHTML = heroes.map(c => {
      const slug   = nameToSlug(c.superName);
      const color  = charColor(c);
      const active = slug === currentSlug;
      return `<a href="${slugToUrl(slug)}"
                 class="char-sidenav-link${active ? ' active' : ''}"
                 title="${c.superName}"
                 ${active ? `style="border-left-color:${color};color:${color};"` : ''}>
               <span class="char-sidenav-dot" style="background:${color};${active ? `box-shadow:0 0 6px ${color}88;` : ''}"></span>
               ${c.superName}
             </a>`;
    }).join('');
  }

  // ── Infobox ────────────────────────────────────────────────────
  function renderInfobox(char, targetId) {
    const box = document.getElementById(targetId);
    if (!box) return;
    const color = charColor(char);

    const imgSrc = char.img || 'contents/indexphoto/logo.webp';
    const rows   = [
      ['Status',    `<span class="infobox-badge" style="background:${color}22;color:${color};border:1px solid ${color}55;">${char.status || 'Active'}</span>`],
      ['Real Name', char.privateName !== 'Unknown' ? char.privateName : '—'],
      ['Powers',    char.Powers || '—'],
      ['Type',      char.category || '—'],
      ['Team',      char.team || 'Solo'],
    ];

    if (targetId === 'char-infobox') {
      // Desktop static infobox
      const header = document.getElementById('char-infobox-header');
      if (header) {
        header.style.background = `linear-gradient(135deg, ${color}33, ${color}11)`;
        header.style.borderBottom = `2px solid ${color}55`;
      }
      const nameEl = document.getElementById('char-infobox-name');
      const idEl   = document.getElementById('char-infobox-id');
      const imgEl  = document.getElementById('char-infobox-img');
      const tbody  = document.getElementById('char-infobox-tbody');

      if (nameEl) nameEl.textContent = char.superName;
      if (idEl)   idEl.textContent   = char.privateName !== 'Unknown' ? `"${char.privateName}"` : '';
      if (imgEl)  { imgEl.src = imgSrc; imgEl.alt = char.superName; }
      if (tbody)  tbody.innerHTML = rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('');
    } else {
      // Mobile inline infobox
      box.innerHTML = `
        <div class="char-infobox glass rounded-4 overflow-hidden">
          <div class="char-infobox-header p-3 text-center"
               style="background:linear-gradient(135deg,${color}33,${color}11);border-bottom:2px solid ${color}55;">
            <h3 class="fw-bold mb-0">${char.superName}</h3>
            ${char.privateName !== 'Unknown' ? `<small class="opacity-75">"${char.privateName}"</small>` : ''}
          </div>
          <img src="${imgSrc}" alt="${char.superName}" class="char-infobox-img"
               onerror="this.src='contents/indexphoto/logo.webp'" />
          <table class="char-infobox-table w-100">
            <tbody>${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody>
          </table>
        </div>`;
    }
  }

  // ── Radar chart ────────────────────────────────────────────────
  function renderRadarChart(char) {
    const wrap   = document.querySelector('.char-radar-wrap');
    const canvas = document.getElementById('charRadarChart');
    if (!char.stats) { if (wrap) wrap.style.display = 'none'; return; }

    const color  = charColor(char);
    const labels = ['Strength', 'Speed', 'Intelligence', 'Energy', 'Defense'];
    const data   = [char.stats.strength, char.stats.speed, char.stats.intelligence,
                    char.stats.energy,   char.stats.defense];

    function draw() {
      new Chart(canvas, {
        type: 'radar',
        data: {
          labels,
          datasets: [{
            label: char.superName,
            data,
            backgroundColor: color + '2e',
            borderColor:     color,
            pointBackgroundColor: color,
            borderWidth: 2,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 10,
              ticks: { display: false },
              grid: { color: 'rgba(255,255,255,0.10)' },
              pointLabels: { color: '#e2e8f0', font: { size: 12, weight: '600' } }
            }
          }
        }
      });
    }
    if (typeof Chart !== 'undefined') draw();
    else document.getElementById('chartjs-cdn').addEventListener('load', draw, { once: true });
  }

  // ── Stat progress bars ─────────────────────────────────────────
  function renderStatBars(char) {
    const container = document.getElementById('char-stat-bars');
    if (!container || !char.stats) return;
    const color  = charColor(char);
    const labels = { strength: 'Strength', speed: 'Speed', intelligence: 'Intelligence', energy: 'Energy', defense: 'Defense' };
    container.innerHTML = Object.entries(labels).map(([key, label]) => {
      const val = char.stats[key] || 0;
      return `
        <div class="mb-2">
          <div class="d-flex justify-content-between small mb-1">
            <span>${label}</span>
            <span class="fw-bold" style="color:${color};">${val}/10</span>
          </div>
          <div class="char-stat-track">
            <div class="char-stat-fill" style="width:${val * 10}%;background:${color};"
                 role="progressbar" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="10"></div>
          </div>
        </div>`;
    }).join('');
  }

  // ── Relations ──────────────────────────────────────────────────
  function renderRelations(char) {
    const alliesEl  = document.getElementById('char-allies');
    const enemiesEl = document.getElementById('char-enemies');
    if (alliesEl) {
      alliesEl.innerHTML = (char.allies || []).length
        ? char.allies.map(a =>
            `<a href="${slugToUrl(nameToSlug(a))}"
                class="badge rounded-pill char-ally-badge text-decoration-none">${a}</a>`
          ).join('')
        : `<span class="text-secondary small">None listed</span>`;
    }
    if (enemiesEl) {
      enemiesEl.innerHTML = (char.enemies || []).length
        ? char.enemies.map(e =>
            `<span class="badge rounded-pill char-enemy-badge">${e}</span>`
          ).join('')
        : `<span class="text-secondary small">None listed</span>`;
    }
  }

  // ── Prev / Next ─────────────────────────────────────────────────
  function buildPrevNext(heroes, currentSlug) {
    const idx     = heroes.findIndex(c => nameToSlug(c.superName) === currentSlug);
    const prevBtn = document.getElementById('char-prev');
    const nextBtn = document.getElementById('char-next');

    if (idx > 0 && prevBtn) {
      const prev = heroes[idx - 1];
      prevBtn.classList.remove('d-none');
      prevBtn.href = slugToUrl(nameToSlug(prev.superName));
      const pnEl = document.getElementById('prev-name');
      if (pnEl) pnEl.textContent = prev.superName;
    }
    if (idx < heroes.length - 1 && nextBtn) {
      const next = heroes[idx + 1];
      nextBtn.classList.remove('d-none');
      nextBtn.href = slugToUrl(nameToSlug(next.superName));
      const nnEl = document.getElementById('next-name');
      if (nnEl) nnEl.textContent = next.superName;
    }
  }

  // ── Main render ────────────────────────────────────────────────
  function renderPage(char, allChars, currentSlug) {
    const color  = charColor(char);
    const heroes = allChars.filter(c => c.status !== 'Villain');

    // Meta / head
    document.title = `Compass World | ${char.superName}`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.content = `${char.superName} — ${char.description || char.Powers}`;

    // Banner
    const nameEl  = document.getElementById('char-hero-name');
    const quoteEl = document.getElementById('char-banner-quote');
    const bcName  = document.getElementById('breadcrumb-name');
    if (nameEl)  nameEl.textContent  = char.superName;
    if (quoteEl) quoteEl.textContent = char.quote || '';
    if (bcName)  bcName.textContent  = char.superName;

    // Portrait
    const portrait = document.getElementById('char-portrait');
    if (portrait) {
      portrait.src = char.img || 'contents/indexphoto/logo.webp';
      portrait.alt = char.superName;
    }
    const quoteCard = document.getElementById('char-quote');
    if (quoteCard) quoteCard.textContent = char.quote || '';

    // Power tags
    const tagsEl = document.getElementById('char-power-tags');
    if (tagsEl) {
      const pow = (char.Powers || '').split(/[,\/]/).map(p => p.trim()).filter(Boolean);
      tagsEl.innerHTML = pow.map(p =>
        `<span class="badge rounded-pill me-1 mb-1 char-power-tag"
               style="background:${color}22;color:${color};border:1px solid ${color}55;">${p}</span>`
      ).join('');
      if (char.category) {
        tagsEl.innerHTML +=
          `<span class="badge rounded-pill me-1 mb-1 char-power-tag"
                 style="background:${color};color:#111;">${char.category}</span>`;
      }
    }

    // Bio
    const bioEl = document.getElementById('char-description');
    if (bioEl) {
      bioEl.textContent = char.description ||
        `${char.superName} is a ${char.status || 'hero'} affiliated with ${char.team || 'the Compass Alliance'}, known for ${char.Powers || 'exceptional abilities'}. A key figure in the modern age of prime-children.`;
    }

    // Theme
    applyTheme(char);

    // Sidebar
    buildSideNav(heroes, currentSlug);

    // Infobox (desktop)
    renderInfobox(char, 'char-infobox');

    // Infobox (mobile)
    renderInfobox(char, 'infobox-mobile');

    // Charts + bars
    renderRadarChart(char);
    renderStatBars(char);

    // Relations
    renderRelations(char);

    // Prev / Next
    buildPrevNext(heroes, currentSlug);
  }

  // ── Not found ──────────────────────────────────────────────────
  function showNotFound(slug) {
    document.title = 'Compass World | Not Found';
    const main = document.querySelector('main');
    if (main) main.innerHTML = `
      <div class="container text-center py-5">
        <i class="bi bi-question-circle display-1 text-warning opacity-40"></i>
        <h2 class="mt-4 text-warning">Character Not Found</h2>
        <p class="text-secondary">No character matching "<strong>${slug}</strong>" exists in the database.</p>
        <a href="files.html" class="btn btn-warning mt-3">← Back to Gods &amp; Monsters</a>
      </div>`;
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    const slugParam = getParam('name');
    if (!slugParam) { window.location.replace('files.html'); return; }

    const slug = nameToSlug(slugParam);

    const allChars = getAllCharacters();
    const char     = findCharacter(slug, allChars);
    if (!char) { showNotFound(slugParam); return; }

    renderPage(char, allChars, slug);

    if (typeof NavigationModule !== 'undefined') {
      NavigationModule.init({ currentPage: 'files' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
