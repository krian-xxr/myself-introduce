/**
 * 全站文案与数据。改这个文件即可替换内容，不用碰组件。
 */

/**
 * 静态资源路径统一用 BASE_URL 拼，构建后才会带上正确的相对前缀，
 * 这样 dist 目录拖到任意静态托管（含子目录部署）资源都不会 404。
 */
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export const HERO_VIDEO_SRC = asset('video/hero-loop.mp4')
export const HERO_VIDEO_POSTER = asset('img/work-03.webp')

export const VIDEO_PLACEHOLDER_MAIL_SUBJECT = 'Hero 背景视频素材'

export const site = {
  name: 'LIN ZHOU',
  nameCn: '周临',
  initial: 'L',
  role: '视觉设计师 / AI 设计师',
  roleEn: 'Visual & AI Designer',
  location: '中国 · 上海',
  timezone: 'UTC+8',
  available: '2026 Q1 可承接新项目',
  email: 'hello@linzhou.design',
  phone: '+86 138 0000 0000',
  wechat: 'linzhou_design',
  socials: [
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: '站酷 ZCOOL', href: 'https://www.zcool.com.cn/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: '小红书', href: 'https://www.xiaohongshu.com/' },
  ],
}

export const nav = [
  { id: 'hero', label: '首页', en: 'Home', href: '#hero' },
  { id: 'work', label: '精选项目', en: 'Work', href: '#work' },
  { id: 'about', label: '个人经历', en: 'About', href: '#about' },
  { id: 'capability', label: '个人优势', en: 'Capability', href: '#capability' },
  { id: 'contact', label: '联系我', en: 'Contact', href: '#contact' },
]

export const hero = {
  status: 'AVAILABLE FOR PROJECTS',
  titleLines: ['以视觉思维', '构建 AI 时代的品牌表达'],
  titleLinesEn: ['DESIGNING BRANDS', 'FOR THE AI ERA'],
  lead: '八年品牌与界面设计经验，近三年深耕 AIGC 视觉生产链路 —— 把审美判断、设计系统与生成式工具接进同一条工作流，让创意从概念到落地保持同一种精度。',
  primaryCta: { label: '约一个项目', href: '#contact' },
  secondaryCta: { label: '查看作品', href: '#work' },
  facts: [
    { k: 'Years', v: '8+' },
    { k: 'Projects', v: '120+' },
    { k: 'Based in', v: 'Shanghai' },
  ],
  marquee: [
    'BRAND IDENTITY',
    'UI / UX DESIGN',
    'AI VISUAL DIRECTION',
    'MOTION DESIGN',
    'DESIGN SYSTEM',
    'COMMERCIAL KEY VISUAL',
  ],
}

export const featured = {
  index: '01',
  title: 'NEON GLYPH — 新消费品牌全案视觉系统',
  category: '品牌全案 / 视觉系统',
  year: '2025',
  image: asset('img/work-01.webp'),
  summary:
    '从品牌策略、标志系统到电商与线下物料的完整落地，用一套可延展的视觉语言支撑 12 个 SKU 与 3 条产品线。',
  stats: [
    { k: '交付周期', v: '10 周' },
    { k: '物料落地', v: '240+' },
    { k: '转化提升', v: '+38%' },
  ],
  tags: ['Branding', 'Art Direction', 'Packaging'],
}

export const projects = [
  {
    id: 'p02',
    index: '02',
    title: 'HALO OS — AI 助手产品界面与设计系统',
    category: '产品界面 / 设计系统',
    year: '2025',
    image: asset('img/work-02.webp'),
    summary:
      '为生成式 AI 助手定义暗色设计语言，构建 160+ 组件的设计系统，覆盖 Web 与桌面端。',
    tags: ['UI/UX', 'Design System', 'AI Product'],
  },
  {
    id: 'p03',
    index: '03',
    title: 'PARTICLE FIELD — AIGC 影像艺术实验',
    category: 'AI 影像 / 动态设计',
    year: '2024',
    image: asset('img/work-03.webp'),
    summary:
      '以粒子与体积光为媒介的系列影像实验，打通 ComfyUI 工作流与后期合成，产出 24 条品牌短片。',
    tags: ['AIGC', 'Motion', '3D Visual'],
  },
  {
    id: 'p04',
    index: '04',
    title: 'FOLDED LIGHT — 高端家居品牌主视觉',
    category: '主视觉 / 商业摄影指导',
    year: '2024',
    image: asset('img/work-04.webp'),
    summary: '以金属织物质感为核心概念，完成年度主视觉、展厅空间与线上商城的统一表达。',
    tags: ['Key Visual', 'Art Direction', 'Retail'],
  },
]

