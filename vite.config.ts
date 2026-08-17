import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nowadays_prototype/',
  plugins: [react()],
})
