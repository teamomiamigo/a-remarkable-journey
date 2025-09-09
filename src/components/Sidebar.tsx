import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { projects } from '../data/projects'

interface SidebarProps {
  onProjectHover: (project: Project | null) => void
}

const Sidebar = ({ onProjectHover }: SidebarProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)))
  const filters = ['All', ...allTags]

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter))

  const handleMouseEnter = (project: Project, event: React.MouseEvent) => {
    setHoveredItem(project.id)
    onProjectHover(project)
    
    // Magnetic effect
    const item = itemRefs.current[project.id]
    if (item) {
      const rect = item.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const mouseX = event.clientX
      const offset = (mouseX - centerX) * 0.1 // Magnetic strength
      
      item.style.transform = `translateX(${offset}px) scale(1.02)`
    }
  }

  const handleMouseLeave = (project: Project) => {
    setHoveredItem(null)
    onProjectHover(null)
    
    // Reset magnetic effect
    const item = itemRefs.current[project.id]
    if (item) {
      item.style.transform = 'translateX(0px) scale(1)'
    }
  }

  return (
    <div className="col-span-4 bg-bg overflow-y-auto">
      <div className="p-6">
        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-sub mb-4">Filter by</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  activeFilter === filter
                    ? 'bg-sky-500 text-white'
                    : 'bg-sky-50 text-sub hover:bg-sky-100'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => itemRefs.current[project.id] = el}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onMouseEnter={(e) => handleMouseEnter(project, e)}
              onMouseLeave={() => handleMouseLeave(project)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-150 ease-in-out ${
                hoveredItem === project.id
                  ? 'bg-sky-50'
                  : 'bg-transparent hover:bg-sky-25'
              }`}
            >
              <h4 className="font-medium text-ink mb-2">{project.title}</h4>
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-sky-100 text-sky-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
