/**
 * Script d'optimisation d'images en batch
 * Convertit les images JPEG/PNG en WebP avec compression
 *
 * Usage: npm run optimize-images
 */

import sharp from 'sharp'
import { glob } from 'glob'
import path from 'path'
import fs from 'fs/promises'

const INPUT_DIR = 'public/images'
const MAX_WIDTH = 1920
const QUALITY = 80

async function optimizeImages() {
  const files = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png}`)

  if (files.length === 0) {
    console.log('No images found to optimize')
    return
  }

  console.log(`Found ${files.length} images to optimize`)

  let optimized = 0
  let skipped = 0

  for (const file of files) {
    const outputPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')

    // Skip if WebP already exists and is newer
    try {
      const [inputStat, outputStat] = await Promise.all([
        fs.stat(file),
        fs.stat(outputPath).catch(() => null)
      ])

      if (outputStat && outputStat.mtime > inputStat.mtime) {
        skipped++
        continue
      }
    } catch {
      // File doesn't exist, continue
    }

    // Create output directory if needed
    await fs.mkdir(path.dirname(outputPath), { recursive: true })

    // Optimize
    await sharp(file)
      .resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    const relativePath = path.relative(INPUT_DIR, file)
    console.log(`✓ ${relativePath} → WebP`)
    optimized++
  }

  console.log(`\nDone! Optimized: ${optimized}, Skipped: ${skipped}`)
}

optimizeImages().catch(console.error)
