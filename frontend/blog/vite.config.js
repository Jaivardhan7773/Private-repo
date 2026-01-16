import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    strictPort: true, 
    allowedHosts: ['.ngrok-free.app'], 
    port: 3000, 
    proxy: {
      '/sitemap.xml': 'https://improved-aizenx.onrender.com',
      '/api': 'https://improved-aizenx.onrender.com',  // example for your API
      // Add other routes if needed
    }
  }
})
