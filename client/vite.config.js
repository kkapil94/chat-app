import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://chat-app-rh5f.onrender.com",
        changeOrigin: true,
        secure: false,
        agent: new http.Agent()
      }
    }
  }
})
