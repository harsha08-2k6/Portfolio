import { useState, useEffect } from 'react'

export default function NotFound({ onClose }) {
  const [errorMode, setErrorMode] = useState('404') // '404', 'no-respond', 'offline'
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Auto-detect internet connection status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setErrorMode('404') // Revert to 404 if online
    }
    const handleOffline = () => {
      setIsOnline(false)
      setErrorMode('offline') // Set to offline if disconnected
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial check
    if (!navigator.onLine) {
      setErrorMode('offline')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    // Simulate reconnection check
    if (errorMode === 'offline' && navigator.onLine) {
      setIsOnline(true)
      setErrorMode('404')
    } else if (errorMode === 'no-respond') {
      // Simulate reload response
      setErrorMode('404')
    }
  }

  return (
    <section className="error-page-container">
      {/* Simulation Bar at top */}
      <div className="error-sim-bar">
        <span className="sim-label">TEST DESIGNS:</span>
        <button 
          className={`sim-btn ${errorMode === '404' ? 'active' : ''}`}
          onClick={() => setErrorMode('404')}
        >
          404 Page
        </button>
        <button 
          className={`sim-btn ${errorMode === 'no-respond' ? 'active' : ''}`}
          onClick={() => setErrorMode('no-respond')}
        >
          Not Responding
        </button>
        <button 
          className={`sim-btn ${errorMode === 'offline' ? 'active' : ''}`}
          onClick={() => setErrorMode('offline')}
        >
          No Internet (Offline)
        </button>
      </div>

      <div className="error-content-inner">
        {/* Animated Background Grid lines */}
        <div className="error-bg-lines" />
        
        {/* Glow effect */}
        <div className="error-glow" />

        {errorMode === '404' && (
          <div className="error-view reveal-up visible">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">LOST IN CYBERSPACE</h2>
            <p className="error-desc">
              The page you are looking for has drifted into deep space. It might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button className="error-btn-primary" onClick={onClose}>
              GO BACK HOME
            </button>
          </div>
        )}

        {errorMode === 'no-respond' && (
          <div className="error-view reveal-up visible">
            <h1 className="error-code text-error-red">504</h1>
            <h2 className="error-title">SIGNAL LOST</h2>
            <p className="error-desc">
              The server is not responding to our signals. The motherboard might be offline or undergoing updates. Please try again.
            </p>
            <div className="error-btn-group">
              <button className="error-btn-primary" onClick={handleRetry}>
                RETRY CONNECTION
              </button>
              <button className="error-btn-secondary" onClick={onClose}>
                RETURN HOME
              </button>
            </div>
          </div>
        )}

        {errorMode === 'offline' && (
          <div className="error-view reveal-up visible">
            <div className="offline-icon-wrap">
              <svg className="offline-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.5M5 12.5a10.94 10.94 0 015.83-2.84M8.53 16.03a6 6 0 017 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="error-code text-error-orange">OFFLINE</h1>
            <h2 className="error-title">NO CONNECTION</h2>
            <p className="error-desc">
              Your device is currently disconnected from the grid. Check your Wi-Fi router, cellular connection, or ethernet cable to return online.
            </p>
            <button className="error-btn-primary" onClick={handleRetry}>
              CHECK CONNECTION
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
