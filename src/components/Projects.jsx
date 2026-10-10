import { useState, useEffect } from 'react'
import { client, urlFor } from '../client'
export function ProjectCard({ project, onSelect }) {
  const [imgFailed, setImgFailed] = useState(false)

  // Handle both Sanity images and local static images
  const imageUrl = project.image?.asset ? urlFor(project.image).url() : project.image;
  // Handle both Sanity tags and local tech arrays
  const techTags = project.tags || project.tech || [];

  return (
    <div className="proj-card-new" onClick={() => onSelect(project._id || project.id)}>
      <div className="proj-card-new-img-wrap" data-cursor="expand">
        {!imgFailed && imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt=""
              className="proj-card-new-img-bg"
              onError={() => setImgFailed(true)}
            />
            <img
              src={imageUrl}
              alt={project.title}
              className="proj-card-new-img"
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="proj-card-new-fallback">
            <span>{project.title ? project.title.substring(0, 2).toUpperCase() : 'PR'}</span>
          </div>
        )}
      </div>
      <div className="proj-card-new-body">
        <h3 className="proj-card-new-title">{project.title}</h3>
        <p className="proj-card-new-desc">{project.description}</p>
        <div className="proj-card-new-tags">
          {techTags.map(t => (
            <span className="tech-pill" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects({ setActiveProjectId, setShowAllProjects }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from Sanity
    client.fetch('*[_type == "project"]')
      .then((data) => {
        if (data) setProjects(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      });
  }, []);

  const visibleProjects = projects.slice(0, 2)

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
