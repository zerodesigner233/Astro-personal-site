import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET = 'my-portfolio-media',
  R2_PUBLIC_URL = `https://pub-${R2_ACCOUNT_ID}.r2.dev`,
  R2_PATH_PREFIX = 'Cloudfare/website',
  SOURCE_DIR = 'public',
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('Missing required env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY');
  console.error('Skipping upload.');
  process.exit(0);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const baseUrl = R2_PUBLIC_URL.replace(/\/+$/, '');
const prefix = R2_PATH_PREFIX ? `${R2_PATH_PREFIX.replace(/^\/+|\/+$/g, '')}/` : '';

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function uploadFile(localPath) {
  const relPath = relative(SOURCE_DIR, localPath).replace(/\\/g, '/');
  const key = `${prefix}${relPath}`;
  const body = await readFile(localPath);
  const contentType = getContentType(key);

  try {
    await s3.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    console.log(`  ✓ ${baseUrl}/${key}`);
  } catch (err) {
    console.error(`  ✗ ${key}: ${err.message}`);
  }
}

function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const types = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    ttf: 'font/ttf',
    woff: 'font/woff',
    woff2: 'font/woff2',
  };
  return types[ext] || 'application/octet-stream';
}

async function main() {
  console.log(`Uploading from ${SOURCE_DIR}/ to R2 bucket "${R2_BUCKET}"...\n`);

  const allFiles = await getAllFiles(SOURCE_DIR);
  const mediaFiles = allFiles.filter(f => {
    const ext = f.split('.').pop().toLowerCase();
    return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico', 'ttf', 'woff', 'woff2'].includes(ext);
  });

  if (mediaFiles.length === 0) {
    console.log('No media files found in public/');
    return;
  }

  for (const file of mediaFiles) {
    await uploadFile(file);
  }

  console.log(`\nDone. ${mediaFiles.length} files uploaded.`);
}

main().catch(console.error);
