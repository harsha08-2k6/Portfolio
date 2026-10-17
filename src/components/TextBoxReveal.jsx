import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './TextBoxReveal.css'

/**
 * TextBoxReveal (inspired by @skiper-ui/skiper70)
 * Word-by-word reveal animation with custom color palette highlights.
 * Designed to animate on hero mount without requiring scroll.
 */
export default function TextBoxReveal({
  text = '',
  highlights = [],
  delay = 0.35,
  stagger = 0.045,
  className = '',
  shouldAnimate = true
}) {
  // Parse text into tokens (words and highlight phrases with attached punctuation)
  const tokens = useMemo(() => {
    if (!text) return []

    if (!highlights.length) {
      return text.split(/\s+/).filter(Boolean).map(w => ({ text: w, isHighlight: false }))
    }

    // Sort highlights by length descending to match longest phrase first
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)
    const escaped = sortedHighlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    
    // Match highlight phrase along with any immediately following punctuation
    const regex = new RegExp(`(${escaped.join('|')})([,\\.;:!?]*)`, 'gi')

    const result = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      // Process text before the match
      const preMatch = text.slice(lastIndex, match.index)
      if (preMatch) {
        const words = preMatch.split(/\s+/).filter(Boolean)
        words.forEach(w => {
          result.push({ text: w, isHighlight: false })
        })
      }

      // Add the matched highlight token with its trailing punctuation
      const highlightMatched = match[1]
      const trailingPunct = match[2] || ''

      result.push({
        text: highlightMatched,
        isHighlight: true,
        punct: trailingPunct
      })

      lastIndex = regex.lastIndex
    }

    // Process any remaining text after the last match
    const remaining = text.slice(lastIndex)
    if (remaining) {
      const words = remaining.split(/\s+/).filter(Boolean)
      words.forEach(w => {
        result.push({ text: w, isHighlight: false })
      })
    }

    return result
  }, [text, highlights])

  return (
    <p className={`text-box-reveal-container ${className}`}>
      {tokens.map((token, index) => {
        const itemDelay = delay + index * stagger

        if (token.isHighlight) {
          return (
            <motion.span
              key={`${token.text}-${index}`}
              className="text-box-reveal-highlight-wrap"
              initial={{ 
                opacity: 0.15, 
                y: 5
              }}
              animate={shouldAnimate ? { 
                opacity: 1, 
                y: 0
              } : {
                opacity: 0.15,
                y: 5
              }}
              transition={{
                duration: 0.4,
                delay: shouldAnimate ? itemDelay : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <span className="text-box-reveal-highlight">
                {token.text}
              </span>
              {token.punct && (
                <span className="text-box-reveal-punct">{token.punct}</span>
              )}
            </motion.span>
          )
        }

        return (
          <motion.span
            key={`${token.text}-${index}`}
            className="text-box-reveal-word text-box-reveal-normal"
            initial={{ 
              opacity: 0.15, 
              y: 5
            }}
            animate={shouldAnimate ? { 
              opacity: 1, 
              y: 0
            } : {
              opacity: 0.15,
              y: 5
            }}
            transition={{
              duration: 0.4,
              delay: shouldAnimate ? itemDelay : 0,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {token.text}
          </motion.span>
        )
      })}
    </p>
  )
}
