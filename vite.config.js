import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Fängt alle Requests ab, die mit "/api" beginnen
      '/api': {
        target: 'https://api.energy-charts.info', // Leitet sie hierhin weiter
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Entfernt "/api" aus der URL
      },
    },
  },
})
