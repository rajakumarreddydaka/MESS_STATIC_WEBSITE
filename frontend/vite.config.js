import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/MESS_STATIC_WEBSITE/',
  plugins: [react()],
})