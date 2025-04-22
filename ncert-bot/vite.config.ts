import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  optimizeDeps: {
    // exclude: ['@react-pdf/renderer', 'pdfjs-dist'],
  },
  // assetsInclude: ['**/*.pdf'],
  build: {
    commonjsOptions: {
      // include: [/pdfjs-dist/, /node_modules/],
    }
  }
})
