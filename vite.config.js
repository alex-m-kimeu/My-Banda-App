import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
    optimizeDeps: {
      include: ['recharts']
    },
    server: {
      port: 3000,
    },
  }

  if (command !== 'serve') {
    config.base = '/My-Banda-App/'
  }

  return config
})