import { useState, useEffect } from 'react'

export default function StartProject({ setShowStartProject, navigateToSection }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })
  const [toast, setToast] = useState(null)
  const [showToastClass, setShowToastClass] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setShowToastClass(true)
    }, 10)
    
    // Auto dismiss after 4 seconds
    const timer = setTimeout(() => {
      setShowToastClass(false)
      setTimeout(() => {
        setToast(null)
      }, 400)
    }, 4000)

    return () => clearTimeout(timer)
  }

  const closeToast = () => {
    setShowToastClass(false)
    setTimeout(() => {
      setToast(null)
    }, 400)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.description) {
      triggerToast('Please fill in all fields.', 'error')
      return
    }

    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData })
    })
    .then(() => {
      triggerToast(`Thank you ${formData.name}! Your message has been sent. I will get back to you soon.`, 'success')
      setFormData({ name: '', email: '', description: '' })
    })
    .catch((error) => {
      console.error(error)
      triggerToast('Something went wrong. Please try again.', 'error')
    })
  }

  return (
    <div className="start-project-page">
      <div className="section-inner">
        {/* Breadcrumbs */}
        <div className="details-breadcrumbs" style={{ marginBottom: '3rem' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); navigateToSection('hero'); }}>// Home</a>
          <span>//</span>
          <span style={{ color: 'var(--white)' }}>Get In Touch</span>
        </div>

        {/* Grid Layout */}
        <div className="start-project-grid">
          {/* Left Column */}
          <div className="start-project-left">
            <div className="projects-header-left slash-reveal reveal-left visible" style={{ marginBottom: '1.2rem' }}>
              <span className="slash-prefix">//</span>
              <span className="reveal-text-wrap">
                <span className="reveal-text-content">Get In Touch</span>
              </span>
            </div>
            <h1 className="start-project-title">LET'S CONNECT &amp;<br />COLLABORATE</h1>
            <p className="start-project-desc">
              Have a project in mind? Let's make it happen! Drop us a message, and we'll connect with you soon.
            </p>

            {/* Social Links Inline */}
            <div className="start-project-socials">
              <a href="https://x.com/harsha08_2k6" target="_blank" rel="noreferrer" className="soc-link">
                <span className="soc-slash">/</span> Twitter (X)
              </a>
              <a href="https://www.linkedin.com/in/siva-harsha-vardhan-reddy/" target="_blank" rel="noreferrer" className="soc-link">
                <span className="soc-slash">/</span> LinkedIn
              </a>
              <a href="https://github.com/harsha08-2k6" target="_blank" rel="noreferrer" className="soc-link">
                <span className="soc-slash">/</span> GitHub
              </a>
            </div>

            {/* Icon Links */}
            <div className="start-project-links">
              <a href="https://calendly.com" target="_blank" rel="noreferrer" className="start-project-link-item">
                <svg 
                  stroke="currentColor" 
                  fill="none" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  height="20" 
                  width="20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M12 14l2 2 4-4"></path>
                </svg>
                Book a Meeting
              </a>

              <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="start-project-link-item">
                <svg 
                  stroke="currentColor" 
                  fill="none" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  height="20" 
                  width="20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                tsivaharshavardhanreddy08@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="start-project-right">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit} 
              className="start-project-form"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="form-group">
                <label>Name<span>*</span></label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email<span>*</span></label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email address" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Description<span>*</span></label>
                <textarea 
                  name="description"
                  placeholder="Write your project details" 
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-send-message">
                Send Your Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`custom-toast ${toast.type} ${showToastClass ? 'reveal-toast' : ''}`}>
          <div className="toast-content">
            {toast.type === 'success' ? (
              <svg className="toast-icon success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : toast.type === 'error' ? (
              <svg className="toast-icon error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            ) : (
              <svg className="toast-icon info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            )}
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={closeToast}>×</button>
        </div>
      )}
    </div>
  )
}
