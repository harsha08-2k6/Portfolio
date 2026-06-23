import { useState } from 'react'
import { projectsData } from '../data/projectsData'

export function ProjectCard({ project, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="proj-card-new" onClick={() => onSelect(project.id)}>
      <div className="proj-card-new-img-wrap" data-cursor="expand">
        {!imgFailed ? (
          <>
            <img
              src={project.image}
              alt=""
              className="proj-card-new-img-bg"
              onError={() => setImgFailed(true)}
            />
            <img
              src={project.image}
              alt={project.title}
              className="proj-card-new-img"
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="proj-card-new-fallback">
            <span>{project.title.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div className="proj-card-new-body">
        <h3 className="proj-card-new-title">{project.title}</h3>
        <p className="proj-card-new-desc">{project.description}</p>
        <div className="proj-card-new-tags">
          {project.tech.map(t => (
            <span className="tech-pill" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ setActiveProjectId, setShowAllProjects }) {
  const visibleProjects = projectsData.slice(0, 2)

  return (
    <section className="projects" id="projects">
      <div className="section-inner">
        <div className="projects-header-grid">
          <div className="projects-header-left slash-reveal reveal-left">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">Explore Work</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up">
            <h2>A Showcase of My<br />Latest Projects</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left">
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        <div className="projects-grid-2col">
          {visibleProjects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onSelect={setActiveProjectId}
            />
          ))}
        </div>

        <div className="projects-more-btn-wrap reveal-left visible">
          <button 
            className="btn-more-projects"
            onClick={() => setShowAllProjects(true)}
          >
            More Projects ↗
          </button>
        </div>
      </div>
    </section>
  )
}
