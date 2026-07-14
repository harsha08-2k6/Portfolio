import { useState } from 'react'

export default function TechnicalArsenal() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const matrixRows = [
    ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "JAVASCRIPT", "HTML5", "CSS3"],
    ["PYTHON", "FASTAPI", "NODE.JS", "EXPRESS.JS", "MONGODB", "POSTGRESQL", "SQL"],
    ["GIT & GITHUB", "DOCKER", "AWS", "LINUX", "KUBERNETES", "GITHUB ACTIONS"],
    ["FIGMA", "OPEN SOURCE", "ADOBE PHOTOSHOP", "CAPCUT", "DAVINCI RESOLVE", "PICSART"]
  ]

  const columns = [
    {
      title: "FRONTEND",
      color: "#8B5CF6", // Purple
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"]
    },
    {
      title: "BACKEND",
      color: "#F59E0B", // Yellow
      items: ["Python", "FastAPI", "Node.js", "Express.js"]
    },
    {
      title: "DATABASE",
      color: "#10B981", // Green
      items: ["MongoDB", "PostgreSQL", "SQL"]
    },
    {
      title: "CLOUD & DEVOPS",
      color: "#3B82F6", // Blue
      items: ["Git & GitHub", "Docker", "AWS", "Linux", "Kubernetes", "GitHub Actions"]
    },
    {
      title: "CREATIVE & MORE",
      color: "#EC4899", // Pink
      items: ["Figma", "Adobe Photoshop", "CapCut", "DaVinci Resolve", "Picsart"]
    }
  ]

  const skillMapping = {
    "React": "react",
    "Next.js": "nextjs",
    "TypeScript": "typescript",
    "Tailwind CSS": "tailwind",
    "JavaScript": "javascript",
    "HTML5": "html",
    "CSS3": "css",
    "Python": "python",
    "FastAPI": "fastapi",
    "Node.js": "nodejs",
    "Express.js": "express",
    "MongoDB": "mongodb",
    "PostgreSQL": "postgresql",
    "SQL": "sql",
    "Git & GitHub": "git",
    "Docker": "docker",
    "AWS": "aws",
    "Linux": "linux",
    "Kubernetes": "kubernetes",
    "Figma": "figma",
    "GitHub Actions": "github-actions",
    "Open Source": "opensource",
    "Adobe Photoshop": "photoshop",
    "CapCut": "capcut",
    "DaVinci Resolve": "davinci",
    "Picsart": "picsart"
  }

  const handleMouseEnter = (item) => {
    const key = Object.keys(skillMapping).find(k => k.toUpperCase() === item.toUpperCase())
    const id = skillMapping[key]
    if (id) setHoveredSkill(id)
  }

  const handleMouseLeave = () => {
    setHoveredSkill(null)
  }

  return (
    <section className="arsenal-section" id="arsenal">
      <div className="section-inner">
        {/* Section Header */}
        <div className="projects-header-grid">
          <div className="projects-header-left slash-reveal reveal-left">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">System Core</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up">
            <h2>Techniacal<br />Aresenal</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left" style={{ marginBottom: '4rem' }}>
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Matrix Box */}
        <div className="matrix-container reveal-up">
          <div className="matrix-header">[ MATRIX_V2 ]</div>
          <div className="matrix-grid">
            {matrixRows.map((row, rIdx) => (
              <div className="matrix-row" key={rIdx}>
                {row.map((word, wIdx) => {
                  const key = Object.keys(skillMapping).find(k => k.toUpperCase() === word.toUpperCase())
                  const id = skillMapping[key]
                  const isHovered = hoveredSkill && hoveredSkill === id
                  return (
                    <span
                      key={wIdx}
                      className={`matrix-word ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => handleMouseEnter(word)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {word}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="matrix-footer">HOVER TO ILLUMINATE</div>
        </div>

        {/* Categories Grid */}
        <div className="arsenal-columns-grid">
          {columns.map((col, cIdx) => (
            <div className="arsenal-card reveal-up" key={cIdx}>
              <div className="card-header">
                <span className="card-dot" style={{ backgroundColor: col.color, boxShadow: `0 0 8px ${col.color}` }} />
                <span className="card-title">{col.title}</span>
              </div>
              <ul className="card-list">
                {col.items.map((item, iIdx) => {
                  const id = skillMapping[item]
                  const isHovered = hoveredSkill && hoveredSkill === id
                  return (
                    <li
                      key={iIdx}
                      className={`card-item ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <span className="bullet">•</span> {item}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
