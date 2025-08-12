import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: After you create your GitHub repo, replace REPO_NAME below
// with your repository name (used for GitHub Pages base path).
export default defineConfig({
  plugins: [react()],
  base: '/REPO_NAME/'
})
