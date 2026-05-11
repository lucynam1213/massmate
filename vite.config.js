import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern iOS Safari 15+ and Chrome 91+ (Capacitor minimum)
    target: ['es2020', 'chrome91', 'safari15'],
    cssTarget: ['ios15'],

    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
