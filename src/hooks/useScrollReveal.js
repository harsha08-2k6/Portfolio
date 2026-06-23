import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.hero-left, .hero-right, .skills-grid, .proj-card, .contact-left, .contact-right'
    )
    els.forEach(el => el.classList.add('reveal'))

    const allEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-up')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)
          const delay = entry.target.classList.contains('proj-card') ? idx * 120 : 0
          setTimeout(() => entry.target.classList.add('visible'), delay)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    allEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
