import { useState } from 'react'

interface ImageFadeProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

const ImageFade = ({ src, alt, className = '', loading = 'lazy' }: ImageFadeProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-sky-100 animate-pulse" />
      )}
    </div>
  )
}

export default ImageFade
