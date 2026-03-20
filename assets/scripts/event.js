// assets/scripts/event.js
// Dynamic event page renderer for event.html?id=<event-id>

'use strict';

(function () {
  function slugifyName(name) {
    return String(name || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  function getEventMap() {
    return window.eventsCatalog || {};
  }

  function getAllCharacterNames() {
    const heroes = Array.isArray(window.superList)
      ? window.superList.map((h) => h.superName).filter(Boolean)
      : [];

    const villains = Array.isArray(window.villainList)
      ? window.villainList.map((v) => v.supername || v.superName).filter(Boolean)
      : [];

    return new Set([...heroes, ...villains]);
  }

  function findKnownCharacter(name, knownSet) {
    const clean = String(name || '').trim();
    if (!clean) return null;

    if (knownSet.has(clean)) return clean;

    const cleanSlug = slugifyName(clean);
    for (const n of knownSet) {
      if (slugifyName(n) === cleanSlug) return n;
    }

    return null;
  }

  function participantChip(name, knownSet) {
    const known = findKnownCharacter(name, knownSet);
    const initials = String(name || '?')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');

    const avatar = `<span class="participant-avatar" aria-hidden="true">${initials || '?'}</span>`;

    if (known) {
      const href = `character.html?name=${encodeURIComponent(slugifyName(known))}`;
      return `<a class="participant-chip" href="${href}">${avatar}<span>${name}</span></a>`;
    }

    return `<span class="participant-chip participant-chip-muted">${avatar}<span>${name}</span></span>`;
  }

  function eventLinkItem(item) {
    return `<a class="event-list-link" href="event.html?id=${encodeURIComponent(item.id)}">${item.title}</a>`;
  }

  function renderNotFound(eventId, events) {
    const host = document.getElementById('event-body');
    if (!host) return;

    host.innerHTML = `
      <section class="glass p-4 rounded-4 text-center">
        <h2 class="h4 text-warning mb-3">Event not found</h2>
        <p class="text-secondary mb-3">No event exists for id: <strong>${eventId || 'empty'}</strong></p>
        <div class="event-list-grid">${events.map(eventLinkItem).join('')}</div>
      </section>
    `;
  }

  function renderEvent(eventData, events, knownSet) {
    document.title = `Compass World | ${eventData.title}`;

    const banner = document.getElementById('event-banner-image');
    const title = document.getElementById('event-title');
    const subtitle = document.getElementById('event-subtitle');
    const date = document.getElementById('event-date');
    const location = document.getElementById('event-location');
    const result = document.getElementById('event-result');
    const prelude = document.getElementById('event-prelude');
    const clash = document.getElementById('event-clash');
    const aftermath = document.getElementById('event-aftermath');
    const participants = document.getElementById('event-participants');
    const items = document.getElementById('event-items');
    const allEvents = document.getElementById('all-events');

    if (banner) {
      banner.src = eventData.banner || 'contents/historyImg/2023.webp';
      banner.alt = eventData.title;
      banner.loading = 'eager';
    }

    if (title) title.textContent = eventData.title;
    if (subtitle) subtitle.textContent = `Mission Archive ID: ${eventData.id}`;
    if (date) date.textContent = eventData.date || 'Unknown';
    if (location) location.textContent = eventData.location || 'Unknown';
    if (result) result.textContent = eventData.result || 'Undetermined';

    if (prelude) prelude.textContent = eventData.prelude || '';
    if (clash) clash.textContent = eventData.clash || '';
    if (aftermath) aftermath.textContent = eventData.aftermath || '';

    if (participants) {
      participants.innerHTML = (eventData.participants || [])
        .map((p) => participantChip(p, knownSet))
        .join('');
    }

    if (items) {
      items.innerHTML = (eventData.items || [])
        .map((item) => `<span class="item-chip"><i class="bi bi-box-seam me-1"></i>${item}</span>`)
        .join('');
    }

    if (allEvents) {
      allEvents.innerHTML = events.map(eventLinkItem).join('');
    }
  }

  function animateEventPage() {
    if (typeof window.gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion?.matches) return;

    const { gsap } = window;

    gsap.fromTo(
      '.event-banner',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.event-banner img',
      { scale: 1.08 },
      { scale: 1, duration: 1.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.event-banner-content > *',
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 0.1 }
    );

    gsap.fromTo(
      '.quick-info-table tr, .narrative-block',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.08, delay: 0.2 }
    );

    gsap.fromTo(
      '.participant-chip, .participant-chip-muted, .item-chip, .event-list-link',
      { opacity: 0, y: 14, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.025, delay: 0.28 }
    );
  }

  function init() {
    const map = getEventMap();
    const events = Object.values(map);
    const eventId = getParam('id') || (events[0] && events[0].id);

    if (!events.length) {
      renderNotFound('none', []);
      return;
    }

    const eventData = map[eventId];
    if (!eventData) {
      renderNotFound(eventId, events);
      return;
    }

    const knownSet = getAllCharacterNames();
    renderEvent(eventData, events, knownSet);
    animateEventPage();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
