/**
 * Loader Animation - Terminal Style
 * Shows loading progress with terminal-like interface
 */

export class Loader {
  constructor() {
    this.loader = document.getElementById('loader');
    this.fill = this.loader?.querySelector('.loader-fill');
    this.percent = this.loader?.querySelector('.loader-percent');
    this.command = this.loader?.querySelector('.loader-command');
    this.commands = [
      'INITIALIZING',
      'LOADING ASSETS',
      'COMPILING SHADERS',
      'PREPARING WORLD',
      'READY'
    ];
    this.currentCommand = 0;
    this.progress = 0;
  }

  init() {
    if (!this.loader) return;
    
    this.animate();
  }

  animate() {
    const targetProgress = Math.min(this.progress + Math.random() * 15, 100);
    const duration = 300 + Math.random() * 200;
    
    this.animateProgress(targetProgress, duration);
    
    // Update command text
    const commandIndex = Math.floor((this.progress / 100) * (this.commands.length - 1));
    if (this.command && commandIndex !== this.currentCommand) {
      this.currentCommand = commandIndex;
      this.command.textContent = this.commands[commandIndex];
    }
    
    if (this.progress >= 100) {
      setTimeout(() => this.hide(), 500);
    } else {
      setTimeout(() => this.animate(), duration);
    }
  }

  animateProgress(target, duration) {
    const start = performance.now();
    const startProgress = this.progress;
    
    const step = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      
      this.progress = startProgress + (target - startProgress) * eased;
      
      if (this.fill) {
        this.fill.style.width = `${this.progress}%`;
      }
      
      if (this.percent) {
        this.percent.textContent = `${Math.round(this.progress)}%`;
      }
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }

  hide() {
    if (!this.loader) return;
    
    this.loader.classList.add('loaded');
    
    // Remove from DOM after animation
    setTimeout(() => {
      this.loader.style.display = 'none';
      
      // Show main content
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.classList.add('visible');
      }
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('loaderComplete'));
    }, 700);
  }

  setProgress(value) {
    this.progress = Math.max(0, Math.min(100, value));
    
    if (this.fill) {
      this.fill.style.width = `${this.progress}%`;
    }
    
    if (this.percent) {
      this.percent.textContent = `${Math.round(this.progress)}%`;
    }
  }
}

export default Loader;
