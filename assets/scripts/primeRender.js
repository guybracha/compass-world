// assets/scripts/primeRender.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ----- constants -----
  const PLACEHOLDER_WEBP = 'https://placehold.co/512x512/webp?text=Avatar';

  // ----- helpers (img + slug) -----
  function slugifyName(name) {
    return String(name || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')                     // keep safe chars
      .trim()
      .replace(/\s+/g, '-')                             // spaces -> hyphen
      .replace(/-+/g, '-');
  }

  function deriveImgFromSideAndName(side, name) {
    const slug = slugifyName(name);
    if (!slug) return null;
    const base = side === 'Hero'
      ? 'contents/avatar2024/heroes/'
      : 'contents/avatar2024/villains/';
    return `${base}${slug}.webp`;
  }

  function imgUrlFor(charObj) {
    // prefer explicit img; else derive from side+name
    return (charObj && charObj.img)
      ? charObj.img
      : deriveImgFromSideAndName(charObj?.side, charObj?.name);
  }

  function imgTag(src, alt = '', classNames = 'w-100 h-100', extra = '') {
    const safeAlt = alt || 'avatar';
    // onerror fallback to placeholder (1:1 webp)
    return `<img src="${src || PLACEHOLDER_WEBP}" alt="${safeAlt}" class="${classNames}"
             style="object-fit: cover;"
             onerror="this.onerror=null;this.src='${PLACEHOLDER_WEBP}';"
             ${extra}>`;
  }

  // ----- data -----
  const raw = Array.isArray(window.characters) ? window.characters : [];
  const data = raw.map(c => {
    const base = {
      name:  (c && c.name)  || '',
      side:  (c && c.side)  || '',
      power: (c && c.power) || '',
      tags:  Array.isArray(c && c.tags) ? c.tags : []
    };
    const url = imgUrlFor(c);
    return { ...base, img: url };
  });

  // ----- DOM (old layout) -----
  const grid        = document.getElementById('pc-grid');
  const sideSel     = document.getElementById('filter-side');
  const catSel      = document.getElementById('filter-cat');   // optional
  const searchInput = document.getElementById('filter-search');

  if (!grid || (!sideSel && !searchInput)) {
    console.warn('[PrimeRender] Old layout controls not found (pc-grid / filter-*)');
    return;
  }

  // build categories from tags (if select exists)
  if (catSel) {
    const cats = [...new Set(data.flatMap(c => c.tags))].sort();
    catSel.innerHTML = '<option>All</option>' + cats.map(c => `<option>${c}</option>`).join('');
  }

  // helpers
  const tagBadges = (tags=[]) => tags.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('');

  function card(it){
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 glass text-white border-0">
        <div class="ratio ratio-1x1">
          ${imgTag(it.img, `${it.name} — ${it.side}`, 'w-100 h-100')}
        </div>
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="card-title mb-0">${it.name}</h5>
            <span class="badge ${it.side === 'Hero' ? 'bg-success' : 'bg-danger'}">${it.side}</span>
          </div>
          <p class="small text-warning mb-2"><i class="bi bi-lightning-charge"></i> ${it.power || ''}</p>
          <div class="mb-3">${tagBadges(it.tags)}</div>
          <div class="mt-auto">
            <button class="btn btn-outline-warning btn-sm w-100"
                    data-bs-toggle="modal" data-bs-target="#pcModal"
                    data-name="${it.name}">
              Profile
            </button>
          </div>
        </div>
      </div>`;
    return col;
  }

  function match(it){
    const side = sideSel ? sideSel.value : 'All';
    if (side !== 'All' && it.side !== side) return false;

    if (catSel && catSel.value !== 'All') {
      if (!Array.isArray(it.tags) || !it.tags.includes(catSel.value)) return false;
    }

    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    if (q && !(`${it.name} ${it.power}`.toLowerCase().includes(q))) return false;

    return true;
  }

  function render(){
    const list = data.filter(match);
    grid.innerHTML = '';
    list.forEach(it => grid.appendChild(card(it)));
  }

  [sideSel, catSel, searchInput].forEach(el => el && el.addEventListener('input', render));

  // modal fill
  const modal = document.getElementById('pcModal');
  if (modal){
    modal.addEventListener('show.bs.modal', ev => {
      const name = ev.relatedTarget && ev.relatedTarget.getAttribute('data-name');
      const ch = data.find(x => x.name === name);

      const ttl = modal.querySelector('#pcModalLabel');
      if (ttl) ttl.textContent = (ch && ch.name) || 'Profile';

      const body = modal.querySelector('#pcModalBody');
      if (body) {
        const imgHtml = `
          <div class="ratio ratio-1x1 mb-3" style="max-width: 320px; margin: 0 auto;">
            ${imgTag(ch && ch.img, `${ch?.name || 'avatar'} — ${ch?.side || ''}`, 'w-100 h-100 rounded')}
          </div>
        `;

        body.innerHTML = `
          <div class="text-center">
            ${imgHtml}
            <div class="mb-2">
              <span class="badge ${ch && ch.side === 'Hero' ? 'bg-success' : 'bg-danger'}">${(ch && ch.side) || ''}</span>
            </div>
            <div class="text-warning mb-2"><i class="bi bi-lightning-charge"></i> ${(ch && ch.power) || ''}</div>
            <div class="mb-3">${tagBadges(ch && ch.tags || [])}</div>
            <p class="small text-secondary mb-0">Bio coming soon. This entry is part of the Prime-Children initiative.</p>
          </div>`;
      }
    });
  }

  render();
});
