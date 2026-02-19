/**
 * Scroll Animations with GSAP
 * Handles scroll-triggered animations and parallax effects
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Hero section animations
    this.animateHero();
    
    // About section animations
    this.animateAbout();
    
    // Portfolio section animations
    this.animatePortfolio();
    
    // Technologies section animations
    this.animateTechnologies();
    
    // Careers section animations
    this.animateCareers();
    
    // Contacts section animations
    this.animateContacts();
    
    // Parallax effects
    this.initParallax();
    
    // Navbar scroll effect
    this.initNavbarScroll();
  }

  animateHero() {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate hero content after loader
    tl.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta .btn', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.2
    }, '-=0.4')
    .from('.hero-scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');
    
    // 3D element animation
    gsap.from('#hero-3d', {
      opacity: 0,
      scale: 0.8,
      rotation: 30,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  animateAbout() {
    // Section title
    gsap.from('#about .section-title', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // About text
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out'
    });
    
    // Stats cards with stagger
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });
    
    // Animate stat numbers
    this.animateStatNumbers();
  }

  animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const suffix = target >= 10 ? '+' : '';
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(stat, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              stat.textContent = Math.round(this.targets()[0].textContent) + suffix;
            }
          });
        }
      });
    });
  }

  animatePortfolio() {
    // Section title
    gsap.from('#portfolio .section-title', {
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Project cards with stagger
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  animateTechnologies() {
    // Section title
    gsap.from('#technologies .section-title', {
      scrollTrigger: {
        trigger: '#technologies',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Tech items with stagger
    gsap.from('.tech-item', {
      scrollTrigger: {
        trigger: '.tech-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });
  }

  animateCareers() {
    // Section title
    gsap.from('#careers .section-title', {
      scrollTrigger: {
        trigger: '#careers',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Vacancy cards with stagger
    gsap.from('.vacancy-card', {
      scrollTrigger: {
        trigger: '.vacancies-list',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  animateContacts() {
    // Section title
    gsap.from('#contacts .section-title', {
      scrollTrigger: {
        trigger: '#contacts',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Contact info
    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: '.contacts-info',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });
    
    // Social links
    gsap.from('.social-link', {
      scrollTrigger: {
        trigger: '.social-links',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });
    
    // Contact form
    gsap.from('.contact-form', {
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  initParallax() {
    // Parallax for hero background grid
    gsap.to('.hero-bg-grid', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 200,
      ease: 'none'
    });
    
    // Parallax for section backgrounds
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        backgroundPosition: '50% 100%',
        ease: 'none'
      });
    });
  }

  initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: navbar }
    });
  }

  // Refresh ScrollTrigger on window resize
  refresh() {
    ScrollTrigger.refresh();
  }

  // Kill all animations for cleanup
  destroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}

export default ScrollAnimations;
