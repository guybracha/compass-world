// GSAP-powered entrance and interaction animations across all pages.
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.gsap === 'undefined') return;
    const { gsap } = window;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion?.matches) return;

    const baseEase = { duration: 0.9, ease: 'power2.out' };

    // ========== GLOBAL ANIMATIONS (ALL PAGES) ==========
    
    // Header entrance: logo, title, and navigation
    const header = document.querySelector('header');
    if (header) {
      const headerTl = gsap.timeline({ defaults: baseEase });
      
      headerTl.fromTo('header .logo-glow, header .hero-logo', 
        { opacity: 0, scale: 0.6, rotate: -15 },
        { opacity: 1, scale: 1, rotate: 0, clearProps: 'all' }
      );
      
      headerTl.fromTo('header h1, header h2', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, clearProps: 'all' },
        '-=0.4'
      );
      
      headerTl.fromTo('.glass-nav', 
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, clearProps: 'all' },
        '-=0.3'
      );
    }

    // Navbar logo rotation on hover
    const navbarLogo = document.querySelector('.navbar-brand img');
    if (navbarLogo) {
      navbarLogo.parentElement.addEventListener('mouseenter', () => {
        gsap.to(navbarLogo, { rotation: 360, duration: 0.6, ease: 'back.out(1.7)' });
      });
    }

    // Subtle nav hover emphasis
    const navLinks = gsap.utils.toArray('.glass-nav .nav-link');
    navLinks.forEach((link) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(link, { color: '#fdd835', scale: 1.05, duration: 0.2, ease: 'power1.out' })
        .to(link, { letterSpacing: '0.03em', duration: 0.25, ease: 'power1.out' }, '<');

      link.addEventListener('mouseenter', () => hoverTl.play());
      link.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // Fade-up reveal for elements with data-animate attribute
    const revealTargets = document.querySelectorAll('[data-animate="reveal"]');
    if (revealTargets.length && window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              ease: 'power2.out',
              clearProps: 'transform'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealTargets.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 });
        observer.observe(el);
      });
    }

    // Animate all cards/tiles on scroll
    const animateCards = (cards, stagger = 0.1) => {
      if (!cards.length) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target, 
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
                clearProps: 'transform'
              }
            );
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      cards.forEach((card) => {
        observer.observe(card);
      });
    };

    // ========== PAGE-SPECIFIC ANIMATIONS ==========

    // INDEX PAGE - Hero section and team gallery
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' }, delay: 0.2 });
      
      tl.fromTo('.hero-section .hero-media', 
        { opacity: 0, x: -50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, clearProps: 'transform' }
      );
      
      tl.fromTo('.hero-section .hero-card', 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, clearProps: 'transform' },
        '-=0.6'
      );
    }

    const dynamicGallery = document.getElementById('dynamicGallery');
    const animateGallery = () => {
      if (!dynamicGallery) return;
      const cards = dynamicGallery.querySelectorAll('.card');
      if (!cards.length) return;
      
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.6,
          ease: 'back.out(1.2)',
          clearProps: 'transform'
        }
      );
    };

    if (dynamicGallery) {
      if (dynamicGallery.querySelector('.card')) {
        setTimeout(animateGallery, 100);
      } else if (window.MutationObserver) {
        const observer = new MutationObserver(() => {
          if (dynamicGallery.querySelector('.card')) {
            setTimeout(animateGallery, 100);
            observer.disconnect();
          }
        });
        observer.observe(dynamicGallery, { childList: true });
      }
    }

    // Slogan pulsing animation
    const slogan = document.querySelector('.styled-text');
    if (slogan) {
      gsap.fromTo(slogan, 
        { opacity: 0.7, scale: 0.98 }, 
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        }
      );
    }

    // FILES PAGE - Character cards grid
    const characterCards = document.querySelectorAll('.character-card, .villain-card, .card');
    if (characterCards.length > 0 && !dynamicGallery) {
      animateCards(characterCards, 0.08);
    }

    // GALLERY PAGE - Image grid
    const galleryItems = document.querySelectorAll('.gallery-item, .tile');
    if (galleryItems.length > 0) {
      animateCards(galleryItems, 0.05);
    }

    // Filter buttons animation
    const filterButtons = document.querySelectorAll('.filter-chip, .filter-btn');
    if (filterButtons.length > 0) {
      gsap.from(filterButtons, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.5,
        delay: 0.3,
        ease: 'back.out(1.5)'
      });
    }

    // HISTORY PAGE - Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .history-card');
    if (timelineItems.length > 0) {
      timelineItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(entry.target,
                { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  clearProps: 'transform'
                }
              );
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(item);
      });
    }

    // WORLD PAGE - Location cards
    const locationCards = document.querySelectorAll('.location-card, .world-card');
    if (locationCards.length > 0) {
      animateCards(locationCards, 0.1);
    }

    // ABOUT PAGE - Content sections
    const aboutSections = document.querySelectorAll('.about-section, .glass');
    if (aboutSections.length > 0 && window.location.pathname.includes('about')) {
      aboutSections.forEach((section) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(entry.target,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  clearProps: 'transform'
                }
              );
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(section);
      });
    }

    // IDEAS PAGE - Idea cards
    const ideaCards = document.querySelectorAll('.idea-card, .surface-card');
    if (ideaCards.length > 0 && window.location.pathname.includes('ideas')) {
      animateCards(ideaCards, 0.12);
    }

    // PRIME CHILDREN PAGE - Character grid
    const primeCards = document.querySelectorAll('.prime-card, .hero-card');
    if (primeCards.length > 0 && window.location.pathname.includes('prime')) {
      animateCards(primeCards, 0.06);
    }

    // ========== INTERACTIVE HOVER EFFECTS ==========

    // Card hover effects
    const allCards = document.querySelectorAll('.card, .tile, .glass');
    allCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          y: -8, 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(255, 183, 3, 0.2)',
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          y: 0, 
          scale: 1,
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'back.out(2)' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
      });
    });

    // Section headings animation
    const sectionHeadings = document.querySelectorAll('.section-heading, h2, h3');
    if (sectionHeadings.length > 0) {
      sectionHeadings.forEach((heading) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(entry.target,
                { opacity: 0, x: -30 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  clearProps: 'transform'
                }
              );
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        observer.observe(heading);
      });
    }

    // Footer entrance
    const footer = document.querySelector('footer');
    if (footer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(footer.children,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                clearProps: 'transform'
              }
            );
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(footer);
    }
  });
})();
