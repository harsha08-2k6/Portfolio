import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

// Navigation options ordered strictly as per the webpage sections
const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'arsenal', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'demos', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ navigateToSection, isSubpage = false, subpageActiveSection = null }) {
  const [scrollVisible, setScrollVisible] = useState(false)
  const [scrollActiveSection, setScrollActiveSection] = useState('about')
  const [clickedSection, setClickedSection] = useState(null)

  // Derived state to avoid setState inside effects
  const isVisible = isSubpage ? true : scrollVisible
  const activeSection = clickedSection || (isSubpage && subpageActiveSection ? subpageActiveSection : scrollActiveSection)

  useEffect(() => {
    // If on a subpage, don't run scroll detection
    if (isSubpage) return

    let isTicking = false

    const handleScroll = () => {
      if (isTicking) return
      isTicking = true

      requestAnimationFrame(() => {
        // Reset clicked override once user resumes natural scrolling
        setClickedSection(null)

        // 1. Hero visibility detection
        const hero = document.getElementById('hero')
        if (hero) {
          const heroRect = hero.getBoundingClientRect()
          // Navbar appears once user scrolls past hero
          setScrollVisible(heroRect.bottom <= 150)
        } else {
          setScrollVisible(true)
        }

        // 2. Bottom of page check (activate Contact)
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120
        if (isAtBottom) {
          setScrollActiveSection('contact')
          isTicking = false
          return
        }

        // 3. Scroll spy in exact DOM order of page sections
        const sectionMap = [
          { elId: 'about', navId: 'about' },
          { elId: 'arsenal', navId: 'arsenal' },
          { elId: 'projects', navId: 'projects' },
          { elId: 'github-stats', navId: 'projects' },
          { elId: 'demos', navId: 'demos' },
          { elId: 'contact', navId: 'contact' },
        ]

        let currentActive = null
        for (const section of sectionMap) {
          const el = document.getElementById(section.elId)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 240) {
              currentActive = section.navId
            }
          }
        }

        if (currentActive) {
          setScrollActiveSection(currentActive)
        }

        isTicking = false
      })
    }

    // Initial check on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSubpage])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setClickedSection(id)
    if (navigateToSection) {
      navigateToSection(id)
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    setClickedSection(null)
    if (navigateToSection) {
      navigateToSection('hero')
    }
  }

  return (
    <>
      {/* Permanent brand logo at top-left */}
      <div className="nav-logo-wrapper">
        <a 
          href="#hero" 
          className="logo" 
          onClick={handleLogoClick}
          aria-label="Back to top (.SHVR)"
        >
          .SHVR
        </a>
      </div>

      {/* Floating pill navbar appearing on remaining pages/sections */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="floating-navbar-wrapper"
            aria-label="Main Navigation"
            initial={{ y: -24, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -20, opacity: 0, x: '-50%' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="floating-navbar">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Smooth gliding pill highlight */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="active-pill-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="nav-label-wrap">
                      {item.label}

                      {/* Smooth gliding underline accent */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavUnderline"
                          className="active-nav-underline"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
