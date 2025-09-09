import { useEffect, useRef } from 'react'

interface VideoLoopProps {
  src: string
  poster?: string
  eager?: boolean
  className?: string
}

const VideoLoop = ({ src, poster, eager = false, className = '' }: VideoLoopProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set preload based on eager prop
    video.preload = eager ? 'auto' : 'metadata'

    // Start playing when component mounts if eager
    if (eager) {
      video.play().catch(console.error)
    }
  }, [eager])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={`w-full h-full object-cover ${className}`}
      playsInline
      muted
      loop
      autoPlay
    />
  )
}

export default VideoLoop
