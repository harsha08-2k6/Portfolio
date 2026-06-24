import { useState } from 'react'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="wa-float-container">
      {/* Main white toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="wa-toggle-btn"
        aria-label="Toggle floating menu"
      >
        {!isOpen ? (
          <svg 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            height="18" 
            width="18" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        ) : (
          <svg 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            height="18" 
            width="18" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </button>

      {/* Vertical list of items */}
      <div className={`wa-menu-items ${isOpen ? 'open' : ''}`}>
        {/* WhatsApp Option */}
        <a 
          href="https://wa.me/919658466999" 
          target="_blank" 
          rel="noreferrer" 
          className="wa-menu-item wa-whatsapp"
        >
          <span className="wa-item-text">Get connected with us</span>
          <svg 
            className="wa-icon" 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 448 512" 
            height="16" 
            width="16" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.2 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
          </svg>
        </a>

        {/* GitHub Option */}
        <a 
          href="https://github.com/harsha08-2k6/Portfolio" 
          target="_blank" 
          rel="noreferrer"
          className="wa-menu-item wa-github"
        >
          <span className="wa-item-text">GitHub Repository For This Template</span>
          <svg 
            className="wa-icon" 
            stroke="currentColor" 
            fill="currentColor" 
            strokeWidth="0" 
            viewBox="0 0 496 512" 
            height="16" 
            width="16" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.7c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.2 58 27.2 70 22 2.3-16 8.7-27.2 15.8-33.5-54.6-6.2-111-27.2-111-120.4 0-26.6 9.4-48.4 25-65.5-2.5-6.2-10.8-31.2 2.5-64.8 0 0 20.3-6.5 66.8 25 19.3-5.3 40.1-8 60.8-8 20.7 0 41.5 2.7 60.8 8 46.6-31.4 66.8-25 66.8-25 13.3 33.6 5 58.7 2.5 64.8 15.6 17.1 25 38.9 25 65.5 0 93.3-56.9 114-111.4 120.4 8.7 7.5 16.3 22.1 16.3 44.5 0 32.1-.3 80.7-.3 90.2 0 6.6 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5.7 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-.7zm-14.7-10c-.3 1.3.7 3.5 2.9 4.8 2.3 1 4.6.3 4.9-1 .3-1.3-.7-3.5-2.9-4.8-2.2-1-4.6-.3-4.9 1z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
