import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: fileURLToPath(new URL('./build.html', import.meta.url)),
      output: {
        entryFileNames: 'assets/tycoon.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/tycoon.[ext]',
      },
    },
  },
})
