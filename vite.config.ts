import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  preview: {
    host: '0.0.0.0',
    port: 3002,
  },
  base: '/'
});