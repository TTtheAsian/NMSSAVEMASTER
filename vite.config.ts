import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron/simple'

export default defineConfig(() => {
  const isElectron = process.env.ELECTRON === 'true'

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isElectron ? [electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: 'electron/preload.ts',
        },
      })] : []),
    ],
    base: isElectron ? './' : '/',
    build: {
      // Ensure assets use relative paths for Electron file:// protocol
      assetsDir: 'assets',
    },
  }
})
