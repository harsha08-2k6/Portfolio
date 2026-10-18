import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observerOptions = {
      root: null,
      rootMargin: '150px 0px',
      threshold: 0.01
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target
          const parent = target.parentElement
          const idx = parent ? Array.from(parent.children).indexOf(target) : 0
          const delay = (target.classList.contains('proj-card') || target.classList.contains('proj-card-new')) ? idx * 120 : 0
          
          if (delay > 0) {
            setTimeout(() => {
              target.classList.add('visible')
            }, delay)
          } else {
            target.classList.add('visible')
          }
          
          revealObserver.unobserve(target)
        }
      })
    }, observerOptions)

    let scheduledRaf = null

    const observeElements = () => {
      // Ensure target elements have reveal base class
      const revealTargets = document.querySelectorAll(
        '.hero-left:not(.reveal), .hero-right:not(.reveal), .skills-grid:not(.reveal), .proj-card:not(.reveal), .proj-card-new:not(.reveal), .contact-left:not(.reveal), .contact-right:not(.reveal)'
      )
      revealTargets.forEach(el => {
        el.classList.add('reveal')
      })

      // Register all unobserved elements with IntersectionObserver
      // This completely avoids getBoundingClientRect() and eliminates forced reflows!
      const unobservedEls = document.querySelectorAll(
        '.reveal:not(.visible):not([data-observed]), .reveal-left:not(.visible):not([data-observed]), .reveal-up:not(.visible):not([data-observed])'
      )
      
      unobservedEls.forEach(el => {
        el.setAttribute('data-observed', 'true')
        revealObserver.observe(el)
      })
    }

    // Initial pass
    observeElements()

    // Debounce mutation observations via requestAnimationFrame to avoid layout thrashing
    const mutationObserver = new MutationObserver(() => {
      if (!scheduledRaf) {
        scheduledRaf = requestAnimationFrame(() => {
          observeElements()
          scheduledRaf = null
        })
      }
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      if (scheduledRaf) cancelAnimationFrame(scheduledRaf)
      revealObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
