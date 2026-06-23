import { useState, useEffect } from 'react'

export default function Navbar({ navigateToSection }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown if user clicks outside of the navbar menu container
  useEffect(() => {
    if (!open) return
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.navbar-menu-container')) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [open])

  const handleNavClick = (id) => {
    navigateToSection(id)
    setOpen(false)
  }

  return (
    <nav style={{ background: 'transparent', backdropFilter: 'none', borderBottom: 'none' }}>
      <a href="#hero" className="logo" onClick={e => { e.preventDefault(); handleNavClick('hero') }}>.SHVR</a>
      
      <div className="navbar-menu-container">
        <div className={`custom-menu-card ${open ? 'open' : ''}`}>
          <button className="menu-card-header" onClick={() => setOpen(!open)}>
            <span className="menu-text">Menu</span>
            {!open ? (
              <span className="menu-icon-brackets">&lt;&gt;</span>
            ) : (
              <span className="menu-icon-arrows">↕</span>
            )}
          </button>
          
          <div className="dropdown-items-wrap">
            <div className="dropdown-items">
              <a href="#about" className="dropdown-item" onClick={e => { e.preventDefault(); handleNavClick('about') }}>About</a>
              <a href="#projects" className="dropdown-item" onClick={e => { e.preventDefault(); handleNavClick('projects') }}>Project</a>
              <a href="#demos" className="dropdown-item" onClick={e => { e.preventDefault(); handleNavClick('demos') }}>Interests</a>
              <a href="#contact" className="dropdown-item" onClick={e => { e.preventDefault(); handleNavClick('contact') }}>Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
