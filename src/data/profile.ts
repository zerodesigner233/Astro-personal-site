export const profile = {
  // ── 背景图片 ──
  // 放一张图到 public/ 目录，然后填路径即可
  background: {
    image: '',            // 例: '/bg.webp'，留空则无背景图
    opacity: 0.35,        // 背景图透明度 (0~1)
    blur: 12,             // 背景图模糊半径 (px)
    scale: 1.05,          // 背景图缩放（避免边缘留白）
  },

  // ── 基本信息 ──
  name: 'dev_',
  title: 'Creative Developer',
  email: 'hello@example.com',

  // ── 个人简介 ──
  bio: {
    en: [
      'A creative developer passionate about building beautiful, functional digital experiences.',
      'When I\'m not creating, you\'ll find me exploring new technologies and experimenting with generative art.',
    ],
    zh: [
      '一名创意开发者，热衷于构建美观、实用的数字体验。',
      '不创作的时候，我会探索新技术，尝试生成艺术。',
    ],
  },

  // ── 当前动态 ──
  currently: {
    en: 'Building creative tools & exploring generative art with code.',
    zh: '正在构建创意工具，探索生成式艺术。',
  },

  // ── 社交链接 ──
  links: [
    { label: 'GitHub', url: 'https://github.com/your-username', icon: 'github' },
    { label: 'Twitter', url: 'https://twitter.com/your-handle', icon: 'twitter' },
    { label: 'Email', url: 'mailto:hello@example.com', icon: 'email' },
  ],

  // ── 统计数据 ──
  stats: [
    { num: 5, suffix: '+', label: { en: 'Years', zh: '年经验' } },
    { num: 30, suffix: '+', label: { en: 'Projects', zh: '个项目' } },
    { num: 100, suffix: '+', label: { en: 'Coffee', zh: '杯咖啡' } },
  ],

  // ── 站点信息 ──
  site: {
    name: 'dev_',
    title: 'dev_ | Creative Developer',
    description: 'Creating across pixels, sound, and code.',
  },
};
