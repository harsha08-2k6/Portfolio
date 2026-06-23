import { useRef, useState, useEffect } from 'react'

function VideoCard({ videoUrl }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Synchronize state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const handleMouseEnter = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.muted = isMuted
      videoRef.current.play()
        .catch(err => {
          console.log("Play failed, retrying muted:", err)
          // Fallback to muted if play fails (e.g., browser autoplay restrictions)
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play().catch(e => console.log("Muted autoplay failed:", e))
        })
    }
  }

  const handleMouseLeave = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <div 
      className="video-box"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-wrapper">
        <video
          ref={videoRef}
          src={videoUrl}
          loop
          playsInline
          className="demo-video"
          preload="metadata"
        />


        {/* Volume Button (only show when video is playing/hovered) */}
        {isPlaying && (
          <button 
            className="video-volume-btn" 
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            data-cursor="expand"
          >
            {isMuted ? (
              // Muted Icon
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="16" 
                width="16" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              // Unmuted Icon
              <svg 
                stroke="currentColor" 
                fill="none" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                height="16" 
                width="16" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default function Demos() {
  const videoDemos = [
    {
      id: 1,
      videoUrl: "/video1.mp4"
    },
    {
      id: 2,
      videoUrl: "/video2.mp4"
    },
    {
      id: 3,
      videoUrl: "/video3.mp4"
    }
  ]

  return (
    <section className="demos" id="demos">
      <div className="section-inner">
        <div className="projects-header-grid">
          <div className="projects-header-left slash-reveal reveal-left">
            <span className="slash-prefix">//</span>
            <span className="reveal-text-wrap">
              <span className="reveal-text-content">Creative Side</span>
            </span>
          </div>
          <div className="projects-header-right reveal-up">
            <h2>Beyond Development</h2>
          </div>
        </div>

        <div className="projects-divider reveal-left">
          &lt;/
          <span className="projects-divider-line" />
          &gt;
        </div>

        <div className="videos-grid-3col">
          {videoDemos.map(demo => (
            <VideoCard 
              key={demo.id}
              videoUrl={demo.videoUrl}
            />
          ))}
        </div>

        <div className="demos-more-btn-wrap reveal-left">
          <a 
            href="https://www.instagram.com/_name_is_harsha_/reels/" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-more-videos"
          >
            More Videos ↗
          </a>
        </div>
      </div>
    </section>
  )
}
