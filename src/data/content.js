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
  { id: 'about', label: '个人经历', en: 'About', href: '#about' },
  { id: 'aivisual', label: 'AI 视觉', en: 'AI Visual', href: '#aivisual' },
  { id: 'three', label: '三维作品', en: '3D Work', href: '#three' },
  { id: 'mg', label: 'MG 动画', en: 'Motion', href: '#mg' },
  { id: 'estate', label: '地产广告', en: 'Real Estate', href: '#estate' },
]

export const hero = {
  status: 'AVAILABLE FOR PROJECTS',
  titleLines: ['以视觉思维', '构建 AI 时代的品牌表达'],
  titleLinesEn: ['DESIGNING BRANDS', 'FOR THE AI ERA'],
  lead: '八年品牌与界面设计经验，近三年深耕 AIGC 视觉生产链路 —— 把审美判断、设计系统与生成式工具接进同一条工作流，让创意从概念到落地保持同一种精度。',
  primaryCta: { label: '约一个项目', href: '#contact' },
  secondaryCta: { label: '查看作品', href: '#aivisual' },
  facts: [
    { k: 'Years', v: '8+' },
    { k: 'Projects', v: '120+' },
    { k: 'Based in', v: 'Shanghai' },
  ],
  marquee: [
    'AI VISUAL',
    '3D WORK',
    'MOTION GRAPHICS',
    'REAL ESTATE',
    'KEY VISUAL',
    'PORTRAIT',
  ],
}

/**
 * 作品板块：页面的四个大类，一个类一个板块。
 * 每块 = 大标题 + 一句导语 + 一张整宽主推卡（featured）+ 可选的参与项目清单（credits）。
 * 换成真实作品时：替换 image，改 title / summary / tags / stats，credits 里逐条列参与过的项目。
 */
export const categories = [
  {
    id: 'aivisual',
    index: '01',
    cn: 'AI 视觉',
    en: 'AI Visual',
    sub: '把生成式模型接进真实生产链路',
    lead: '模型选型、LoRA 训练、提示词工程到批量可控出图 —— 让单张出图的运气变成可复用的方法。',
    featured: {
      title: 'PARTICLE FIELD — AIGC 影像实验',
      category: 'AI 影像 / 生成式视觉',
      year: '2025',
      image: asset('img/work-03.webp'),
      summary:
        '以粒子与体积光为媒介的系列影像实验，打通 ComfyUI 工作流与后期合成，产出 24 条品牌短片。',
      stats: [
        { k: '产出条数', v: '24' },
        { k: '工作流复用', v: '6 套' },
        { k: '出图周期', v: '-62%' },
      ],
      tags: ['AIGC', 'Prompt System', 'LoRA'],
    },
  },
  {
    id: 'three',
    index: '02',
    cn: '三维作品',
    en: '3D Work',
    sub: '从建模、材质到打光的完整三维表达',
    lead: '产品级材质与光影，静态渲染或三维合成的动态镜头，用来支撑主视觉与电商场景。',
    featured: {
      title: 'FOLDED LIGHT — 三维主视觉',
      category: '三维渲染 / 主视觉',
      year: '2025',
      image: asset('img/work-04.webp'),
      summary: '以金属织物质感为核心概念，完成年度主视觉、展厅空间与线上商城的统一表达。',
      stats: [
        { k: '渲染帧数', v: '1.2K' },
        { k: '材质球', v: '38' },
        { k: '交付周期', v: '6 周' },
      ],
      tags: ['3D', 'C4D', 'Redshift'],
    },
  },
  {
    id: 'mg',
    index: '03',
    cn: 'MG 动画',
    en: 'Motion Graphics',
    sub: '让静态视觉在时间维度上继续讲话',
    lead: '分镜、节奏、转场与信息图表动画 —— 从品牌片头到产品说明，按内容需要设计动效语言。',
    featured: {
      title: 'NEON GLYPH — 动态图形系统',
      category: 'MG 动画 / 品牌动效',
      year: '2025',
      image: asset('img/work-01.webp'),
      summary:
        '为品牌建立一套可延展的动效语言：标志演绎、转场、字幕与图表动画，覆盖 40+ 条成片。',
      stats: [
        { k: '成片', v: '40+' },
        { k: '动效组件', v: '62' },
        { k: '最长片长', v: '3:20' },
      ],
      tags: ['Motion Graphics', 'AE', 'Kinetic Type'],
    },
  },
  {
    id: 'estate',
    index: '04',
    cn: '地产广告',
    en: 'Real Estate',
    sub: '参与项目 · 从主视觉到全渠道物料',
    lead: '楼盘主视觉、案场物料、渠道画面与交付期传播 —— 这类项目我多以参与方身份进入，配合策划与销售节点推进。',
    featured: {
      title: 'HALO ESTATE — 地产整合视觉',
      category: '地产广告 / 整合传播',
      year: '2025',
      image: asset('img/work-02.webp'),
      summary:
        '从案名策略、主视觉到案场与线上渠道的全套物料，配合开盘、加推与交付三个关键节点。',
      stats: [
        { k: '物料', v: '180+' },
        { k: '推广节点', v: '3 轮' },
        { k: '合作周期', v: '9 个月' },
      ],
      tags: ['Real Estate', 'Key Visual', 'Campaign'],
    },
    credits: [
      { year: '2025', title: '云栖澜庭 — 开盘期整合推广', role: '主视觉 / 物料' },
      { year: '2024', title: '星河界 — 加推期渠道画面', role: '视觉执行' },
      { year: '2024', title: '山水合院 — 交付期传播', role: '画面设计' },
      { year: '2023', title: '海棠印 — 案场包装', role: '参与设计' },
    ],
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
