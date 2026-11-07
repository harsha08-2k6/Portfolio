import { useState, useEffect, useRef } from 'react'

export default function NotFound({ onClose, initialMode = '404' }) {
  const [errorMode, setErrorMode] = useState(initialMode)
  const [connectionStatus, setConnectionStatus] = useState('offline') // 'offline' | 'checking' | 'restored' | 'still-offline'
  const [isChecking, setIsChecking] = useState(false)

  const isRestoringRef = useRef(false)
  const restoreTimeoutRef = useRef(null)
  const feedbackTimeoutRef = useRef(null)

  // Auto-detect internet connection status using browser events
  useEffect(() => {
    const handleOnline = () => {
      if (errorMode === 'offline') {
        if (isRestoringRef.current) return
        isRestoringRef.current = true
        setConnectionStatus('restored')

        restoreTimeoutRef.current = setTimeout(() => {
          if (onClose) onClose()
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }, 1100)
      } else {
        setErrorMode('404')
      }
    }

    const handleOffline = () => {
      if (isRestoringRef.current) return
      setConnectionStatus('offline')
      setErrorMode('offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial check
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setErrorMode('offline')
      setConnectionStatus('offline')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (restoreTimeoutRef.current) clearTimeout(restoreTimeoutRef.current)
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
    }
  }, [errorMode, onClose])

  // Handle retry connection check
  const handleRetry = async () => {
    if (isRestoringRef.current || isChecking) return

    setIsChecking(true)
    setConnectionStatus('checking')

    let isConnected = typeof navigator !== 'undefined' ? navigator.onLine : false

    if (isConnected) {
      try {
        // Fast probe to verify network round-trip without external APIs
        await fetch('/favicon.ico?_chk=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
        isConnected = true
      } catch {
        isConnected = typeof navigator !== 'undefined' ? navigator.onLine : false
      }
    }

    // Brief smooth delay to provide clear visual feedback
    setTimeout(() => {
      setIsChecking(false)

      if (isConnected) {
        if (isRestoringRef.current) return
        isRestoringRef.current = true
        setConnectionStatus('restored')

        restoreTimeoutRef.current = setTimeout(() => {
          if (onClose) onClose()
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }, 1100)
      } else {
        setConnectionStatus('still-offline')
        feedbackTimeoutRef.current = setTimeout(() => {
          setConnectionStatus('offline')
        }, 2200)
      }
    }, 700)
  }

  // Handle Return to Home if navigation is possible
  const canNavigateHome = Boolean(onClose) || (typeof window !== 'undefined' && (window.history.length > 1 || window.location.pathname !== '/'))

  const handleReturnHome = () => {
    if (onClose) {
      onClose()
    } else if (typeof window !== 'undefined') {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = '/'
      }
    }
  }

  const isDevMode = typeof window !== 'undefined' && window.location.search.includes('dev=true')

  return (
    <section className="error-page-container" aria-label="Error page">
      {/* Simulation Bar for developer testing */}
      {isDevMode && (
        <div className="error-sim-bar">
          <span className="sim-label">TEST DESIGNS:</span>
          <button 
            className={`sim-btn ${errorMode === '404' ? 'active' : ''}`}
            onClick={() => {
              setErrorMode('404')
              isRestoringRef.current = false
            }}
          >
            404 Page
          </button>
          <button 
            className={`sim-btn ${errorMode === 'no-respond' ? 'active' : ''}`}
            onClick={() => {
              setErrorMode('no-respond')
              isRestoringRef.current = false
            }}
          >
            Not Responding
          </button>
          <button 
            className={`sim-btn ${errorMode === 'offline' ? 'active' : ''}`}
            onClick={() => {
              setErrorMode('offline')
              setConnectionStatus('offline')
              isRestoringRef.current = false
            }}
          >
            Offline Mode
          </button>
        </div>
      )}

      <div className="error-content-inner">
        {/* Subtle Background Grid lines */}
        <div className="error-bg-lines" />
        
        {/* Glow effect */}
        <div className="error-glow" />

        {/* 404 View */}
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

        {/* 504 / Signal Lost View */}
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

        {/* Redesigned Premium Offline View */}
        {errorMode === 'offline' && (
          <div className="offline-card-wrapper reveal-up visible">
            {/* Subtle Status Pill Indicator */}
            <div className={`offline-status-pill ${connectionStatus}`}>
              <span className="offline-status-dot" />
              <span className="offline-status-text">
                {connectionStatus === 'restored'
                  ? 'Connection Restored'
                  : connectionStatus === 'checking'
                  ? 'Checking Connection...'
                  : connectionStatus === 'still-offline'
                  ? 'Still Offline • Please Check Network'
                  : 'No Internet Connection'}
              </span>
            </div>

            {/* Subtle animated connection-status icon with orange glow */}
            <div className={`offline-icon-box ${connectionStatus}`}>
              <div className="offline-icon-glow" />
              {connectionStatus === 'restored' ? (
                <svg
                  className="offline-status-svg success-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                </svg>
              ) : (
                <svg
                  className="offline-status-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                  <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
                </svg>
              )}
            </div>

            {/* Clean Elegant Heading */}
            <h1 className="offline-heading">You're Currently Offline</h1>

            {/* Short Description */}
            <p className="offline-description">
              It looks like your internet connection has been interrupted. Please check your network and try again.
            </p>

            {/* Action Buttons */}
            <div className="offline-actions-group">
              <button
                className={`offline-btn-primary ${connectionStatus}`}
                onClick={handleRetry}
                disabled={isChecking || connectionStatus === 'restored'}
                aria-label="Retry Connection"
              >
                {connectionStatus === 'checking' ? (
                  <>
                    <span className="offline-spinner" />
                    <span>Checking...</span>
                  </>
                ) : connectionStatus === 'restored' ? (
                  <>
                    <svg
                      className="btn-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Restored • Reloading</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="btn-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
                    </svg>
                    <span>Retry Connection</span>
                  </>
                )}
              </button>

              {canNavigateHome && (
                <button
                  className="offline-btn-secondary"
                  onClick={handleReturnHome}
                  aria-label="Return to Home"
                >
                  <svg
                    className="btn-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Return to Home</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
