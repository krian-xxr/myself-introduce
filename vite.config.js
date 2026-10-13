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
    /*
     * 默认只绑本机（localhost），别人连不上。
     * 需要让同一局域网的手机 / 另一台电脑临时预览时，把下面两行取消注释再重启：
     *   host: true,
     *   allowedHosts: true,
     * ⚠️ 打开后同一 Wi-Fi 下任何人都能访问这个开发服务器，没有密码；用完记得关掉。
     */
    // host: true,
    // allowedHosts: true,
  },
})
