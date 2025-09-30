import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/usuario': 'http://localhost:3000',
      // Solo proxy para la API REST, no para /prendas (SPA)
      '^/prenda($|/)': 'http://localhost:3000'
    }
  }
})
