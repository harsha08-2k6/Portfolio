import { useRef } from 'react'

function MagneticButton({ children, className, href, onClick, ...props }) {
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    
    // Smooth magnetic follow effect
    buttonRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    buttonRef.current.style.transform = 'translate(0px, 0px)'
    
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transition = ''
      }
    }, 500)
  }

  const handleMouseEnter = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transition = 'transform 0.1s ease'
  }

  return (
    <a
      href={href || '#'}
      ref={buttonRef}
      className={className}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </a>
  )
}

export default function Contact({ navigateToSection, setShowStartProject, setShowDoc }) {
  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <div className="footer-headline-wrap">
          <h2 className="footer-headline">
            <div className="headline-line">READY TO TAKE YOUR</div>
            <div className="headline-line">
              IDEA TO{' '}
              <span className="magnetic-btn-container">
                <MagneticButton 
                  onClick={() => setShowStartProject(true)} 
                  className="btn-start-project"
                  data-cursor="expand"
                >
                  Start Project
                </MagneticButton>
              </span>
            </div>
            <div className="headline-line">
              THE NEXT LEVEL?
            </div>
          </h2>
        </div>

        {/* Divider */}
        <div className="projects-divider reveal-left" style={{ margin: '4rem 0' }}>
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Columns Grid Replaced with Image 2 & 3 Style */}
        <div className="contact-main-grid reveal-up">
          {/* Left Column: Status & Email Card */}
          <div className="contact-left-col">
            <div className="contact-status-block">
              <p>Open to full-stack collaborations, cybersecurity projects, and cinematic video commissions.</p>
            </div>
            
            <div className="contact-email-section">
              <span className="contact-section-label">EMAIL</span>
              <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="contact-email-card" data-cursor="expand">
                <span className="email-text">tsivaharshavardhanreddy08@gmail.com</span>
                <svg className="email-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Platforms List */}
          <div className="contact-right-col">
            <span className="contact-section-label">PLATFORMS</span>
            <div className="platforms-list">
              <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer" className="platform-item">
                <div className="platform-info">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span className="platform-username">@harsha08-2k6</span>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" target="_blank" rel="noreferrer" className="platform-item">
                <div className="platform-info">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span className="platform-username">siva-harsha-vardhan-reddy</span>
                </div>
              </a>

              <a href="https://www.instagram.com/_name_is_harsha_/" target="_blank" rel="noreferrer" className="platform-item">
                <div className="platform-info">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span className="platform-username">@_name_is_harsha_</span>
                </div>
              </a>

              <a href="https://x.com/harsha08_2k6" target="_blank" rel="noreferrer" className="platform-item">
                <div className="platform-info">
                  <svg className="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                  <span className="platform-username">@harsha08_2k6</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Social Icon Squares Row (Image 3) */}
        <div className="social-squares-row reveal-up">
          <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer" className="social-square-btn" data-cursor="expand">
            <svg className="social-square-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" target="_blank" rel="noreferrer" className="social-square-btn" data-cursor="expand">
            <svg className="social-square-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://www.instagram.com/_name_is_harsha_/" target="_blank" rel="noreferrer" className="social-square-btn" data-cursor="expand">
            <svg className="social-square-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="social-square-btn" data-cursor="expand">
            <svg className="social-square-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </a>
        </div>

        {/* Faded Bottom Divider */}
        <div className="projects-divider reveal-left footer-bottom-divider" style={{ margin: '3.5rem 0 1.5rem' }}>
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Bottom Metadata Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            @2026 Tamlampudi Siva Harsha Vardhan Reddy
          </div>
          <div className="footer-bottom-links">
            <a href="#404" onClick={e => { e.preventDefault(); setShowDoc('404'); }}>404</a>
            <a href="#privacy" onClick={e => { e.preventDefault(); setShowDoc('privacy'); }}>PRIVACY POLICY</a>
            <a href="#terms" onClick={e => { e.preventDefault(); setShowDoc('terms'); }}>TERM & CONDITION</a>
          </div>
        </div>
      </div>
    </section>
  )
}
