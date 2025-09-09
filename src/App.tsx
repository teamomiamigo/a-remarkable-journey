import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import PreviewPane from './components/PreviewPane'
import Sidebar from './components/Sidebar'
import type { Project } from './data/projects'
import { projects } from './data/projects'
import EarthIntro from './sections/EarthIntro'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const handleProjectHover = (project: Project | null) => {
    setActiveProject(project)
  }

  // Eager load top 3 projects on mount
  useEffect(() => {
    if (!showIntro) {
      const eagerProjects = projects.filter(p => p.eager)
      eagerProjects.forEach(project => {
        if (project.kind === 'video' && project.previewSrc) {
          const video = document.createElement('video')
          video.preload = 'auto'
          video.src = project.previewSrc
        } else if (project.kind === 'image' && project.previewSrc) {
          const img = new Image()
          img.src = project.previewSrc
        }
      })
    }
  }, [showIntro])

  return (
    <div className="w-full min-h-screen bg-bg text-ink overflow-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <EarthIntro onComplete={handleIntroComplete} />
        ) : (
          <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 grid grid-cols-12 max-w-[1400px] mx-auto">
              <Sidebar onProjectHover={handleProjectHover} />
              <PreviewPane activeProject={activeProject} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
