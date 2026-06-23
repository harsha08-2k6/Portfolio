import { useEffect } from 'react'

export default function InfoDocument({ type, onClose }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [type])

  const isPrivacy = type === 'privacy'

  return (
    <div className="project-details-page info-document-page">
      <div className="section-inner">
        <div className="project-details-container">
          
          {/* Breadcrumbs / Back button */}
          <div className="details-breadcrumbs">
            <a href="#home" onClick={(e) => { e.preventDefault(); onClose(); }}>// Home</a>
            <span>//</span>
            <span style={{ color: 'var(--white)' }}>
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </span>
          </div>

          <div className="details-hero-grid" style={{ marginBottom: '3rem' }}>
            <div className="details-hero-left">
              <h1 className="details-hero-title">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h1>
              <p className="details-hero-tagline" style={{ color: 'var(--mint)' }}>
                Last Updated: June 2026
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="projects-divider reveal-left visible" style={{ margin: '0 0 4rem' }}>
            &lt;/
            <span className="projects-divider-line" style={{ maxWidth: '100%' }} />
            &gt;
          </div>

          <div className="details-sections-grid">
            <div className="details-sections-left" style={{ width: '100%', maxWidth: 'none' }}>
              {isPrivacy ? (
                // PRIVACY POLICY CONTENT
                <>
                  <div className="details-section">
                    <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--w80)', marginBottom: '2.5rem' }}>
                      Welcome to my portfolio website. Your privacy is important to me. This policy details what information is collected and how it is used.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>Information I Collect</h2>
                    <p>This website may collect:</p>
                    <ul className="info-doc-list">
                      <li>
                        <strong>Voluntary Information:</strong> Information you voluntarily provide through contact forms, such as your name, email address, and message.
                      </li>
                      <li>
                        <strong>Analytics Data:</strong> Basic usage and telemetry data, including browser type, device information, pages visited, and time spent on the website.
                      </li>
                    </ul>
                  </div>

                  <div className="details-section">
                    <h2>How I Use Your Information</h2>
                    <p>Any information collected is used solely to:</p>
                    <ul className="info-doc-list">
                      <li>Respond to your inquiries, questions, and project messages.</li>
                      <li>Improve and optimize the website user experience.</li>
                      <li>Monitor website performance, traffic, and security.</li>
                    </ul>
                  </div>

                  <div className="details-section">
                    <h2>Data Sharing</h2>
                    <p>
                      I respect your privacy. I do not sell, trade, rent, or lease your personal identification information to third parties.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>Third-Party Services</h2>
                    <p>
                      This website contains links to external platforms such as GitHub, LinkedIn, X (Twitter), Instagram, or other websites. I am not responsible for the content or privacy practices of these third-party services.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>Data Security</h2>
                    <p>
                      Reasonable technical and organizational security measures are taken to protect your data. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>Contact</h2>
                    <p>
                      If you have any questions regarding this Privacy Policy, please reach out via email at:
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                      <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="info-doc-link">
                        tsivaharshavardhanreddy08@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                // TERMS & CONDITIONS CONTENT
                <>
                  <div className="details-section">
                    <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--w80)', marginBottom: '2.5rem' }}>
                      Welcome to the portfolio website of Siva Harsha Vardhan Reddy. By accessing and using this website, you agree to comply with the following terms and conditions.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>1. Use of Website</h2>
                    <p>
                      This website is intended to showcase my projects, skills, achievements, and creative work. You may browse and use the content for personal and informational purposes only.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>2. Intellectual Property</h2>
                    <p>
                      Unless otherwise stated, all content on this website, including text, images, graphics, videos, designs, and project descriptions, is the property of Siva Harsha Vardhan Reddy and is protected by applicable copyright laws.
                    </p>
                    <p>
                      You may not copy, reproduce, distribute, modify, or republish any content without prior permission.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>3. Project Information</h2>
                    <p>
                      Projects and work samples displayed on this website are provided for demonstration and portfolio purposes. While every effort is made to keep information accurate and up to date, no guarantee is made regarding completeness or accuracy.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>4. External Links</h2>
                    <p>
                      This website may contain links to third-party websites such as GitHub, LinkedIn, or other platforms. I am not responsible for the content, privacy policies, or practices of any external websites.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>5. User Conduct</h2>
                    <p>You agree not to:</p>
                    <ul className="info-doc-list">
                      <li>Attempt to gain unauthorized access to the website or its services.</li>
                      <li>Use the website for unlawful purposes.</li>
                      <li>Interfere with the functionality or security of the website.</li>
                    </ul>
                  </div>

                  <div className="details-section">
                    <h2>6. Disclaimer</h2>
                    <p>
                      All content is provided on an "as is" basis without warranties of any kind, whether express or implied. The website owner does not guarantee uninterrupted availability or error-free operation.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>7. Limitation of Liability</h2>
                    <p>
                      Under no circumstances shall Siva Harsha Vardhan Reddy be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>8. Changes to These Terms</h2>
                    <p>
                      These Terms & Conditions may be updated at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the updated terms.
                    </p>
                  </div>

                  <div className="details-section">
                    <h2>9. Contact Information</h2>
                    <p>For any questions regarding these Terms & Conditions, please contact:</p>
                    <p style={{ marginTop: '1rem' }}>
                      <a href="mailto:tsivaharshavardhanreddy08@gmail.com" className="info-doc-link">
                        Email: tsivaharshavardhanreddy08@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
            <button className="btn-resume" onClick={onClose}>
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
