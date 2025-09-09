import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Project } from '../data/projects'
import Hero from './Hero'
import PreviewCard from './PreviewCard'

interface PreviewPaneProps {
  activeProject: Project | null
}

const PreviewPane = ({ activeProject }: PreviewPaneProps) => {
  const [showHero, setShowHero] = useState(true)
  const [heroTimeout, setHeroTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (activeProject) {
      setShowHero(false)
      // Clear any existing timeout
      if (heroTimeout) {
        clearTimeout(heroTimeout)
      }
    } else {
      // Set timeout to show hero after 300ms
      const timeout = setTimeout(() => {
        setShowHero(true)
      }, 300)
      setHeroTimeout(timeout)
    }

    return () => {
      if (heroTimeout) {
        clearTimeout(heroTimeout)
      }
    }
  }, [activeProject, heroTimeout])

  return (
    <div className="col-span-8 bg-bg relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showHero && !activeProject ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Hero />
          </motion.div>
        ) : activeProject ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <PreviewCard project={activeProject} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default PreviewPane
