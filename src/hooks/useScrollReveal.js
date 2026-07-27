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
          
          setTimeout(() => {
            target.classList.add('visible')
          }, delay)
          
          revealObserver.unobserve(target)
        }
      })
    }, observerOptions)

    const observeElements = () => {
      const revealTargets = document.querySelectorAll(
        '.hero-left, .hero-right, .skills-grid, .proj-card, .proj-card-new, .contact-left, .contact-right'
      )
      revealTargets.forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal')
        }
      })

      const allEls = document.querySelectorAll(
        '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-up:not(.visible)'
      )
      
      allEls.forEach(el => {
        const rect = el.getBoundingClientRect()
        // If element is already in or above the viewport trigger margin, reveal it instantly
        const hasEnteredViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight) + 150
        
        if (hasEnteredViewport) {
          el.classList.add('visible')
        } else {
          revealObserver.observe(el)
        }
      })
    }

    observeElements()

    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      revealObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}

