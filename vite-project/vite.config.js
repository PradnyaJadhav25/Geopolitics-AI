import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/public-finance': {
        target: 'http://localhost:8000', changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/public-finance/, '/public-finance'),
      },
      '/api/news': {
        target: 'http://localhost:8000', changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/news/, '/news'),
      },
      '/api/market': {
        target: 'http://localhost:8000', changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/market/, '/market'),
      },
      '/api/chat': {
        target: 'http://localhost:8000', changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/chat/, '/chat'),
      },
      '/api/recommendations': {
        target: 'http://localhost:8000', changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/recommendations/, '/recommendations'),
      },
      '/api/simulations': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/simulations/, '/simulate'),
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
