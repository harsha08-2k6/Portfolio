import { useState, useEffect } from 'react'
import heroImg from '../assets/hero.png'

export default function Hero() {
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
  }, [currentText, isDeleting, roleIndex, typingSpeed])

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
            <img src={heroImg} alt="Harsha" className="hero-photo" />
            <div className="badge badge-tl"><span>Full Stack Developer</span></div>
            <div className="badge badge-br"><span>Cybersecurity</span></div>
            <div className="badge badge-tr"><span className="badge-dot" /><span>Available for work</span></div>
            <div className="badge badge-bl"><span>Editor</span></div>
          </div>
        </div>

        {/* RIGHT: desc */}
        <div className="hero-right">
          <div className="hero-right-top">
            <p className="hero-desc">
              I craft secure, scalable, and user-friendly applications with expertise in{' '}
              <span className="hl">Cybersecurity</span>,{' '}
              <span className="hl">Open Source</span>, and{' '}
              <span className="hl">Cloud Computing</span>.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom-left: meta */}
      <div className="hero-corner hero-corner-left">
        <div className="hero-meta">
          <div className="meta-row">
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="meta-val">
              tsivaharshavardhanreddy08@gmail.com
            </a>
          </div>
          <div className="meta-row">
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.6 3.6 1 1 0 01-.25 1z"/></svg>
            <span className="meta-val">+91 96584 66999</span>
          </div>
        </div>
      </div>

      {/* Bottom-right: socials */}
      <div className="hero-corner hero-corner-right">
        <div className="hero-socials">
          <a href="https://x.com/harsha08_2k6" target="_blank" rel="noreferrer" className="soc-link"><span className="soc-slash">/</span> Twitter (X)</a>
          <a href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" target="_blank" rel="noreferrer" className="soc-link"><span className="soc-slash">/</span> LinkedIn</a>
          <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer" className="soc-link"><span className="soc-slash">/</span> GitHub</a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
