import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      const shouldExpand = !!e.target.closest('[data-cursor="expand"]')
      cursorRef.current?.setAttribute('data-state', shouldExpand ? 'image' : '')
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="cursor" ref={cursorRef}>
      <span className="cursor-arrow">↗</span>
    </div>
  )
}
