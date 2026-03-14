// globalSearch.js — Site-wide character search overlay
// Triggered by Ctrl+K or clicking the search button in the navbar.
// Lazy-loads hero/villain data if not already present on the page.
(function () {
  'use strict';

  const OVERLAY_ID = 'globalSearchOverlay';
  const STORAGE_KEY = 'cw-recent-searches';
  const MAX_RECENT = 5;

  function nameToSlug(name) {
    return (name || '').toLowerCase().replace(/\s+/g, '-');
  }

  // ── Lazy-load data scripts if not yet on page ──────────────────
  function ensureData(callback) {
    const heroesReady   = typeof superList   !== 'undefined';
    const villainsReady = typeof villainList  !== 'undefined';
    if (heroesReady && villainsReady) { callback(); return; }

    let pending = 0;
    function done() { if (--pending <= 0) callback(); }

    if (!heroesReady) {
      pending++;
      const s = document.createElement('script');
      s.src = 'assets/scripts/heroJson.js';
      s.onload = done;
      document.head.appendChild(s);
    }
    if (!villainsReady) {
      pending++;
      const s = document.createElement('script');
      s.src = 'assets/scripts/villainJson.js';
      s.onload = done;
      document.head.appendChild(s);
    }
    if (pending === 0) callback();
  }

  // ── Build unified list ─────────────────────────────────────────
  function getAll() {
    const heroes   = typeof superList   !== 'undefined' ? superList   : [];
    const villains = typeof villainList !== 'undefined'
      ? villainList.map(v => ({
          superName: v.supername || v.superName || '',
          Powers:    v.powers    || v.Powers    || '',
          img:       v.img || '',
          category:  v.category || 'Villain',
          color:     v.color    || '#dc2626',
          status:    'Villain'
        }))
      : [];
    return [...heroes, ...villains].filter(c => c.superName);
  }

  // ── Recent searches ────────────────────────────────────────────
  function getRecent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }
  function pushRecent(name) {
    const list = getRecent().filter(n => n !== name);
    list.unshift(name);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
  }

  // ── Category colour ────────────────────────────────────────────
  const CAT_COLORS = {
    Combat: '#ef4444', Physical: '#f97316', Cosmic: '#a855f7',
    Energy: '#facc15', Radiation: '#84cc16', Water: '#38bdf8',
    Magic: '#ec4899', Shadow: '#6366f1', Sonic: '#14b8a6',
    Tech: '#60a5fa', Air: '#94a3b8', Light: '#f59e0b', Quantum: '#c084fc',
    Villain: '#dc2626'
  };
  function charColor(c) { return c.color || CAT_COLORS[c.category] || '#ffb703'; }

  // ── Build result HTML ──────────────────────────────────────────
  function resultHTML(chars) {
    if (!chars.length) return `
      <li class="gs-empty">
        <i class="bi bi-search me-2 opacity-50"></i>No characters found
      </li>`;
    return chars.slice(0, 8).map(c => {
      const color = charColor(c);
      const slug  = nameToSlug(c.superName);
      const img   = c.img || 'contents/indexphoto/logo.webp';
      return `
        <li>
          <a href="character.html?name=${encodeURIComponent(slug)}"
             class="gs-result-link"
             data-name="${c.superName}"
             style="--rc: ${color};">
            <img src="${img}" alt="${c.superName}" class="gs-result-img"
                 onerror="this.src='contents/indexphoto/logo.webp'" />
            <div class="gs-result-info">
              <span class="gs-result-name">${c.superName}</span>
              <span class="gs-result-powers">${c.Powers || '—'}</span>
            </div>
            <span class="gs-result-cat" style="background:${color}22;color:${color};border:1px solid ${color}44;">${c.category || ''}</span>
          </a>
        </li>`;
    }).join('');
  }

  // ── Create overlay DOM ─────────────────────────────────────────
  function createOverlay() {
    if (document.getElementById(OVERLAY_ID)) return;
    const el = document.createElement('div');
    el.id = OVERLAY_ID;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Character search');
    el.innerHTML = `
      <div class="gs-backdrop"></div>
      <div class="gs-panel">
        <div class="gs-handle" role="presentation" aria-hidden="true"></div>
        <div class="gs-search-bar">
          <i class="bi bi-search gs-search-icon"></i>
          <input type="text" id="gsInput" class="gs-input"
                 placeholder="Search characters…" autocomplete="off" spellcheck="false" />
          <kbd class="gs-esc-hint">Esc</kbd>
        </div>
        <ul class="gs-results" id="gsResults" role="listbox"></ul>
        <div class="gs-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Open</span>
          <span><kbd>Esc</kbd> Close</span>
          <span class="ms-auto"><a href="files.html" class="text-warning text-decoration-none small">View all →</a></span>
        </div>
        <div class="gs-footer-mobile">
          <span>Tap outside to close</span>
          <a href="files.html" class="text-warning text-decoration-none small">View all →</a>
        </div>
      </div>`;
    document.body.appendChild(el);
    initOverlayLogic(el);
  }

  function initOverlayLogic(el) {
    const backdrop  = el.querySelector('.gs-backdrop');
    const input     = el.querySelector('#gsInput');
    const resultsList = el.querySelector('#gsResults');
    let allChars    = [];
    let focusIdx    = -1;

    function close() {
      el.classList.remove('open');
      document.body.style.overflow = '';
      input.value = '';
      focusIdx = -1;
    }

    function open() {
      ensureData(() => {
        allChars = getAll();
        showRecent();
      });
      el.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 50);
    }

    function showRecent() {
      const recent = getRecent();
      if (!recent.length) {
        resultsList.innerHTML = `<li class="gs-empty opacity-60"><i class="bi bi-clock me-2"></i>Start typing to search…</li>`;
        return;
      }
      const matches = allChars.filter(c => recent.includes(c.superName));
      resultsList.innerHTML = `<li class="gs-section-label">Recent</li>` + resultHTML(matches.length ? matches : []);
    }

    function search(term) {
      if (!term) { showRecent(); return; }
      const t = term.toLowerCase();
      const filtered = allChars.filter(c =>
        c.superName.toLowerCase().includes(t) ||
        (c.Powers || '').toLowerCase().includes(t) ||
        (c.category || '').toLowerCase().includes(t) ||
        (c.privateName || '').toLowerCase().includes(t)
      );
      resultsList.innerHTML = resultHTML(filtered);
      focusIdx = -1;
    }

    input.addEventListener('input', e => search(e.target.value.trim()));

    // Keyboard nav
    el.addEventListener('keydown', e => {
      const items = resultsList.querySelectorAll('.gs-result-link');
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusIdx = Math.min(focusIdx + 1, items.length - 1);
        items[focusIdx]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusIdx = Math.max(focusIdx - 1, -1);
        if (focusIdx >= 0) items[focusIdx]?.focus(); else input.focus();
      }
    });

    // Track clicks on results
    resultsList.addEventListener('click', e => {
      const link = e.target.closest('.gs-result-link');
      if (link) {
        pushRecent(link.dataset.name);
        close();
      }
    });

    backdrop.addEventListener('click', close);

    // Expose open/close globally
    window.globalSearch = { open, close };
  }

  // ── Inject CSS ─────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('gs-styles')) return;
    const style = document.createElement('style');
    style.id = 'gs-styles';
    style.textContent = `
#globalSearchOverlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  align-items: flex-start;
  justify-content: center;
  padding-top: clamp(3rem, 10vh, 8rem);
}
#globalSearchOverlay.open { display: flex; }
.gs-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.65);
  backdrop-filter: blur(4px);
  animation: gs-fade-in .15s ease;
}
.gs-panel {
  position: relative;
  width: min(640px, calc(100vw - 2rem));
  background: #0d1117;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 1rem;
  box-shadow: 0 32px 64px rgba(0,0,0,.6);
  overflow: hidden;
  animation: gs-slide-in .2s cubic-bezier(.4,0,.2,1);
}
[data-theme="light"] .gs-panel {
  background: #fff;
  border-color: rgba(0,0,0,.15);
}
.gs-search-bar {
  display: flex;
  align-items: center;
  gap: .65rem;
  padding: .85rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
[data-theme="light"] .gs-search-bar { border-bottom-color: rgba(0,0,0,.1); }
.gs-search-icon { color: #94a3b8; font-size: 1.1rem; flex-shrink: 0; }
.gs-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #f8fafc;
  font-size: 1.05rem;
  font-family: inherit;
}
[data-theme="light"] .gs-input { color: #0f172a; }
.gs-input::placeholder { color: #64748b; }
.gs-esc-hint {
  font-size: .72rem;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: .35rem;
  padding: .15rem .45rem;
  color: #94a3b8;
  flex-shrink: 0;
}
.gs-results {
  list-style: none;
  margin: 0;
  padding: .4rem 0;
  max-height: 380px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.15) transparent;
}
.gs-section-label {
  padding: .35rem 1rem .2rem;
  font-size: .72rem;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #64748b;
  font-weight: 700;
}
.gs-empty {
  padding: 1.5rem 1rem;
  text-align: center;
  color: #64748b;
  font-size: .9rem;
}
.gs-result-link {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .6rem 1rem;
  text-decoration: none;
  transition: background .15s ease;
  cursor: pointer;
  border-left: 3px solid transparent;
  color: inherit;
}
.gs-result-link:hover,
.gs-result-link:focus {
  background: rgba(255,255,255,.06);
  border-left-color: var(--rc, #ffb703);
  outline: none;
}
[data-theme="light"] .gs-result-link:hover,
[data-theme="light"] .gs-result-link:focus {
  background: rgba(0,0,0,.05);
}
.gs-result-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: .5rem;
  flex-shrink: 0;
  background: rgba(255,255,255,.05);
}
.gs-result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.gs-result-name {
  font-weight: 700;
  color: #f8fafc;
  font-size: .92rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
[data-theme="light"] .gs-result-name { color: #0f172a; }
.gs-result-powers {
  color: #64748b;
  font-size: .78rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gs-result-cat {
  font-size: .7rem;
  font-weight: 700;
  padding: .15rem .5rem;
  border-radius: 999px;
  flex-shrink: 0;
}
.gs-footer {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: .55rem 1rem;
  border-top: 1px solid rgba(255,255,255,.07);
  font-size: .75rem;
  color: #64748b;
}
[data-theme="light"] .gs-footer { border-top-color: rgba(0,0,0,.08); }
.gs-footer kbd {
  font-size: .68rem;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: .3rem;
  padding: .1rem .35rem;
  color: #e2e8f0;
}
[data-theme="light"] .gs-footer kbd {
  background: rgba(0,0,0,.07);
  border-color: rgba(0,0,0,.15);
  color: #334155;
}
@keyframes gs-fade-in  { from { opacity: 0 } to { opacity: 1 } }
@keyframes gs-slide-in { from { opacity:0;transform:translateY(-12px) scale(.97) } to { opacity:1;transform:none } }
@keyframes gs-sheet-in { from { transform:translateY(100%); opacity:.6 } to { transform:translateY(0); opacity:1 } }

/* ── Drag handle (shown on mobile) ──────────── */
.gs-handle {
  display: none;
  width: 2.75rem; height: .28rem;
  background: rgba(255,255,255,.22);
  border-radius: 999px;
  margin: .65rem auto .15rem;
  flex-shrink: 0;
}
[data-theme="light"] .gs-handle { background: rgba(0,0,0,.18); }

/* ── Mobile-only footer hint ─────────────────── */
.gs-footer-mobile {
  display: none;
  gap: .5rem;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 1rem .6rem;
  border-top: 1px solid rgba(255,255,255,.07);
  font-size: .78rem;
  color: #64748b;
}
[data-theme="light"] .gs-footer-mobile { border-top-color: rgba(0,0,0,.08); }

/* ── RESPONSIVE: bottom-sheet on mobile ─────────────────────── */
@media (max-width: 639px) {
  #globalSearchOverlay {
    align-items: flex-end;
    padding-top: 0;
  }
  .gs-panel {
    width: 100%;
    max-height: 90dvh;
    max-height: 90vh;        /* fallback for older browsers */
    border-radius: 1.25rem 1.25rem 0 0;
    border-bottom: none;
    border-left: none;
    border-right: none;
    display: flex;
    flex-direction: column;
    animation: gs-sheet-in .28s cubic-bezier(.4,0,.2,1);
  }
  .gs-handle      { display: block; }
  .gs-results     { max-height: min(52vh, 340px); flex: 1; }
  .gs-esc-hint    { display: none; }
  .gs-footer      { display: none; }
  .gs-footer-mobile { display: flex; }
  /* ≥16px prevents iOS auto-zoom on input focus */
  .gs-input       { font-size: 1rem; }
  /* Simplify result rows on narrow screens */
  .gs-result-cat  { display: none; }
  .gs-result-img  { width: 36px; height: 36px; }
  .gs-result-link { padding: .55rem .9rem; gap: .6rem; }
  .gs-search-bar  { padding: .75rem .9rem; }
}
    `;
    document.head.appendChild(style);
  }

  // ── Wire up trigger buttons (desktop + mobile) ──────────────────
  function bindTrigger() {
    ['globalSearchBtn', 'globalSearchBtnMobile'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => window.globalSearch?.open());
    });
  }

  // ── Keyboard shortcut Ctrl+K / Cmd+K ─────────────────────────
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (document.getElementById(OVERLAY_ID)?.classList.contains('open')) {
        window.globalSearch?.close();
      } else {
        window.globalSearch?.open();
      }
    }
  });

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    injectCSS();
    createOverlay();
    bindTrigger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
