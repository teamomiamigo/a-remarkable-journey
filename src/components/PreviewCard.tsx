import type { Project } from '../data/projects'
import ImageFade from './ImageFade'
import VideoLoop from './VideoLoop'

interface PreviewCardProps {
  project: Project
}

const PreviewCard = ({ project }: PreviewCardProps) => {
  const renderPreview = () => {
    switch (project.kind) {
      case 'video':
        return (
          <VideoLoop
            src={project.previewSrc!}
            poster={project.previewPoster}
            eager={project.eager}
            className="rounded-lg"
          />
        )
      case 'image':
        return (
          <ImageFade
            src={project.previewSrc!}
            alt={project.title}
            loading={project.eager ? 'eager' : 'lazy'}
            className="rounded-lg"
          />
        )
      case 'text':
        return (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {project.title.charAt(0)}
              </span>
            </div>
            <h3 className="text-5xl font-bold text-ink mb-6">{project.title}</h3>
            <p className="text-2xl text-sub leading-relaxed mb-8">
              {project.previewText}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 text-lg bg-sky-100 text-sky-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-4xl mx-auto">
        {renderPreview()}
      </div>
    </div>
  )
}

export default PreviewCard
