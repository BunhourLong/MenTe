// Regenerates every logo/icon PNG from mark.svg and icon.svg: node assets/logo/export.js
const path = require('path')
const sharp = require(process.env.SHARP_PATH || 'sharp')
const root = path.resolve(__dirname, '../..')
const at = (...p) => path.join(root, ...p)
const mark = at('assets/logo/mark.svg')
const icon = at('assets/logo/icon.svg')
const circle = size => Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`)

const jobs = [
  ...[[1, ''], [2, '@2x'], [3, '@3x']].map(([scale, suffix]) =>
    sharp(mark, { density: 400 }).resize(60 * scale, 60 * scale).png().toFile(at(`app/modules/images/logo${suffix}.png`))),
  // iOS rejects app icons with an alpha channel.
  sharp(icon, { density: 400 }).resize(1024, 1024).flatten({ background: '#0B4F4A' }).png()
    .toFile(at('ios/Mente/Images.xcassets/AppIcon.appiconset/AppIcon.png')),
  ...Object.entries({ mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 }).flatMap(([density, size]) => [
    sharp(icon, { density: 400 }).resize(size, size).png().toFile(at(`android/app/src/main/res/mipmap-${density}/ic_launcher.png`)),
    sharp(icon, { density: 400 }).resize(size, size).composite([{ input: circle(size), blend: 'dest-in' }]).png()
      .toFile(at(`android/app/src/main/res/mipmap-${density}/ic_launcher_round.png`)),
  ]),
]
Promise.all(jobs).then(r => console.log(`exported ${r.length} files`))
