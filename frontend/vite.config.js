import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/clinicas': {
        target: 'https://leform.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/cursos': {
        target: 'https://leform.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
