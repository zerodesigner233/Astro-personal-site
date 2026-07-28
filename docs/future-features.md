# 预备方案

本文档记录尚未启用的功能，作为后续接入的参考。

---

## 1. Umami 网站分析

**用途**：统计访客数据——UV/PV、来源渠道、停留时长、设备分布、页面热力图。

**为什么用 Umami**：
- 开源可自托管，也有云托管（umami.is）
- 无 Cookie、GDPR 合规，不被浏览器拦截
- 比 Google Analytics 轻量，脚本仅 2KB
- 免费额度：云版 100k 事件/月

**接入步骤**：

1. 去 [umami.is](https://umami.is) 注册账号
2. 添加网站，拿到 Website ID（格式如 `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`）
3. 打开 `src/layouts/BaseLayout.astro`，取消注释并替换 ID：
   ```html
   <script defer data-website-id="你的ID" src="https://analytics.umami.is/script.js"></script>
   ```
4. 部署后在 Umami 后台即可看到数据

**本地开发时**：建议保持注释，避免开发期间产生垃圾数据。

---

## 2. Cloudflare R2（媒体存储）

**用途**：存放作品图片、封面图等静态资源，替代本地 `public/` 目录。

**为什么用 R2**：
- 免费额度大（10GB 存储 + 1000万次读取/月）
- 自带 CDN 加速，全球访问快
- 兼容 S3 API，接入简单
- 不计出站流量费（对比 AWS S3）

**接入步骤**：

1. 在 Cloudflare 控制台创建 R2 存储桶，命名如 `my-portfolio-media`
2. 生成 API Token（权限：Object Read & Write）
3. 记下以下信息：
   - Account ID
   - Access Key ID
   - Secret Access Key
   - Bucket name
   - R2 域名（如 `https://pub-xxxx.r2.dev` 或自定义域名）

4. 安装 S3 客户端（用于上传脚本）：
   ```bash
   npm install @aws-sdk/client-s3
   ```

5. 创建上传脚本 `scripts/upload-media.mjs`：
   ```js
   import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
   import { readdir } from 'fs/promises';
   import { join } from 'path';

   const s3 = new S3Client({
     region: 'auto',
     endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
     credentials: {
       accessKeyId: process.env.R2_ACCESS_KEY_ID,
       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
     },
   });

   const BUCKET = 'my-portfolio-media';
   const PUBLIC_URL = 'https://pub-xxxx.r2.dev';

   async function uploadDir(dir) {
     const files = await readdir(dir, { withFileTypes: true });
     for (const f of files) {
       if (f.isDirectory()) { await uploadDir(join(dir, f.name)); continue; }
       const key = `portfolio/${f.name}`;
       const body = await readFile(join(dir, f.name));
       await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body }));
       console.log(`✓ ${PUBLIC_URL}/${key}`);
     }
   }
   ```

6. 在组件中将图片 URL 改为 R2 域名前缀：
   ```astro
   <img src="https://pub-xxxx.r2.dev/portfolio/cover.webp" />
   ```

7. GitHub Actions 中添加环境变量：
   - `R2_ACCOUNT_ID`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`

---

## 3. Keystatic CMS（可视化编辑器）

**用途**：在浏览器中可视化编辑博客/作品的 Markdown 内容，无需手动改代码。

**为什么用 Keystatic**：
- 开源免费，专为 Astro 设计
- 支持 GitHub Mode（内容存在 GitHub 仓库里）
- 本地运行有可视化界面

**当前问题**：
- 需要 React 作为依赖（项目目前零框架）
- 需要 GitHub OAuth App 配置
- 部署后编辑需要认证

**接入步骤**：

1. 安装依赖：
   ```bash
   npm install keystatic @keystatic/astro react react-dom
   ```

2. 创建 `keystatic.config.tsx`：
   ```tsx
   import { config, fields, collection } from '@keystatic/core';

   export default config({
     storage: { kind: 'github', repo: 'your-username/online-website' },
     collections: {
       blog: collection({
         label: 'Blog',
         slugField: 'title',
         path: 'src/content/blog/*',
         schema: {
           title: fields.slug({ name: { label: 'Title' } }),
           date: fields.date({ label: 'Date' }),
           tags: fields.multiselect({ label: 'Tags', options: [
             { label: 'CSS', value: 'CSS' },
             { label: 'JavaScript', value: 'JavaScript' },
           ]}),
           category: fields.select({ label: 'Category', options: [
             { label: 'Tech', value: 'tech' },
             { label: 'Thoughts', value: 'thoughts' },
           ]}),
           body: fields.markdoc({ label: 'Content' }),
         },
       }),
       works: collection({
         label: 'Works',
         slugField: 'title',
         path: 'src/content/works/*',
         schema: {
           title: fields.slug({ name: { label: 'Title' } }),
           date: fields.date({ label: 'Date' }),
           category: fields.select({ label: 'Category', options: [
             { label: 'Painting', value: 'painting' },
             { label: 'Music', value: 'music' },
             { label: 'Design', value: 'design' },
             { label: 'Code', value: 'code' },
           ]}),
           body: fields.markdoc({ label: 'Content' }),
         },
       }),
     },
   });
   ```

3. 在 `astro.config.mjs` 中条件加载：
   ```js
   import keystatic from '@keystatic/astro';
   const maybeKeystatic = process.env.KEYSTATIC === 'true' ? [keystatic()] : [];
   export default defineConfig({
     integrations: [mdx(), ...maybeKeystatic],
   });
   ```

4. 创建 `src/pages/admin/keystatic.astro`：
   ```astro
   ---
   import { makePage } from '@keystatic/astro/ui';
   import config from '../../../keystatic.config';
   export const { getStaticPaths, Keystatic } = makePage(config);
   ---
   <Keystatic />
   ```

5. 创建 GitHub OAuth App：
   - GitHub Settings → Developer settings → OAuth Apps → New
   - Homepage URL: `http://localhost:4321`
   - Callback URL: `http://localhost:4321/api/keystatic/callback`

6. 本地运行：
   ```bash
   KEYSTATIC=true KEYSTATIC_GITHUB_APP_SLUG=xxx GITHUB_CLIENT_ID=xxx GITHUB_CLIENT_SECRET=xxx npm run dev
   ```
   访问 `http://localhost:4321/admin` 即可使用编辑器。

---

## 接入优先级建议

| 功能 | 优先级 | 理由 |
|------|--------|------|
| Umami 分析 | 高 | 5 分钟搞定，了解访客情况 |
| R2 存储 | 中 | 图片多了再接，目前本地够用 |
| Keystatic CMS | 低 | 文章少的话直接改 MDX 更快 |
