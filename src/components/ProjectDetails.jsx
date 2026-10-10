import { useState, useEffect } from 'react'
import { projectsData } from '../data/projectsData'
import { ProjectCard } from './Projects'
import { client, urlFor } from '../client'

export default function ProjectDetails({ projectId, setActiveProjectId, navigateToSection, showAllProjects }) {
  const [currentProject, setCurrentProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgFailed, setImgFailed] = useState(false)
  const [toast, setToast] = useState(null)
  const [showToastClass, setShowToastClass] = useState(false)
  // Fetch project data (either static or from Sanity)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setImgFailed(false)
    setLoading(true)

    // First check static data
    const staticProj = projectsData.find(p => p.id === projectId)
    if (staticProj) {
      setCurrentProject(staticProj)
      setLoading(false)
      return
    }

    // If not static, fetch from Sanity
    client.fetch(`*[_type == "project" && _id == $id][0]`, { id: projectId })
      .then(res => {
        if (res) {
          setCurrentProject({
            id: res._id,
            title: res.title || "Project",
            tagline: res.tagline || (res.description ? res.description.substring(0, 100) + "..." : ""),
            liveLink: res.link || "#",
            github: res.github || null,
            useGithubReadme: res.useGithubReadme || false,
            client: res.client || "Personal Project",
            industry: res.industry || "Software",
            timeline: res.timeline || "Recent",
            technologies: res.tags ? res.tags.join(", ") : "Various",
            image: res.image?.asset ? urlFor(res.image).url() : res.image,
            overview: res.overview || res.description || "No overview available.",
            role: res.role || [],
            techStack: res.techStack || (res.tags || []).map(t => ({ label: "Tech", value: t })),
            features: res.features || [],
            structure: res.structure || "",
            structureBullets: res.structureBullets || [],
            challenges: res.challenges || []
          })
        } else {
          setCurrentProject(null)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setCurrentProject(null)
        setLoading(false)
      })
  }, [projectId])

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setShowToastClass(true), 10)
    const timer = setTimeout(() => {
      setShowToastClass(false)
      setTimeout(() => setToast(null), 400)
    }, 4000)
    return () => clearTimeout(timer)
  }

  const closeToast = () => {
    setShowToastClass(false)
    setTimeout(() => setToast(null), 400)
  }

  if (loading) {
    return (
      <div className="project-details-page">
        <div className="section-inner" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Loading project...</h2>
        </div>
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="project-details-page">
        <div className="section-inner" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Project not found</h2>
          <a href="#" className="btn-live-preview" style={{ marginTop: '20px' }} onClick={(e) => { e.preventDefault(); navigateToSection('projects'); }}>
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  // Get other 3 projects to display in the "More Projects" section
  const otherProjects = projectsData.filter(p => p.id.toLowerCase() !== projectId?.toLowerCase())

  return (
    <div className="project-details-page">
      <div className="section-inner">
        <div className="project-details-container">
          {/* Breadcrumbs */}
          <div className="details-breadcrumbs">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('hero'); }}>// Home</a>
            <span>//</span>
            <a href="#projects" onClick={(e) => { 
              e.preventDefault(); 
              if (showAllProjects) {
                setActiveProjectId(null);
              } else {
                navigateToSection('projects'); 
              }
            }}>Portfolio</a>
            <span>//</span>
            <span style={{ color: 'var(--white)' }}>Projects</span>
          </div>

          {/* Hero Section */}
          <div className="details-hero-grid">
            <div className="details-hero-left">
              <h1 className="details-hero-title">{currentProject.title}</h1>
              <p className="details-hero-tagline">{currentProject.tagline}</p>
              <a
                href={currentProject.liveLink}
                className="btn-live-preview"
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => {
                  if (currentProject.liveLink === '#') {
                    e.preventDefault()
                    triggerToast('Live preview will be available soon!', 'info')
                  }
                }}
              >
                Live Preview <span>↗</span>
              </a>
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  className="btn-live-preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: '10px', background: 'transparent', border: '1px solid var(--w50)', color: 'var(--white)' }}
                >
                  GitHub <span>↗</span>
                </a>
              )}
            </div>

            <div className="details-hero-right">
              <div className="meta-item">
                <span className="meta-label">Client</span>
                <span className="meta-value">{currentProject.client}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">{currentProject.industry}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Timeline</span>
                <span className="meta-value">{currentProject.timeline}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Technologies</span>
                <span className="meta-value">{currentProject.technologies}</span>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="details-main-img-wrap">
            {!imgFailed ? (
              <img
                src={currentProject.image}
                alt={`${currentProject.title} Main Preview`}
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="details-main-img-fallback">
                <span>{currentProject.title.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Subsections Grid */}
          <div className="details-sections-grid">
            <div className="details-sections-left">
              {/* Project Overview */}
              {currentProject.overview && (
                <div className="details-section">
                  <h2>Project Overview</h2>
                  {currentProject.overview.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {/* Your Role */}
              {currentProject.role && currentProject.role.length > 0 && (
                <div className="details-section">
                  <h2>Your Role</h2>
                  <ul>
                    {currentProject.role.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Used */}
              {currentProject.techStack && currentProject.techStack.length > 0 && (
                <div className="details-section">
                  <h2>Tech Stack Used</h2>
                  <ul>
                    {currentProject.techStack.map((tech, idx) => (
                      <li key={idx}>
                        <strong>{tech.label}:</strong> {tech.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Features */}
              {currentProject.features && currentProject.features.length > 0 && (
                <div className="details-section">
                  <h2>Key Features</h2>
                  <ul>
                    {currentProject.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code Structure */}
              {(currentProject.structure || (currentProject.structureBullets && currentProject.structureBullets.length > 0)) && (
                <div className="details-section">
                  <h2>Code Structure & Architecture</h2>
                  {currentProject.structure && (
                    <div className="code-editor-box">
                      <div className="code-editor-header">
                        <div className="code-editor-buttons">
                          <span className="code-editor-dot dot-red" />
                          <span className="code-editor-dot dot-yellow" />
                          <span className="code-editor-dot dot-green" />
                        </div>
                        <div className="code-editor-title">bash</div>
                      </div>
                      <div className="code-editor-body">
                        {currentProject.structure}
                      </div>
                    </div>
                  )}
                  {currentProject.structureBullets && currentProject.structureBullets.length > 0 && (
                    <ul>
                      {currentProject.structureBullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Challenges & Solutions */}
              {currentProject.challenges && currentProject.challenges.length > 0 && (
                <div className="details-section">
                  <h2>Challenges & Solutions</h2>
                  <div className="challenges-list">
                    {currentProject.challenges.map((c, idx) => (
                      <div className="challenge-item" key={idx}>
                        <strong>Challenge: {c.challenge}</strong>
                        <span>Solution: {c.solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* More Projects Section */}
          <div className="more-projects-section">
            <h2 className="more-projects-title">More Projects</h2>
            <div className="projects-grid-2col">
              {otherProjects.map(p => (
                <ProjectCard key={p.id} project={p} onSelect={setActiveProjectId} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`custom-toast ${toast.type} ${showToastClass ? 'reveal-toast' : ''}`}>
          <div className="toast-content">
            {toast.type === 'success' ? (
              <svg className="toast-icon success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : toast.type === 'error' ? (
              <svg className="toast-icon error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            ) : (
              <svg className="toast-icon info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            )}
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={closeToast}>×</button>
        </div>
      )}
    </div>
  )
}
