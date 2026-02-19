/**
 * Main Application Entry Point
 * Initializes all modules and handles app lifecycle
 */

import './styles/main.scss';

import Loader from './js/loader.js';
import ParticleFlow from './js/particles.js';
import GlitchEffect from './js/glitch.js';
import HolographicCards from './js/hologram.js';
import ScrollAnimations from './js/scroll.js';
import ContactForm from './js/form.js';

class App {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    
    console.log('🎮 NEXUS STUDIOS - Initializing...');
    
    // Initialize loader
    this.modules.loader = new Loader();
    this.modules.loader.init();
    
    // Wait for loader to complete
    await new Promise((resolve) => {
      window.addEventListener('loaderComplete', resolve, { once: true });
    });
    
    // Initialize other modules
    this.initModules();
    
    this.isInitialized = true;
    console.log('✅ Application initialized successfully');
  }

  initModules() {
    // Particle background
    this.modules.particles = new ParticleFlow();
    
    // Glitch text effects
    this.modules.glitch = new GlitchEffect();
    
    // Holographic cards
    this.modules.hologram = new HolographicCards();
    
    // Scroll animations
    this.modules.scroll = new ScrollAnimations();
    
    // Contact form
    this.modules.form = new ContactForm();
    
    // Initialize 3D hero element
    this.initHero3D();
  }

  initHero3D() {
    const container = document.getElementById('hero-3d');
    if (!container) return;
    
    // Create floating geometric shape using CSS
    const shape = document.createElement('div');
    shape.className = 'hero-3d-shape';
    shape.innerHTML = `
      <div class="shape-layer" style="--i: 0;"></div>
      <div class="shape-layer" style="--i: 1;"></div>
      <div class="shape-layer" style="--i: 2;"></div>
      <div class="shape-layer" style="--i: 3;"></div>
      <div class="shape-core"></div>
    `;
    container.appendChild(shape);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .hero-3d-shape {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        animation: float-rotate 10s ease-in-out infinite;
      }
      
      .shape-layer {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        border: 2px solid rgba(0, 240, 255, 0.3);
        transform: translate(-50%, -50%) rotate(calc(var(--i) * 45deg)) rotateX(60deg);
        border-radius: 50%;
        animation: pulse-ring 3s ease-in-out infinite;
        animation-delay: calc(var(--i) * 0.2s);
      }
      
      .shape-layer::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(123, 44, 191, 0.3);
        transform: translate(-50%, -50%) rotate(calc(var(--i) * -45deg));
      }
      
      .shape-core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #00F0FF 0%, #7B2CBF 100%);
        transform: translate(-50%, -50%) rotate(45deg);
        box-shadow: 
          0 0 30px rgba(0, 240, 255, 0.5),
          0 0 60px rgba(123, 44, 191, 0.3);
        animation: core-pulse 2s ease-in-out infinite;
      }
      
      @keyframes float-rotate {
        0%, 100% {
          transform: translateY(0) rotateY(0deg) rotateX(10deg);
        }
        50% {
          transform: translateY(-20px) rotateY(180deg) rotateX(-10deg);
        }
      }
      
      @keyframes pulse-ring {
        0%, 100% {
          opacity: 0.3;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 45deg)) rotateX(60deg) scale(1);
        }
        50% {
          opacity: 0.6;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 45deg)) rotateX(60deg) scale(1.1);
        }
      }
      
      @keyframes core-pulse {
        0%, 100% {
          box-shadow: 
            0 0 30px rgba(0, 240, 255, 0.5),
            0 0 60px rgba(123, 44, 191, 0.3);
        }
        50% {
          box-shadow: 
            0 0 50px rgba(0, 240, 255, 0.8),
            0 0 100px rgba(123, 44, 191, 0.5);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Handle visibility change
  handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Pause animations when tab is hidden
        this.pauseAnimations();
      } else {
        // Resume animations when tab is visible
        this.resumeAnimations();
      }
    });
  }

  pauseAnimations() {
    // Pause GSAP animations
    if (this.modules.scroll) {
      this.modules.scroll.destroy();
    }
  }

  resumeAnimations() {
    // Reinitialize scroll animations
    if (this.modules.scroll) {
      this.modules.scroll.init();
    }
  }

  // Handle resize
  handleResize() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Refresh scroll triggers
        if (this.modules.scroll) {
          this.modules.scroll.refresh();
        }
        
        // Recreate particles
        if (this.modules.particles) {
          this.modules.particles.createParticles();
        }
      }, 250);
    });
  }

  // Cleanup
  destroy() {
    Object.values(this.modules).forEach((module) => {
      if (module?.destroy) {
        module.destroy();
      }
    });
  }
}

// Initialize app when DOM is ready
const app = new App();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Handle page unload
window.addEventListener('beforeunload', () => app.destroy());

// Export for debugging
window.app = app;
