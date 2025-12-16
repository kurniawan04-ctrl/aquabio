/**
 * Helper untuk convert image paths dari Vite ke Next.js
 * 
 * Usage:
 * import { getImagePath } from '@/lib/image-helper'
 * const img = getImagePath('48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png')
 */

export function getImagePath(filename: string): string {
  // Jika sudah full URL, return as is
  if (filename.startsWith('http') || filename.startsWith('//')) {
    return filename
  }
  
  // Jika sudah mulai dengan /, return as is
  if (filename.startsWith('/')) {
    return filename
  }
  
  // Convert /... ke /public/...
  if (filename.includes('/')) {
    const actualFilename = filename.replace('/', '')
    return `/${actualFilename}`
  }
  
  // Default: assume it's in public folder
  return `/${filename}`
}

// Pre-defined image paths untuk kemudahan
export const images = {
  background: '/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png',
  rectangle15: '/48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png',
  rectangle16: '/e7514e0a1edf118e9ce83188f04cf9d3e6a02b9f.png',
  rectangle17: '/a8cfa9809f1a6a9b5ff9cb7338f44487a42d4aba.png',
  rectangle18: '/f3ca749e9269954417e50a89a00127f7dc4cd4d9.png',
  rectangle19: '/115e61b35b73266e0a95d9fb566ec13828e34c44.png',
  rectangle20: '/42c7891104c5a627a54b753faff3d0b0a402cc41.png',
}

