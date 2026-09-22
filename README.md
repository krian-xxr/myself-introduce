# LIN ZHOU — 个人作品集网站

视觉设计师 / AI 设计师的个人作品集。React 19 + Vite 8，纯 CSS 手写（无 UI 框架、无 Tailwind），暗色、克制、带科技感。

## 快速开始

```bash
cd portfolio
npm install
npm run dev      # http://localhost:5180
npm run build    # 产出 dist/
npm run preview  # 本地预览构建产物
```

## 页面结构（单页，5 个模块）

| 顺序 | 模块 | 文件 | 说明 |
| --- | --- | --- | --- |
| 1 | 全屏首页 Hero | `src/components/sections/Hero.jsx` | 视频背景 + canvas 光流、大标题、导航栏、联系按钮、跑马灯 |
| 2 | 精选项目 | `src/components/sections/Work.jsx` | 1 张整宽主推大卡 + 3 张等宽卡片 |
| 3 | 个人经历 | `src/components/sections/About.jsx` | 人物图、个人介绍、联系方式、项目数据、经历时间轴 |
| 4 | 个人优势 | `src/components/sections/Capabilities.jsx` | 4 张能力卡片（桌面端错落排布） |
| 5 | 底部联系方式 | `src/components/sections/Contact.jsx` | 整屏收尾页：大字标题 + 大邮箱按钮 + 联系方式 + 页脚 |

## 改内容只看一个文件

**所有文案、联系方式、项目、数据都在 `src/data/content.js`。** 组件不写死内容，替换文字不用碰 JSX。

## 改视觉设计看一个文件

**`src/styles/tokens.css`** 是唯一的换肤入口：颜色、字体、排版尺度、间距节奏、圆角、缓动、版心宽度。

- 版心宽度：`--shell-max: 1700px`（`.shell` 使用）
- 主色：`--accent: #8fe3ff`（点缀用，占比很小是刻意的）
- 分节上下留白：`--sec-pad`
- Hero 大标题字号：`--fs-display`（中文标题对字号很敏感，改完请目视确认没有意外换行）

## Hero 背景视频

现在 Hero 用的是 canvas 实时生成的光流 + 噪点背景，**没有视频文件也能跑**。要换成视频：

1. 把视频放到 `portfolio/public/video/hero-loop.mp4`
2. 刷新即可 —— `Hero.jsx` 里已经引用；视频加载失败会自动静默回退到 canvas，不会出现破图。

建议素材：16:9、1080p、H.264、5–10 秒无缝循环、深色低对比（左侧有压暗遮罩，文字压在上面）。

## 替换图片

图片放在 `portfolio/public/img/`，仓库里是 1920px 宽、50–100KB 的 `.webp`：

| 文件 | 用途 | 建议比例 |
| --- | --- | --- |
| `work-01.webp` | 主推项目大卡 | 16:9 |
| `work-02 ~ 04.webp` | 其余项目卡 | 16:10 |
| `portrait.webp` | 个人经历人物图 | 4:5 |
| `about-visual.webp` | 个人经历页背景装饰 | 4:3 |

## 开发小技巧

- 地址栏加 `?y=2400` 可直接定位到某一屏（仅 dev 生效），方便截图比对。
- `.shots/cdp-shots.mjs` 是一次性走查脚本，用 headless Edge 的 CDP 接口按屏截图：
  ```bash
  node .shots/cdp-shots.mjs "http://127.0.0.1:5180/" '[[0,"a"],[1200,"b"]]' 1728 1000
  ```

## 交互与可用性

- 滚动进场：`IntersectionObserver` + `[data-reveal]`，逐块淡入上移（`src/hooks/useSiteEffects.js`）。
- 数字滚动：个人数据进入视口后从 0 递增。
- 导航高亮：跟随当前分节自动切换；滚动后加毛玻璃背景。
- 全站尊重 `prefers-reduced-motion`：开启后所有动画自动关闭。
- 断点：1240 / 1180 / 1100 / 1080 / 1000 / 900 / 760 / 720 / 640 / 520（窄屏逐级降为单列）。
- 无控制台报错，`npx oxlint` 零告警。
