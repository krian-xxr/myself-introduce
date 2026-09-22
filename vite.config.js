import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // './' 让构建产物用相对路径引用资源，dist 直接拖到任意静态托管（Netlify Drop 等）都能跑
  base: './',
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: false,
    open: false,
  },
})
