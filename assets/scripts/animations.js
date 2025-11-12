// GSAP-powered entrance and interaction animations across the landing page.
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.gsap === 'undefined') return;
    const { gsap } = window;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion?.matches) return;

    const baseEase = { duration: 0.9, ease: 'power2.out' };

    // Global entrance: logo, hero title, and navigation.
    gsap
      .timeline({ defaults: baseEase })
      .from('header .logo-glow', { opacity: 0, scale: 0.6, rotate: -15 })
      .from('header h1', { y: 30, opacity: 0 }, '-=0.4')
      .from('.glass-nav', { y: -40, opacity: 0 }, '-=0.3');

    // Hero section focus.
    gsap
      .timeline({ defaults: { duration: 0.9, ease: 'power3.out' }, delay: 0.15 })
      .from('.hero-section .hero-media', { opacity: 0, y: 40 })
      .from('.hero-section .hero-card', { opacity: 0, y: 30 }, '-=0.5');

    const gallery = document.getElementById('dynamicGallery');
    const animateGallery = () => {
      if (!gallery) return;
      const cards = gallery.querySelectorAll('.card');
      if (!cards.length) return;
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        stagger: 0.035,
        duration: 0.55,
        ease: 'power2.out'
      });
    };

    if (gallery) {
      if (gallery.querySelector('.card')) {
        animateGallery();
      } else if (window.MutationObserver) {
        const observer = new MutationObserver(() => {
          if (gallery.querySelector('.card')) {
            animateGallery();
            observer.disconnect();
          }
        });
        observer.observe(gallery, { childList: true });
      }
    }

    // Fade-up reveal for CTA panels.
    const revealTargets = document.querySelectorAll('[data-animate="reveal"]');
    if (revealTargets.length && window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(entry.target, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.25 });

      revealTargets.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 30 });
        observer.observe(el);
      });
    }

    const slogan = document.querySelector('.styled-text');
    if (slogan) {
      gsap.fromTo(slogan, { opacity: 0.5 }, {
        opacity: 1,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }

    // Subtle nav hover emphasis.
    const navLinks = gsap.utils.toArray('.glass-nav .nav-link');
    navLinks.forEach((link) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(link, { color: '#fdd835', duration: 0.2, ease: 'power1.out' })
        .to(link, { letterSpacing: '0.03em', duration: 0.25, ease: 'power1.out' }, '<');

      link.addEventListener('mouseenter', () => hoverTl.play());
      link.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  });
})();
