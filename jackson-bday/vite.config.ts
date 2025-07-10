import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/jackson-bday-2025/', // 👈 must match your GitHub repo name
  plugins: [react()],
})
