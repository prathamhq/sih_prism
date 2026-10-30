import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable error overlay to reduce rendering load
    },
  },
  clearScreen: false, // Prevent Vite from clearing the terminal
  logLevel: 'error', // Only show errors, not all updates
})
