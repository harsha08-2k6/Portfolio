import { useState, useEffect } from 'react'
import { ProjectCard } from './Projects'
import { client } from '../client'

export default function AllProjects({ setActiveProjectId, setShowAllProjects, navigateToSection }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Fetch projects from Sanity
    client.fetch('*[_type == "project"]')
      .then((data) => {
        if (data) setProjects(data);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
      });
  }, [])

  return (
    <div className="all-projects-page">
      <div className="section-inner">
        {/* Breadcrumbs */}
        <div className="details-breadcrumbs">
          <a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('hero'); }}>// Home</a>
          <span>//</span>
          <span style={{ color: 'var(--white)' }}>All Projects</span>
        </div>

        {/* Header */}
        <div className="projects-header-grid" style={{ marginBottom: '3rem' }}>
          <div className="projects-header-left slash-reveal reveal-left visible">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">Projects</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up visible">
            <h2>All Projects</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left visible" style={{ marginBottom: '3rem' }}>
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Projects Grid */}
        <div className="projects-grid-2col">
          {projects.map(p => (
            <ProjectCard
              key={p._id || p.id}
              project={p}
              onSelect={setActiveProjectId}
            />
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="projects-more-btn-wrap reveal-left visible">
          <button 
            className="btn-more-projects"
            onClick={() => setShowAllProjects(false)}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
