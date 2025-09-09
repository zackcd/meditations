import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Handle client-side routing during development
    historyApiFallback: true,
  },
  build: {
    // Ensure clean URLs work in production
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
