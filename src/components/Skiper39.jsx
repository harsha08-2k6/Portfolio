import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import './Skiper39.css'

export function CrowdCanvas({
  src = '/images/peeps/all-peeps.png',
  rows = 15,
  cols = 7,
  className = '',
  peepCount = 28
}) {
  const canvasRef = useRef(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = {
      src,
      rows,
      cols,
    }

    // UTILS
    const randomRange = (min, max) => min + Math.random() * (max - min)
    const randomIndex = (array) => randomRange(0, array.length) | 0
    const removeFromArray = (array, i) => array.splice(i, 1)[0]
    const removeItemFromArray = (array, item) =>
      removeFromArray(array, array.indexOf(item))
    const removeRandomFromArray = (array) =>
      removeFromArray(array, randomIndex(array))
    const getRandomFromArray = (array) => array[randomIndex(array) | 0]

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1
      // Skew random to lower values to keep characters grounded nicely
      const offsetY = 70 - 180 * gsap.parseEase('power2.in')(Math.random())
      const startY = stage.height - peep.height + offsetY
      let startX
      let endX

      if (direction === 1) {
        startX = -peep.width - 20
        endX = stage.width + 20
        peep.scaleX = 1
      } else {
        startX = stage.width + peep.width + 20
        endX = -20
        peep.scaleX = -1
      }

      peep.x = startX
      peep.y = startY
      peep.anchorY = startY

      return {
        startX,
        startY,
        endX,
      }
    }

    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props
      const xDuration = randomRange(8, 14)
      const yDuration = randomRange(0.2, 0.3)

      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.7, 1.4))
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: 'none',
        },
        0
      )
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: startY - 9,
          ease: 'power1.inOut'
        },
        0
      )

      return tl
    }

    const walks = [normalWalk]

    // FACTORY FUNCTIONS
    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (r) => {
          peep.rect = r
          peep.width = r[2]
          peep.height = r[3]
          peep.drawArgs = [peep.image, ...r, 0, 0, peep.width, peep.height]
        },
        render: (c) => {
          c.save()
          c.translate(peep.x, peep.y)
          c.scale(peep.scaleX, 1)
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          )
          c.restore()
        },
      }

      peep.setRect(rect)
      return peep
    }

    // MAIN STATE
    const img = new Image()
    const stage = {
      width: 0,
      height: 0,
    }

    const allPeeps = []
    const availablePeeps = []
    const crowd = []

    const createPeeps = () => {
      const { rows: r, cols: c } = config
      const { naturalWidth: width, naturalHeight: height } = img
      const total = r * c
      const rectWidth = width / r
      const rectHeight = height / c

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % r) * rectWidth,
              ((i / r) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        )
      }
    }

    const addPeepToCrowd = () => {
      if (!availablePeeps.length || !isMountedRef.current) return null
      const peep = removeRandomFromArray(availablePeeps)
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback('onComplete', () => {
        if (!isMountedRef.current) return
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })

      peep.walk = walk

      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)

      return peep
    }

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep)
      availablePeeps.push(peep)
    }

    const initCrowd = () => {
      const count = Math.min(peepCount, availablePeeps.length)
      for (let i = 0; i < count; i++) {
        const p = addPeepToCrowd()
        if (p && p.walk) {
          p.walk.progress(Math.random())
        }
      }
    }

    const render = () => {
      if (!canvas || !isMountedRef.current) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      const dpr = window.devicePixelRatio || 1
      ctx.scale(dpr, dpr)

      for (let i = 0; i < crowd.length; i++) {
        crowd[i].render(ctx)
      }

      ctx.restore()
    }

    const resize = () => {
      if (!canvas || !isMountedRef.current) return
      const rect = canvas.getBoundingClientRect()
      stage.width = rect.width
      stage.height = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = stage.width * dpr
      canvas.height = stage.height * dpr

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })

      crowd.length = 0
      availablePeeps.length = 0
      availablePeeps.push(...allPeeps)

      initCrowd()
    }

    const init = () => {
      if (!isMountedRef.current) return
      createPeeps()
      resize()
      gsap.ticker.add(render)
    }

    img.onload = init
    img.src = config.src

    const handleResize = () => {
      resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isMountedRef.current = false
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(render)
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill()
      })
    }
  }, [src, rows, cols, peepCount])

  return (
    <canvas
      ref={canvasRef}
      className={`skiper39-canvas ${className}`}
      aria-label="Interactive crowd animation canvas"
    />
  )
}

export default function Skiper39({
  src = '/images/peeps/all-peeps.png',
  className = ''
}) {
  return (
    <div className={`skiper39-container ${className}`}>
      {/* Canvas Layer */}
      <div className="skiper39-canvas-wrap">
        <CrowdCanvas src={src} rows={15} cols={7} />
      </div>
    </div>
  )
}
