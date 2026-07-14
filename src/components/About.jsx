import { useEffect, useRef, useState } from 'react'

const skills = [
  { title: 'Frontend', tags: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Server-side development', tags: ['Node.js', 'Express.js', 'MongoDB'] },
  { title: 'Editing', tags: ['CapCut', 'DaVinci Resolve', 'Picsart', 'Adobe Photoshop'] },
  { title: 'Tools', tags: ['Git', 'Github', 'AWS', 'Docker'] },
]

const stats = [
  { num: 241, suffix: '+', lbl: 'Github Contributions' },
  { num: 10, suffix: '+', lbl: 'Completed Projects' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const steps = 40
        const increment = target / steps
        const interval = duration / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(current))
          }
        }, interval)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <section className="about" id="about">
      {/* Marquee strip */}
      <div className="marquee-strip">
        <div className="marquee-track">
          <div className="marquee-group">
            {Array(20).fill(null).map((_, i) => (
              <span key={i} className="marquee-item">SHVR <span className="marquee-dot">·</span></span>
            ))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {Array(20).fill(null).map((_, i) => (
              <span key={i} className="marquee-item">SHVR <span className="marquee-dot">·</span></span>
            ))}
          </div>
        </div>
      </div>
      <div className="section-inner">
        <div className="about-grid">

          {/* LEFT: Skills */}
          <div className="about-left">
            <div className="skills-header slash-reveal reveal-left">
              <span className="slash-prefix">//</span>
              <span className="reveal-text-wrap">
                <span className="reveal-text-content">Skills</span>
              </span>
            </div>
            <div className="skills-list">
              {skills.map((g, i) => (
                <div className="skill-row" key={g.title}>
                  <div className="skill-row-top">
                    <span className="skill-title">{g.title}</span>
                    <span className="skill-code-icon">&lt;/&gt;</span>
                  </div>
                  <div className="skill-tags">
                    {g.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
                  </div>
                  {i < skills.length - 1 && <div className="skill-divider" />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Bio + Resume */}
          <div className="about-right">
            <p className="about-desc">
              I thrive on solving real-world problems, turning ideas into clean, maintainable code,
              and learning through experimentation. You'll find me building side projects, diving into
              new tech stacks, or simply exploring what's next in the world of web development.
            </p>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-resume">My Resume <span aria-hidden="true">↗</span></a>
          </div>

        </div>

        <div className="stats-row">
          {stats.map(s => (
            <div className="stat-box" key={s.lbl}>
              <div className="stat-num"><CountUp target={s.num} suffix={s.suffix} /></div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
