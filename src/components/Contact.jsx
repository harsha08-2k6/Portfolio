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

        {/* Columns Grid */}
        <div className="footer-columns-grid reveal-up">
          {/* Column 1: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick links</h3>
            <ul className="footer-col-list">
              <li>
                <a href="#hero" onClick={e => { e.preventDefault(); navigateToSection('hero') }}>
                  HOME
                </a>
              </li>
              <li>
                <a href="#about" onClick={e => { e.preventDefault(); navigateToSection('about') }}>
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#projects" onClick={e => { e.preventDefault(); navigateToSection('projects') }}>
                  WORKS
                </a>
              </li>
              <li>
                <a href="#demos" onClick={e => { e.preventDefault(); navigateToSection('demos') }}>
                  INTERESTS
                </a>
              </li>
              <li>
                <a href="#contact" onClick={e => { e.preventDefault(); navigateToSection('contact') }}>
                  CONTACT
                </a>
              </li>
            </ul>

            <div className="footer-contact-info">
              <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="footer-email">
                tsivaharshavardhanreddy08@gmail.com
              </a>
              <span className="footer-phone">+91 96584 66999</span>
            </div>
          </div>

          {/* Column 2: Portfolio Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Portfolio</h3>
            <ul className="footer-col-list">
              <li>
                <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer">
                  GITHUB
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Social Link</h3>
            <ul className="footer-col-list">
              <li>
                <a href="https://www.instagram.com/_name_is_harsha_/" target="_blank" rel="noreferrer">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" target="_blank" rel="noreferrer">
                  LINKEDIN
                </a>
              </li>
              <li>
                <a href="https://x.com/harsha08_2k6" target="_blank" rel="noreferrer">
                  TWITTER "X"
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Faded Bottom Divider */}
        <div className="projects-divider reveal-left footer-bottom-divider" style={{ margin: '3.5rem 0 1.5rem' }}>
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        {/* Bottom Metadata Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-links">
            <a href="#404" onClick={e => e.preventDefault()}>404</a>
            <a href="#privacy" onClick={e => { e.preventDefault(); setShowDoc('privacy'); }}>PRIVACY POLICY</a>
            <a href="#terms" onClick={e => { e.preventDefault(); setShowDoc('terms'); }}>TERM & CONDITION</a>
          </div>
        </div>
      </div>
    </section>
  )
}
