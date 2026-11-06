import { useState, useEffect } from 'react'
import heroPng from '../assets/hero.png'
import heroWebp from '../assets/hero.webp'
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
              <source srcSet={heroWebp} type="image/webp" />
              <img 
                src={heroPng} 
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
            <a 
              href="mailto:tsivaharshavardhanreddy08@gmail.com" 
              className="meta-email-link"
              aria-label="Send email to tsivaharshavardhanreddy08@gmail.com"
            >
              <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <span className="meta-val">tsivaharshavardhanreddy08@gmail.com</span>
            </a>
          </div>

          <div className="hero-socials hero-socials-left">
            <a 
              href="https://github.com/harsha08-2k6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
              aria-label="GitHub Profile"
            >
              <svg className="soc-icon" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
              aria-label="LinkedIn Profile"
            >
              <svg className="soc-icon" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://x.com/harsha08_2k6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="soc-link"
              aria-label="X (Twitter) Profile"
            >
              <svg className="soc-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X</span>
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
