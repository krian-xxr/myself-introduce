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
    // 监听所有网卡：同一局域网内的另一台电脑 / 手机可以直接打开 http://<本机IP>:5180/
    host: true,
    // 允许用计算机名访问（Vite 默认会以「Blocked request. This host is not allowed」403 掉）
    allowedHosts: true,
  },
})
