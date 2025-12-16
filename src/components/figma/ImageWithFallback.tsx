'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
}

export function ImageWithFallback({ 
  src, 
  alt, 
  width, 
  height, 
  fill,
  className,
  ...rest 
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    if (!didError) {
      setDidError(true)
      setImgSrc(ERROR_IMG_SRC)
    }
  }

  // If it's a URL (http/https), use regular img tag
  if (imgSrc.startsWith('http') || imgSrc.startsWith('//')) {
    return (
      <img 
        src={imgSrc} 
        alt={alt} 
        className={className} 
        onError={handleError}
        {...rest}
      />
    )
  }

  // For local images, use Next.js Image
  if (fill) {
    return (
      <div className={`relative ${className || ''}`}>
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-cover"
          onError={handleError}
          {...rest}
        />
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={handleError}
      {...rest}
    />
  )
}

