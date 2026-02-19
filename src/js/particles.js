/**
 * Particle Flow Background
 * Interactive particles using Three.js that react to mouse movement
 */

import * as THREE from 'three';

export class ParticleFlow {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();
    this.particleCount = 0;
    this.particleSize = 0;
    
    this.init();
    this.createParticles();
    this.addEventListeners();
    this.animate();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 500;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Set particle count based on screen size
    this.setParticleCount();
  }

  setParticleCount() {
    const width = window.innerWidth;
    
    if (width < 640) {
      this.particleCount = 500;
      this.particleSize = 2;
    } else if (width < 1024) {
      this.particleCount = 1000;
      this.particleSize = 2.5;
    } else {
      this.particleCount = 2000;
      this.particleSize = 3;
    }
  }

  createParticles() {
    // Remove existing particles
    if (this.particles) {
      this.scene.remove(this.particles);
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }
    
    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    const velocities = new Float32Array(this.particleCount * 3);
    
    const color1 = new THREE.Color('#00F0FF'); // Neon blue
    const color2 = new THREE.Color('#7B2CBF'); // Purple
    
    for (let i = 0; i < this.particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      
      // Color - gradient between blue and purple
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
      
      // Size
      sizes[i] = Math.random() * this.particleSize + 1;
      
      // Velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.userData.velocities = velocities;
    
    // Material
    const material = new THREE.PointsMaterial({
      size: this.particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    // Points
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addEventListeners() {
    // Mouse move
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Resize
    window.addEventListener('resize', () => {
      this.setParticleCount();
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.createParticles();
    });
    
    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.targetMouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.particles) return;
    
    // Smooth mouse movement
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
    
    // Rotate particles slightly
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.001;
    
    // Update particle positions
    const positions = this.particles.geometry.attributes.position.array;
    const velocities = this.particles.geometry.userData.velocities;
    
    for (let i = 0; i < this.particleCount; i++) {
      // Apply velocity
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Mouse interaction - particles flee from cursor
      const dx = positions[i * 3] - (this.mouse.x * 500);
      const dy = positions[i * 3 + 1] - (this.mouse.y * 500);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        positions[i * 3] += dx * force * 0.02;
        positions[i * 3 + 1] += dy * force * 0.02;
      }
      
      // Wrap around screen
      const limit = 1000;
      if (positions[i * 3] > limit) positions[i * 3] = -limit;
      if (positions[i * 3] < -limit) positions[i * 3] = limit;
      if (positions[i * 3 + 1] > limit) positions[i * 3 + 1] = -limit;
      if (positions[i * 3 + 1] < -limit) positions[i * 3 + 1] = limit;
      if (positions[i * 3 + 2] > limit) positions[i * 3 + 2] = -limit;
      if (positions[i * 3 + 2] < -limit) positions[i * 3 + 2] = limit;
    }
    
    this.particles.geometry.attributes.position.needsUpdate = true;
    
    // Pulse opacity
    const time = Date.now() * 0.001;
    this.particles.material.opacity = 0.6 + Math.sin(time) * 0.2;
    
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.particles) {
      this.scene.remove(this.particles);
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

export default ParticleFlow;
