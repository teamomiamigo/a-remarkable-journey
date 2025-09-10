import { useRef, useEffect } from 'react'

const BlobBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Blob configuration
    const blobs = [
      { x: 0.2, y: 0.3, size: 0.4, color: 'rgba(74, 144, 226, 0.3)', speed: 0.0005 },
      { x: 0.8, y: 0.2, size: 0.3, color: 'rgba(168, 85, 247, 0.3)', speed: 0.0003 },
      { x: 0.5, y: 0.8, size: 0.5, color: 'rgba(34, 197, 94, 0.3)', speed: 0.0004 }
    ]

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      blobs.forEach((blob, index) => {
        const x = (blob.x + Math.sin(time * blob.speed + index) * 0.1) * canvas.width
        const y = (blob.y + Math.cos(time * blob.speed + index) * 0.1) * canvas.height
        const size = blob.size * Math.min(canvas.width, canvas.height)

        // Create gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  )
}

export default BlobBackground
