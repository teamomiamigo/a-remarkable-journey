import { useState } from 'react'
import { motion } from 'framer-motion'
import BlobBackground from './BlobBackground'

const BackgroundShowcase = () => {
  const [useBlobBackground, setUseBlobBackground] = useState(false)

  return (
    <div className="min-h-screen relative">
      {/* Option A: CSS-only background (default) */}
      {!useBlobBackground && <div className="bg-alive" aria-hidden="true" />}
      
      {/* Option B: Blob background (when toggled) */}
      {useBlobBackground && <BlobBackground />}
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-ink mb-8"
          >
            Background Showcase
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-sub mb-12"
          >
            Experience two different animated background approaches
          </motion.p>

          {/* Toggle Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-lg font-medium text-ink">Background Type:</span>
              <button
                onClick={() => setUseBlobBackground(false)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !useBlobBackground
                    ? 'bg-sky-500 text-white'
                    : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
                }`}
              >
                CSS Gradient
              </button>
              <button
                onClick={() => setUseBlobBackground(true)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  useBlobBackground
                    ? 'bg-sky-500 text-white'
                    : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
                }`}
              >
                Canvas Blobs
              </button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-ink mb-4">CSS Gradient (Option A)</h3>
              <ul className="space-y-2 text-sub">
                <li>• Pure CSS animations</li>
                <li>• GPU-accelerated</li>
                <li>• Zero JavaScript overhead</li>
                <li>• Smooth 60fps performance</li>
                <li>• Works with light/dark themes</li>
                <li>• No external assets required</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-ink mb-4">Canvas Blobs (Option B)</h3>
              <ul className="space-y-2 text-sub">
                <li>• Dynamic canvas rendering</li>
                <li>• Organic blob movements</li>
                <li>• Real-time color mixing</li>
                <li>• Responsive to window resize</li>
                <li>• Customizable blob properties</li>
                <li>• Smooth requestAnimationFrame</li>
              </ul>
            </div>
          </motion.div>

          {/* Performance Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-ink mb-4">Performance Features</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sub">
              <div>
                <strong className="text-ink">GPU Acceleration:</strong>
                <br />Both options use hardware acceleration
              </div>
              <div>
                <strong className="text-ink">60fps Smooth:</strong>
                <br />Optimized for consistent frame rates
              </div>
              <div>
                <strong className="text-ink">Low CPU Usage:</strong>
                <br />Minimal impact on system resources
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BackgroundShowcase
