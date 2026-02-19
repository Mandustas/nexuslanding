/**
 * Glitch Text Effect
 * Creates glitch/distortion effect on hover for text elements
 */

export class GlitchEffect {
  constructor() {
    this.elements = document.querySelectorAll('.glitch-text');
    this.activeElement = null;
    this.interval = null;
    
    this.init();
  }

  init() {
    this.elements.forEach((element) => {
      const text = element.getAttribute('data-text') || element.textContent;
      element.setAttribute('data-text', text);
      
      element.addEventListener('mouseenter', () => this.onMouseEnter(element));
      element.addEventListener('mouseleave', () => this.onMouseLeave(element));
    });
  }

  onMouseEnter(element) {
    this.activeElement = element;
    this.startGlitch(element);
  }

  onMouseLeave(element) {
    this.activeElement = null;
    this.stopGlitch();
  }

  startGlitch(element) {
    const originalText = element.getAttribute('data-text');
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789';
    
    let iterations = 0;
    const maxIterations = 10;
    
    this.interval = setInterval(() => {
      if (!this.activeElement) {
        this.stopGlitch();
        element.textContent = originalText;
        return;
      }
      
      // Handle multi-line text
      const lines = originalText.split('\n');
      const glitchedText = lines.map((line, lineIndex) => {
        if (lineIndex > 0) return '\n' + this.glitchLine(line, chars, iterations, maxIterations);
        return this.glitchLine(line, chars, iterations, maxIterations);
      }).join('');
      
      element.textContent = glitchedText;
      iterations++;
      
      if (iterations >= maxIterations) {
        iterations = 0;
      }
    }, 50);
  }

  glitchLine(line, chars, iterations, maxIterations) {
    const words = line.split(' ');
    
    return words.map((word) => {
      // Don't glitch short words
      if (word.length < 3) return word;
      
      const glitchCount = Math.floor((iterations / maxIterations) * word.length * 0.5);
      const wordArray = word.split('');
      
      for (let i = 0; i < glitchCount; i++) {
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        wordArray[randomIndex] = chars[Math.floor(Math.random() * chars.length)];
      }
      
      return wordArray.join('');
    }).join(' ');
  }

  stopGlitch() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Trigger glitch programmatically
  trigger(element, duration = 1000) {
    const originalText = element.textContent;
    element.setAttribute('data-text', originalText);
    
    this.activeElement = element;
    this.startGlitch(element);
    
    setTimeout(() => {
      this.activeElement = null;
      this.stopGlitch();
      element.textContent = originalText;
    }, duration);
  }

  destroy() {
    this.stopGlitch();
    this.elements.forEach((element) => {
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
    });
  }
}

export default GlitchEffect;