export const capabilities = [
  {
    id: 'c1',
    icon: 'Palette',
    index: '01',
    title: '品牌视觉系统',
    en: 'Brand System',
    desc: '从策略定位到标志、字体、色彩与图形语言，输出可延展、可管理的完整品牌资产。',
    tags: ['Logo System', 'Guideline', 'Packaging'],
  },
  {
    id: 'c2',
    icon: 'LayoutGrid',
    index: '02',
    title: '界面与体验设计',
    en: 'UI / UX',
    desc: '复杂产品的信息架构与界面落地，构建组件化设计系统，保证多端一致性与交付效率。',
    tags: ['Design System', 'Prototype', 'Handoff'],
  },
  {
    id: 'c3',
    icon: 'Sparkles',
    index: '03',
    title: 'AI 视觉生产',
    en: 'AI Visual Direction',
    desc: '把生成式工具接入真实生产链路：模型选型、LoRA 训练、提示词工程与批量可控出图。',
    tags: ['ComfyUI', 'Prompt System', 'LoRA'],
  },
  {
    id: 'c4',
    icon: 'Clapperboard',
    index: '04',
    title: '动态与影像',
    en: 'Motion & Film',
    desc: '从分镜到成片的动态表达，用节奏与光影让静态视觉在时间维度上继续讲话。',
    tags: ['Storyboard', 'Motion', 'Edit'],
  },
]

export const about = {
  portrait: asset('img/portrait.webp'),
  visual: asset('img/about-visual.webp'),
  name: '周临 / LIN ZHOU',
  title: '视觉设计师 · AI 设计师',
  paragraphs: [
    '我是一名视觉设计师，过去八年一直在做同一件事：把模糊的商业意图翻译成清晰、克制、能被记住的视觉。服务过消费品牌、智能硬件与互联网产品，从 0 到 1 搭建过 6 套品牌系统。',
    '近三年我把工作重心转向 AI 与设计的交叉地带 —— 用生成式模型重构视觉生产流程，把单张出图的运气变成可复用的方法。我关心的不是工具本身，而是它能让一个创意团队多快、多准地抵达目标画面。',
    '目前以独立设计师身份与品牌、设计团队长期合作，也乐意参与需要深度共创的早期项目。',
  ],
  timeline: [
    {
      period: '2023 — NOW',
      role: '独立视觉设计师 / AI 视觉顾问',
      org: 'Freelance · Shanghai',
      desc: '为消费品牌与 AI 产品提供品牌视觉与 AIGC 生产链路咨询，主导 30+ 商业项目。',
    },
    {
      period: '2020 — 2023',
      role: '资深视觉设计师',
      org: '星野科技 · 品牌设计中心',
      desc: '负责品牌主视觉与产品界面设计，搭建公司级设计系统，带 5 人设计小组。',
    },
    {
      period: '2017 — 2020',
      role: '视觉设计师',
      org: 'SPARK 创意热店',
      desc: '参与快消与汽车行业整合营销视觉，完成 60+ 项目的主视觉与延展物料。',
    },
  ],
  stats: [
    { value: 8, suffix: '+', label: '年设计经验', en: 'Years' },
    { value: 120, suffix: '+', label: '交付项目', en: 'Projects' },
    { value: 42, suffix: '', label: '合作品牌', en: 'Clients' },
    { value: 16, suffix: '', label: '行业奖项', en: 'Awards' },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  kicker: '有项目想聊？',
  bigLines: ["LET'S", 'WORK'],
  bigLinesAccent: 'TOGETHER',
  desc: '无论是品牌全案、AI 视觉体系搭建，还是只是想让一个想法先跑起来 —— 都欢迎来信。通常在 24 小时内回复。',
  methods: [
    { icon: 'Mail', label: 'Email', value: 'hello@linzhou.design', href: 'mailto:hello@linzhou.design' },
    { icon: 'Phone', label: 'Phone', value: '+86 138 0000 0000', href: 'tel:+8613800000000' },
    { icon: 'MessageCircle', label: 'WeChat', value: 'linzhou_design', href: null },
    { icon: 'MapPin', label: 'Location', value: '中国 · 上海', href: null },
  ],
  footnote: '© 2026 LIN ZHOU. Designed & built from scratch.',
}
