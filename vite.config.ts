import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // checker({ typescript: true }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  preview: {
    host: '0.0.0.0',
    port: 3002,
  },
});