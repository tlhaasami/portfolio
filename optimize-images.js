const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Target directory containing images
const TARGET_DIR = path.join(__dirname, 'public', 'data');

// Supported formats
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// Maximum dimension (width or height) to resize down to (for web performance)
const MAX_DIMENSION = 1200;

function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';
  
  try {
    const statsBefore = fs.statSync(filePath);
    const sizeBefore = statsBefore.size;
    
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();
    
    let needsResize = false;
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      needsResize = true;
      if (width > height) {
        width = MAX_DIMENSION;
        height = null; // Auto aspect ratio
      } else {
        height = MAX_DIMENSION;
        width = null;
      }
    }
    
    if (needsResize) {
      pipeline = pipeline.resize(width, height);
    }
    
    if (ext === '.png') {
      pipeline = pipeline.png({ palette: true, quality: 80, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }
    
    await pipeline.toFile(tempPath);
    
    const statsAfter = fs.statSync(tempPath);
    const sizeAfter = statsAfter.size;
    
    if (sizeAfter < sizeBefore) {
      // Overwrite the original file
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
      console.log(`Optimized: ${path.relative(TARGET_DIR, filePath)}`);
      console.log(`  Size: ${(sizeBefore / 1024).toFixed(1)} KB -> ${(sizeAfter / 1024).toFixed(1)} KB (${reduction}% reduction)`);
      if (needsResize) {
        console.log(`  Resized from ${metadata.width}x${metadata.height} to fits ${MAX_DIMENSION}px`);
      }
    } else {
      // Clean up temp file, keep original if temp is larger
      fs.unlinkSync(tempPath);
      console.log(`Skipped (already optimized): ${path.relative(TARGET_DIR, filePath)}`);
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function main() {
  console.log(`Scanning directory: ${TARGET_DIR}`);
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Target directory does not exist: ${TARGET_DIR}`);
    return;
  }
  
  const images = getFilesRecursively(TARGET_DIR);
  console.log(`Found ${images.length} images to optimize.`);
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('Optimization task completed.');
}

main();
