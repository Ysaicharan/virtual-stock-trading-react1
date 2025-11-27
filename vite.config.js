import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect if we are building for GitHub Pages or Docker
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/virtual-stock-trading-react1/' : '/',
})
