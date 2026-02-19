/**
 * Holographic Cards 3D Effect
 * Creates 3D tilt and holographic shimmer effect on cards
 */

export class HolographicCards {
  constructor(selector = '.holographic-card') {
    this.cards = document.querySelectorAll(selector);
    
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      this.setupCard(card);
    });
    
    // Add perspective to parent containers
    document.querySelectorAll('.portfolio-grid, .about-stats, .tech-grid, .vacancies-list').forEach((container) => {
      container.style.perspective = '1000px';
    });
  }

  setupCard(card) {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    // Create holographic overlay
    const overlay = document.createElement('div');
    overlay.className = 'holographic-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(0, 240, 255, 0.1) 0%,
        rgba(123, 44, 191, 0.1) 25%,
        rgba(0, 240, 255, 0.1) 50%,
        rgba(123, 44, 191, 0.1) 75%,
        rgba(0, 240, 255, 0.1) 100%
      );
      background-size: 400% 400%;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    `;
    card.appendChild(overlay);

    // Mouse move effect
    card.addEventListener('mousemove', (e) => this.onMouseMove(e, card, overlay));
    
    // Mouse enter effect
    card.addEventListener('mouseenter', () => this.onMouseEnter(card, overlay));
    
    // Mouse leave effect
    card.addEventListener('mouseleave', () => this.onMouseLeave(card, overlay));
    
    // Scroll effect
    window.addEventListener('scroll', () => this.onScroll(card, overlay));
  }

  onMouseMove(e, card, overlay) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    // Apply 3D transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Update holographic gradient position
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    overlay.style.backgroundPosition = `${percentX}% ${percentY}%`;
  }

  onMouseEnter(card, overlay) {
    card.style.transition = 'transform 0.1s ease';
    overlay.style.opacity = '1';
    
    // Add glow effect
    card.style.boxShadow = `
      0 0 30px rgba(0, 240, 255, 0.3),
      0 0 60px rgba(123, 44, 191, 0.2),
      0 20px 40px rgba(0, 0, 0, 0.4)
    `;
  }

  onMouseLeave(card, overlay) {
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    overlay.style.opacity = '0';
    card.style.boxShadow = '';
  }

  onScroll(card, overlay) {
    // Subtle parallax effect on scroll
    const rect = card.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const cardCenter = rect.top + rect.height / 2;
    const distance = (cardCenter - viewportCenter) / viewportCenter;
    
    if (Math.abs(distance) < 1) {
      const subtleRotate = distance * 2;
      if (!card.matches(':hover')) {
        card.style.transform = `perspective(1000px) rotateX(${subtleRotate}deg)`;
      }
    }
  }

  // Add shine effect programmatically
  addShine(card) {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      pointer-events: none;
      z-index: 2;
    `;
    card.appendChild(shine);
    
    // Animate shine
    setTimeout(() => {
      shine.style.transition = 'left 0.6s ease';
      shine.style.left = '100%';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
      shine.remove();
    }, 600);
  }

  destroy() {
    this.cards.forEach((card) => {
      const overlay = card.querySelector('.holographic-overlay');
      if (overlay) overlay.remove();
      
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  }
}

export default HolographicCards;
