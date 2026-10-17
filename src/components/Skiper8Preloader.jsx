import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Skiper8Preloader.css'

/**
 * Skiper8 Words Preloader (inspired by @skiper-ui/skiper8 & Dennis Snellenberg)
 * Full-screen loading transition that cycles through multilingual greetings
 * with cyber-mint typography and an elastic SVG curved-path slideUp exit.
 */
const DEFAULT_WORDS = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten Tag',
  'Namaste',
  'Welcome'
]

export default function Skiper8Preloader({
  words = DEFAULT_WORDS,
  onComplete
}) {
  const [index, setIndex] = useState(0)
  const [dimension, setDimension] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  const hasExitedRef = useRef(false)

  // Track window viewport dimensions for SVG curve math
  useEffect(() => {
    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Safe exit trigger
  const triggerExit = () => {
    if (hasExitedRef.current) return
    hasExitedRef.current = true
    if (onComplete) {
      onComplete()
    }
  }

  // Allow user to instantly skip via keyboard (Escape, Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        triggerExit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Word cycling sequence: ~3 seconds total
  useEffect(() => {
    if (index === words.length - 1) {
      // Hold on the final greeting, then trigger exit
      const exitTimer = setTimeout(() => {
        triggerExit()
      }, 700)
      return () => clearTimeout(exitTimer)
    }

    // First word stays slightly longer, remaining words pulse steadily
    const delay = index === 0 ? 900 : 200
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [index, words.length])

  // SVG curved path coordinates:
  // Starts with an elastic belly hanging 300px below the viewport,
  // and snaps flat to the bottom edge as it slides up.
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const slideUp = {
    initial: {
      y: 0
    },
    animate: {
      y: 0
    },
    exit: {
      y: '-100%',
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.15
      }
    }
  }

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    animate: {
      d: initialPath
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.18
      }
    }
  }

  const contentFade = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -25,
      transition: {
        duration: 0.25,
        ease: 'easeIn'
      }
    }
  }

  return (
    <motion.aside
      aria-label="Site preloader"
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="skiper8-preloader"
      onClick={triggerExit}
      title="Click to enter portfolio"
    >
      {dimension.width > 0 && (
        <>
          {/* Subtle Cyber Glow Backdrop */}
          <div className="skiper8-backdrop-glow" />

          {/* Center Stage: Word Cycling */}
          <motion.div
            variants={contentFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className="skiper8-center"
          >
            <p className="skiper8-word">
              {words[index]}
            </p>
          </motion.div>

          {/* Morphing Elastic SVG Curve Curtain */}
          <svg className="skiper8-curve">
            <motion.path
              d={initialPath}
              variants={curveVariants}
              initial="initial"
              exit="exit"
            />
          </svg>
        </>
      )}
    </motion.aside>
  )
}
