import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This creates a shortcut so you don't have to use ../../
      '@shared': path.resolve(__dirname, '../data'),
    },
  },
  server: {
    fs: {
      // This is the critical security bypass
      allow: ['..'], 
    },
  },
})
