import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalArsenal from './components/TechnicalArsenal'
import Projects from './components/Projects'
import Demos from './components/Demos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'
import WhatsAppFloat from './components/WhatsAppFloat'
import Skiper8Preloader from './components/Skiper8Preloader'

const ProjectDetails = lazy(() => import('./components/ProjectDetails'))
const AllProjects = lazy(() => import('./components/AllProjects'))
const StartProject = lazy(() => import('./components/StartProject'))
const InfoDocument = lazy(() => import('./components/InfoDocument'))
const NotFound = lazy(() => import('./components/NotFound'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showStartProject, setShowStartProject] = useState(false)
  const [showDoc, setShowDoc] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  useScrollReveal()

  // Lock scrolling during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const navigateToSection = (id) => {
    setActiveProjectId(null)
    setShowAllProjects(false)
    setShowStartProject(false)
    setShowDoc(null)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 50)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Skiper8Preloader
            key="skiper8-preloader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <Cursor />
      <WhatsAppFloat />
      <Navbar navigateToSection={navigateToSection} />
      
      <main id="main-content">
        <Suspense fallback={null}>
          {!isOnline ? (
            <NotFound initialMode="offline" onClose={() => setIsOnline(true)} />
          ) : showDoc !== null ? (
            showDoc === '404' ? (
              <NotFound onClose={() => setShowDoc(null)} />
            ) : (
              <>
                <InfoDocument 
                  type={showDoc} 
                  onClose={() => setShowDoc(null)} 
                />
                <Footer />
              </>
            )
          ) : activeProjectId !== null ? (
            <>
              <ProjectDetails 
                projectId={activeProjectId} 
                setActiveProjectId={setActiveProjectId}
                navigateToSection={navigateToSection}
                showAllProjects={showAllProjects}
              />
              <Footer />
            </>
          ) : showAllProjects ? (
            <>
              <AllProjects 
                setActiveProjectId={setActiveProjectId} 
                setShowAllProjects={setShowAllProjects}
                navigateToSection={navigateToSection}
              />
              <Footer />
            </>
          ) : showStartProject ? (
            <>
              <StartProject 
                setShowStartProject={setShowStartProject}
                navigateToSection={navigateToSection}
              />
              <Footer />
            </>
          ) : (
            <>
              <Hero isReady={!isLoading} />
              <About />
              <TechnicalArsenal />
              <Projects 
                setActiveProjectId={setActiveProjectId} 
                setShowAllProjects={setShowAllProjects}
              />
              <Demos />
              <Contact 
                navigateToSection={navigateToSection} 
                setShowStartProject={setShowStartProject}
                setShowDoc={setShowDoc}
              />
            </>
          )}
        </Suspense>
      </main>
    </>
  )
}
