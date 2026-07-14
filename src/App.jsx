import { useState } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalArsenal from './components/TechnicalArsenal'
import Projects from './components/Projects'
import Demos from './components/Demos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetails from './components/ProjectDetails'
import AllProjects from './components/AllProjects'
import StartProject from './components/StartProject'
import InfoDocument from './components/InfoDocument'
import useScrollReveal from './hooks/useScrollReveal'
import WhatsAppFloat from './components/WhatsAppFloat'
import NotFound from './components/NotFound'

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showStartProject, setShowStartProject] = useState(false)
  const [showDoc, setShowDoc] = useState(null)
  useScrollReveal()

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
      <Cursor />
      <WhatsAppFloat />
      <Navbar navigateToSection={navigateToSection} />
      
      {showDoc !== null ? (
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
          <Hero />
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
    </>
  )
}
