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

## 页面结构（单页，5 个大标题 + 首屏 + 收尾）

导航里那 5 项就是页面的 5 个大标题（首页 / 联系我 分别由左侧品牌和右侧 ▷ LET'S TALK 承担，不占菜单位）：

| 顺序 | 模块 | 文件 | 说明 |
| --- | --- | --- | --- |
| 0 | 全屏首页 Hero | `src/components/sections/Hero.jsx` | 光流背景、扇开的作品卡片簇、大标题、联系按钮、跑马灯 |
| 1 | 个人经历 | `src/components/sections/About.jsx` | 人物图、个人介绍、联系方式、项目数据、经历时间轴 |
| 1b | └ 个人优势 | `src/components/sections/Capabilities.jsx` | 作为「个人经历」的子块嵌在里面（4 张能力卡片），不再单独占一个大标题 |
| 2 | AI 视觉 | `src/components/sections/Category.jsx` | 由 `content.js` 的 `categories` 渲染，一个类一块 |
| 3 | 三维作品 | 同上 | 板块 = 大标题 + 导语 + 整宽主推卡 |
| 4 | MG 动画 | 同上 | |
| 5 | 地产广告 | 同上 | 额外出「参与项目 / Credits」清单（`data.credits`） |
| 6 | 底部联系方式 | `src/components/sections/Contact.jsx` | 整屏收尾页：大字标题 + 大邮箱按钮 + 联系方式 + 页脚 |

## 加 / 改作品板块

`src/data/content.js` 里的 `categories` 数组驱动 2~5 号板块，**加一类就加一个对象**：

```js
{
  id: 'aivisual',            // 同时是 section id 和导航锚点
  index: '01', cn: 'AI 视觉', en: 'AI Visual',
  sub: '大标题下面那行小字',
  lead: '右侧导语',
  featured: { title, category, year, image, summary, stats, tags },  // 整宽主推卡
  credits: [ { year, title, role } ],   // 可选：参与项目清单
}
```

导航项在同一个文件的 `nav` 数组里，两边的 `id` 要对得上，否则导航高亮和锚点会失效。


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
- 走查脚本放在仓库同级目录 `question/.shots/`（不在这个包内），用 headless Edge 的 CDP 接口驱动真实浏览器：

  | 脚本 | 用途 |
  | --- | --- |
  | `cdp-shots.mjs` | 按屏截图：`node .shots/cdp-shots.mjs "http://localhost:5180/" '[[0,"hero"],[1200,"work"]]' 1728 1000` |
  | `cdp-eval.mjs` | 执行一段表达式文件并打印结果：`node .shots/cdp-eval.mjs <url> .shots/probe-hit.js 1728 1000` |
  | `cdp-interact.mjs` | 触发真实指针 / 滚轮 / 键盘事件，验证卡片簇拖拽、翻页、读数 |
  | `probe-nav.mjs` | 窄屏抽屉能否开合 + 全站横向溢出体检（默认 390×844） |
  | `probe-click.mjs` | 点卡片是否真的跳转（防「透明层吃掉 click」这类回归） |
  | `probe-hit.js` | `elementFromPoint` 命中体检：确认卡片本身可被 hover / 点击，而不是被覆盖层拦住 |

  截图前注意：地址栏用 `localhost` 而不是 `127.0.0.1`（dev server 只监听 IPv6 的 `::1`）；
  另外页面开了平滑滚动，`scrollTo(0,0)` 后要等一会儿再截，否则会拍到滚动中途的画面。


## 交互与可用性

- 滚动进场：`IntersectionObserver` + `[data-reveal]`，逐块淡入上移（`src/hooks/useSiteEffects.js`）。
- 数字滚动：个人数据进入视口后从 0 递增。
- 导航高亮：跟随当前分节自动切换；滚动后加毛玻璃背景。
- 全站尊重 `prefers-reduced-motion`：开启后所有动画自动关闭。
- 断点：1240 / 1180 / 1100 / 1080 / 1000 / 900 / 760 / 720 / 640 / 520（窄屏逐级降为单列）。
- 无控制台报错，`npx oxlint` 零告警。
