/**
 * Contact Form Handler
 * Handles form validation, submission, and user feedback
 */

export class ContactForm {
  constructor(formId = 'contact-form') {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    
    this.inputs = this.form.querySelectorAll('.form-input');
    this.submitBtn = this.form.querySelector('.btn-submit');
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    // Add input animations
    this.inputs.forEach((input) => {
      input.addEventListener('focus', () => this.onFocus(input));
      input.addEventListener('blur', () => this.onBlur(input));
      input.addEventListener('input', () => this.onInput(input));
    });
    
    // Form submission
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    
    // Mobile menu toggle
    this.initMobileMenu();
    
    // Smooth scroll for anchor links
    this.initSmoothScroll();
  }

  onFocus(input) {
    input.parentElement.classList.add('focused');
  }

  onBlur(input) {
    input.parentElement.classList.remove('focused');
    
    // Validate on blur
    this.validateField(input);
  }

  onInput(input) {
    // Remove error state on input
    input.parentElement.classList.remove('error');
  }

  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Required validation
    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
      }
    }
    
    // Update UI
    if (!isValid) {
      input.parentElement.classList.add('error');
    } else {
      input.parentElement.classList.remove('error');
    }
    
    return isValid;
  }

  validateForm() {
    let isValid = true;
    
    this.inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async onSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    if (!this.validateForm()) {
      this.showNotification('Пожалуйста, заполните все поля корректно', 'error');
      return;
    }
    
    this.isSubmitting = true;
    this.setSubmittingState(true);
    
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Simulate API call
      await this.simulateSubmit(data);
      
      this.showNotification('Сообщение успешно отправлено!', 'success');
      this.form.reset();
      
      // Reset floating labels
      this.inputs.forEach((input) => {
        input.parentElement.classList.remove('focused');
      });
      
    } catch (error) {
      this.showNotification('Произошла ошибка при отправке. Попробуйте позже.', 'error');
    } finally {
      this.isSubmitting = false;
      this.setSubmittingState(false);
    }
  }

  simulateSubmit(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          console.log('Form submitted:', data);
          resolve({ success: true });
        } else {
          reject(new Error('Simulated error'));
        }
      }, 1500);
    });
  }

  setSubmittingState(isSubmitting) {
    if (isSubmitting) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <span>Отправка...</span>
        <span class="btn-icon">⟳</span>
      `;
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = `
        <span>Отправить</span>
        <span class="btn-icon">→</span>
      `;
    }
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.form-notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `form-notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? 'rgba(0, 240, 255, 0.9)' : 'rgba(123, 44, 191, 0.9)'};
      color: white;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      backdrop-filter: blur(10px);
      border: 1px solid ${type === 'success' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(123, 44, 191, 0.3)'};
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  initMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
      });
      
      // Close menu on link click
      menu.querySelectorAll('.navbar-link').forEach((link) => {
        link.addEventListener('click', () => {
          menu.classList.remove('active');
          toggle.classList.remove('active');
        });
      });
    }
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  destroy() {
    this.form?.removeEventListener('submit', () => {});
  }
}

export default ContactForm;
