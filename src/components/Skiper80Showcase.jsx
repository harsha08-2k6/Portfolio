import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'
import { urlFor } from '../client'
import './Skiper80Showcase.css'

export default function Skiper80Showcase({ 
  projects = [], 
  onSelect,
  maxItems = null
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isHoveredList, setIsHoveredList] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [overlayProject, setOverlayProject] = useState(null)
  const listRef = useRef(null)

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Spring physics for buttery floating card movement
  const springConfig = { damping: 22, stiffness: 180, mass: 0.55 }
  const cardX = useSpring(mouseX, springConfig)
  const cardY = useSpring(mouseY, springConfig)

  const displayedProjects = maxItems ? projects.slice(0, maxItems) : projects

  const handleMouseMove = (e) => {
    if (isDragging) return // Don't snap back to cursor while user is dragging
    // Offset card to the right and slightly above cursor so it doesn't obstruct the text
    const offsetX = 28
    const offsetY = -110

    // Prevent floating card from extending off right or bottom viewport edge
    const clampedX = Math.min(e.clientX + offsetX, window.innerWidth - 340)
    const clampedY = Math.max(20, Math.min(e.clientY + offsetY, window.innerHeight - 240))

    mouseX.set(clampedX)
    mouseY.set(clampedY)
  }

  const activeProject = hoveredIndex !== null ? displayedProjects[hoveredIndex] : null

  const getProjectImage = (project) => {
    if (!project) return null
    if (project.image?.asset) return urlFor(project.image).url()
    return typeof project.image === 'string' ? project.image : null
  }

  // Handle ESC key to close overlay modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOverlayProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="skiper80-container">
      {/* Interactive Skiper80 List View */}
      <div 
        className="skiper80-list"
        ref={listRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveredList(true)}
        onMouseLeave={() => {
          if (!isDragging) {
            setIsHoveredList(false)
            setHoveredIndex(null)
          }
        }}
      >
        {displayedProjects.map((project, idx) => {
          const tags = project.tags || project.tech || []
          const indexStr = String(idx + 1).padStart(2, '0')
          const isRowHovered = hoveredIndex === idx

          return (
            <motion.div
              key={project._id || project.id || idx}
              className={`skiper80-item ${isRowHovered ? 'active-hover' : ''}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => {
                if (onSelect) {
                  onSelect(project._id || project.id)
                } else {
                  setOverlayProject(project)
                }
              }}
              data-cursor="expand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              {/* Index number */}
              <div className="skiper80-index">
                //{indexStr}
              </div>

              {/* Title & Tagline */}
              <div className="skiper80-title-col">
                <h3 className="skiper80-title">{project.title}</h3>
                <p className="skiper80-tagline">
                  {project.tagline || project.client || 'Featured Architecture & Development'}
                </p>
              </div>

              {/* Description & Tech Tags */}
              <div className="skiper80-info-col">
                <p className="skiper80-desc">
                  {project.description || project.overview || ''}
                </p>
                <div className="skiper80-tags">
                  {tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="skiper80-tag">
                      {tag}
                    </span>
                  ))}
                  {tags.length > 4 && (
                    <span className="skiper80-tag">+{tags.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Action arrow button */}
              <div className="skiper80-action-col">
                <div className="skiper80-action-circle">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Floating Draggable Preview Card */}
        <AnimatePresence>
          {isHoveredList && activeProject && (
            <motion.div
              className="skiper80-floating-card"
              drag
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileDrag={{ scale: 1.05, rotate: 2, cursor: 'grabbing' }}
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                left: cardX,
                top: cardY,
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (!isDragging && activeProject) {
                  if (onSelect) {
                    onSelect(activeProject._id || activeProject.id)
                  } else {
                    setOverlayProject(activeProject)
                  }
                }
              }}
            >
              {/* Floating Card Header (clean macOS window dots only) */}
              <div className="skiper80-floating-header">
                <div className="skiper80-floating-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              {/* Floating Card Body */}
              <div className="skiper80-floating-body">
                {getProjectImage(activeProject) ? (
                  <img 
                    src={getProjectImage(activeProject)} 
                    alt={activeProject.title} 
                    className="skiper80-floating-img" 
                    draggable={false}
                  />
                ) : (
                  <div className="skiper80-fallback-art">
                    {activeProject.title ? activeProject.title.substring(0, 2).toUpperCase() : 'PR'}
                  </div>
                )}

                {/* Floating Footer Info */}
                <div className="skiper80-floating-footer">
                  <span className="skiper80-floating-title">{activeProject.title}</span>
                  <span className="skiper80-floating-hint">
                    Click to explore <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gallery to Overlay Transition Modal */}
      <AnimatePresence>
        {overlayProject && (
          <motion.div
            className="skiper80-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOverlayProject(null)}
          >
            <motion.div
              className="skiper80-overlay-modal"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button" 
                className="skiper80-overlay-close"
                onClick={() => setOverlayProject(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="skiper80-overlay-media">
                {getProjectImage(overlayProject) ? (
                  <img src={getProjectImage(overlayProject)} alt={overlayProject.title} />
                ) : (
                  <div className="skiper80-fallback-art">
                    {overlayProject.title ? overlayProject.title.substring(0, 2).toUpperCase() : 'PR'}
                  </div>
                )}
              </div>

              <div className="skiper80-overlay-content">
                <div className="skiper80-overlay-header">
                  <span style={{ color: 'var(--mint)', fontFamily: 'Space Mono', fontSize: '0.85rem' }}>
                    // PROJECT DETAILS
                  </span>
                  <h2 className="skiper80-overlay-title">{overlayProject.title}</h2>
                  <p style={{ color: 'var(--w50)', fontSize: '1rem' }}>
                    {overlayProject.tagline || overlayProject.client || ''}
                  </p>
                </div>

                <div className="skiper80-overlay-meta">
                  <div className="skiper80-meta-item">
                    <span className="skiper80-meta-label">Client</span>
                    <span className="skiper80-meta-val">{overlayProject.client || 'Internal / Personal'}</span>
                  </div>
                  <div className="skiper80-meta-item">
                    <span className="skiper80-meta-label">Timeline</span>
                    <span className="skiper80-meta-val">{overlayProject.timeline || 'Completed'}</span>
                  </div>
                  <div className="skiper80-meta-item">
                    <span className="skiper80-meta-label">Industry</span>
                    <span className="skiper80-meta-val">{overlayProject.industry || 'Tech / Web'}</span>
                  </div>
                </div>

                <p className="skiper80-overlay-body">
                  {overlayProject.overview || overlayProject.description || 'Comprehensive architecture with performant frontend interactions and robust backend integration.'}
                </p>

                <div className="skiper80-tags">
                  {(overlayProject.tags || overlayProject.tech || []).map((t) => (
                    <span key={t} className="skiper80-tag">{t}</span>
                  ))}
                </div>

                <div className="skiper80-overlay-actions">
                  <button
                    type="button"
                    className="skiper80-btn-primary"
                    onClick={() => {
                      const id = overlayProject._id || overlayProject.id
                      setOverlayProject(null)
                      if (onSelect) onSelect(id)
                    }}
                  >
                    <span>View Full Case Study</span>
                    <ArrowUpRight size={18} />
                  </button>

                  {overlayProject.link && (
                    <a
                      href={overlayProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skiper80-btn-secondary"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
