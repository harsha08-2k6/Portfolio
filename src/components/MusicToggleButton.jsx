import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './MusicToggleButton.css'

/**
 * Skiper25 - Music Toggle Button (@skiper-ui/skiper25)
 * Plays the uploaded song (/song.mp3) with real-time animated waveform equalizer bars.
 * Displays clear helper text near the button for easy user understanding.
 * Ends when the song completes or when user closes the website.
 */
export default function MusicToggleButton({ audioSrc = '/song.mp3' }) {
  const bars = 5
  const getRandomHeights = () => Array.from({ length: bars }, () => Math.random() * 0.85 + 0.15)

  const [isPlaying, setIsPlaying] = useState(false)
  const [heights, setHeights] = useState(Array(bars).fill(0.18))
  
  const audioRef = useRef(null)

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // Lazy instantiate audio instance
  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(audioSrc)
      audio.preload = 'none'

      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setHeights(Array(bars).fill(0.18))
      })

      const handleBeforeUnload = () => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
        }
      }
      window.addEventListener('beforeunload', handleBeforeUnload)

      audioRef.current = audio
    }
    return audioRef.current
  }

  // Real-time animated waveform equalizer loop when playing
  useEffect(() => {
    let intervalId = null
    if (isPlaying) {
      intervalId = setInterval(() => {
        setHeights(getRandomHeights())
      }, 100)
    } else {
      setHeights(Array(bars).fill(0.18))
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying])

  // Toggle playback
  const toggleSound = () => {
    const audio = getAudio()
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.log('Audio playback prevented or failed:', err)
        })
    }
  }

  return (
    <div 
      className={`skiper25-wrap ${isPlaying ? 'playing' : ''}`}
      onClick={toggleSound}
      title={isPlaying ? 'Click to pause soundtrack' : 'Click to play soundtrack'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleSound() }}
      aria-label="Toggle soundtrack"
    >
      {/* 36px Circular Equalizer Button */}
      <motion.div
        className="skiper25-btn"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
      >
        <div className="skiper25-waveform">
          {heights.map((height, index) => (
            <motion.div
              key={index}
              className="skiper25-bar"
              initial={{ height: 3 }}
              animate={{
                height: Math.max(2.5, height * 13),
              }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 12,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Helper text near the button for easy understanding */}
      <span className="skiper25-helper-text">
        <span className="skiper25-helper-prefix">//</span>
        <span>{isPlaying ? 'Playing track' : 'Play soundtrack'}</span>
      </span>
    </div>
  )
}
