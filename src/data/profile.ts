export const profile = {
  // ── 头像 ──
  avatar: '/rapeseedflower233.png',

  // ── 背景图片 ──
  // 放一张图到 public/ 目录，然后填路径即可
  background: {
    image: '',            // 例: '/bg.webp'，留空则无背景图
    opacity: 0.35,        // 背景图透明度 (0~1)
    blur: 12,             // 背景图模糊半径 (px)
    scale: 1.05,          // 背景图缩放（避免边缘留白）
  },

  // ── 基本信息 ──
  name: 'rapeseed_flower233',
  title: 'Creative Developer',
  email: 'xiany9230@gmail.com',

  // ── 个人简介 ──
  bio: {
    en: [
      'A freelancer exploring full-stack development, pixel art enthusiast, practicing experimental music production. I build small games and utility tools, and occasionally have bold ideas and try to make them happen.',
    ],
    zh: [
      '一个尝试做全栈开发的自由人，像素画爱好者，正在练习实验编曲，会搓些小游戏和小工具应用，偶尔会有些大胆的想法并尝试着做一做。',
    ],
  },

  // ── 当前动态 ──
  currently: {
    en: 'Working on indie dev projects at home, taking freelance gigs, and looking for suitable job opportunities.',
    zh: '在家做独立开发项目，正在尝试接单，和看看有没有适合的工作。',
  },

  // ── 社交链接 ──
  links: [
    { label: 'GitHub', url: 'https://github.com/zerodesigner', icon: 'github' },
    { label: 'Bilibili', url: 'https://space.bilibili.com/3546904682040074', icon: 'bilibili' },
    { label: 'Email', url: 'mailto:xiany9230@gmail.com', icon: 'email' },
  ],

  // ── 统计数据 ──
  stats: [
    { num: 1, suffix: '+', label: { en: 'Years', zh: '年经验' } },
    { num: 3, suffix: '+', label: { en: 'Projects', zh: '个项目' } },
    { num: 0, suffix: '', label: { en: 'Coffee', zh: '杯咖啡' } },
  ],

  // ── 站点信息 ──
  site: {
    name: 'rapeseed_flower233',
    title: 'rapeseed_flower233 | Creative Developer',
    description: 'Creating across pixels, sound, and code.',
  },
};
