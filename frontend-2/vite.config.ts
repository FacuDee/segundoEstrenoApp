import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Solo hacer proxy de las rutas API del backend, no de las rutas del frontend
      '/api/auth': {
        target: 'http://localhost:3000/auth',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/auth/, '')
      },
      '/api/usuario': {
        target: 'http://localhost:3000/usuario',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/usuario/, '')
      },
      '/api/prenda': {
        target: 'http://localhost:3000/prenda',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/prenda/, '')
      },
      '/api/categoria': {
        target: 'http://localhost:3000/categoria',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/categoria/, '')
      },
      '/api/carrito': {
        target: 'http://localhost:3000/carrito',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/carrito/, '')
      },
      '/api/transaccion': {
        target: 'http://localhost:3000/transaccion',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/transaccion/, '')
      }
    }
  }
})
