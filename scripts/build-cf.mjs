import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const openNextDir = path.join(rootDir, '.open-next');

// 1. Rename worker.js to _worker.js for Cloudflare Pages
const workerPath = path.join(openNextDir, 'worker.js');
const targetWorkerPath = path.join(openNextDir, '_worker.js');

if (fs.existsSync(workerPath)) {
  fs.renameSync(workerPath, targetWorkerPath);
  console.log('✅ Renamed worker.js to _worker.js');
} else {
  console.log('⚠️ worker.js not found. Skipping rename.');
}

// 2. Copy assets to root of .open-next so Cloudflare Pages serves them correctly
const assetsDir = path.join(openNextDir, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, openNextDir, { recursive: true });
  console.log('✅ Copied assets to .open-next root');
} else {
  console.log('⚠️ assets directory not found. Skipping copy.');
}
