import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <span className="text-5xl font-bold text-white">NM</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl font-bold text-ink mb-6"
        >
          Nikhil Muthukumar
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl text-sub leading-relaxed mb-12"
        >
          Software and UI/UX Developer passionate about designing and creating.
          Recent graduate looking to get work experience in any manner.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors text-lg"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-sky-500 rounded-lg font-medium hover:bg-sky-50 transition-colors text-lg"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero