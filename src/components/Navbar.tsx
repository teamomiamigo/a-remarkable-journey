import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-ink"
        >
          NM
        </motion.div>
        
        <div className="flex items-center gap-6">
          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-sub hover:text-sky-500 transition-colors"
          >
            Resume
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-sub hover:text-sky-500 transition-colors"
          >
            Contact
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-sub hover:text-sky-500 transition-colors"
            onClick={() => window.open('/showcase', '_blank')}
          >
            Showcase
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
