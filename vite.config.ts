import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
    // Enable history API fallback for client-side routing
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor libraries for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-i18next') || id.includes('i18next')) {
              return 'i18n-vendor';
            }
            // All other node_modules go to vendor
            return 'vendor';
          }
        }
      }
    },
    // Reduce chunk size warning from 500KB
    chunkSizeWarningLimit: 500,
    
    // Generate source maps for better debugging
    sourcemap: true
  }
})
