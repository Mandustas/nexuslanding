import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './', // Относительные пути для GitHub Pages
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap']
        }
      }
    },
    target: 'esnext',
    cssTarget: 'chrome80'
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 4173,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/variables.scss" as *;
          @use "./src/styles/mixins.scss" as *;
        `
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap']
  }
});
