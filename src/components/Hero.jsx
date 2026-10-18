import { useState, useEffect } from 'react'
import TextBoxReveal from './TextBoxReveal'
import MusicToggleButton from './MusicToggleButton'

export default function Hero({ isReady = true }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(80)

  const roles = [
    "Full Stack Developer",
    "Video Editor",
    "Cybersecurity Enthusiast"
  ]

  useEffect(() => {
    if (!isReady) return

    const fullText = roles[roleIndex]

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText((prev) => {
          const next = fullText.substring(0, prev.length + 1)
          if (next === fullText) {
            setIsDeleting(true)
            setTypingSpeed(2000) // Pause at the end of the word
          } else {
            setTypingSpeed(80)
          }
          return next
        })
      } else {
        // Deleting
        setCurrentText((prev) => {
          const next = fullText.substring(0, prev.length - 1)
          if (next === '') {
            setIsDeleting(false)
            setRoleIndex((prevIdx) => (prevIdx + 1) % roles.length)
            setTypingSpeed(500) // Pause before starting the next word
          } else {
            setTypingSpeed(30)
          }
          return next
        })
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, roleIndex, typingSpeed, isReady])

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">

        {/* LEFT: greeting + name + headline */}
        <div className="hero-left">
          <div className="hero-left-top">
            <div className="hero-greeting">
              <span className="greeting-text">Hey,</span>
            </div>
            <h1 className="hero-headline">
              <span className="gradient-text">I'm a</span>
              <br />
              <span className="typed-text">{currentText}</span>
              <span className="typed-cursor">|</span>
            </h1>
            <div className="hero-name">Siva Harsha Vardhan Reddy</div>
          </div>
        </div>

        {/* CENTER: image */}
        <div className="hero-center">
          <div className="photo-wrap">
            <div className="photo-glow" />
            <picture>
              <source srcSet="/hero.webp" type="image/webp" />
              <img 
                src="/hero.png" 
                alt="Harsha" 
                className="hero-photo" 
                width="502" 
                height="497" 
                fetchPriority="high" 
                decoding="async" 
              />
            </picture>
            <div className="badge badge-tl"><span>Full Stack Developer</span></div>
            <div className="badge badge-br"><span>Cybersecurity</span></div>
            <div className="badge badge-tr"><span className="badge-dot" /><span>Available for work</span></div>
            <div className="badge badge-bl"><span>Editor</span></div>
          </div>
        </div>

        {/* RIGHT: desc */}
        <div className="hero-right">
          <div className="hero-right-top">
            <TextBoxReveal
              key={isReady ? 'ready' : 'idle'}
              text="I craft secure, scalable, and user-friendly applications with expertise in Cybersecurity, Open Source, and Cloud Computing."
              highlights={["Cybersecurity", "Open Source", "Cloud Computing"]}
              delay={0.45}
              stagger={0.045}
              className="hero-desc"
              shouldAnimate={isReady}
            />
          </div>
        </div>

      </div>

      {/* Bottom-left: Email + Socials */}
      <div className="hero-corner hero-corner-left">
        <div className="hero-meta">
          <div className="meta-row">
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            <a 
              href="mailto:tsivaharshavardhanreddy08@gmail.com" 
              className="meta-val"
            >
              tsivaharshavardhanreddy08@gmail.com
            </a>
          </div>

          <div className="hero-socials hero-socials-left">
            <a 
              href="https://x.com/harsha08_2k6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
            >
              <span className="soc-slash">/</span> Twitter (X)
            </a>
            <a 
              href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
            >
              <span className="soc-slash">/</span> LinkedIn
            </a>
            <a 
              href="https://github.com/harsha08-2k6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
            >
              <span className="soc-slash">/</span> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Middle-down: Skiper25 Music / Sound Waveform Toggle */}
      <div className="hero-center-bottom">
        <MusicToggleButton />
      </div>
    </section>
  )
}
