import fs from 'fs';
import path from 'path';

const distDir = './dist';
const assetsDir = './dist/assets';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = getFiles(assetsDir);
const assetPaths = allFiles.map(file => {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  return `/${relative}`;
});

// Add other critical static assets from public folder (exclude large video files)
assetPaths.push('/favicon.svg');
assetPaths.push('/icons.svg');
assetPaths.push('/resume.html');

console.log('Detected build assets for PWA caching:', assetPaths);

const swPath = './dist/sw.js';
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  const formattedAssets = assetPaths.map(p => `"${p}"`).join(',\n        ');
  
  swContent = swContent.replace('/* ASSETS_TO_CACHE */', formattedAssets);
  fs.writeFileSync(swPath, swContent, 'utf8');
  console.log('Successfully injected asset list into dist/sw.js');
} else {
  console.error('sw.js not found in dist/ folder!');
}
