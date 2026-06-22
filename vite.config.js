import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set to './' so the production build works when hosted from a
// subpath (e.g. GitHub Pages project pages).
export default defineConfig({
  plugins: [react()],
  base: './',
})
