import { fileURLToPath } from 'node:url';
import { URL } from 'node:url'; // ✅ Needed for 'new URL()'
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },
  server: {
    port: 8080
  },
  // base: '/checkpoint/' // Uncomment for GitHub Pages deployment
});
