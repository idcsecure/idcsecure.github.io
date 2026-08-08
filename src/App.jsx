import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Instagram, Phone } from 'lucide-react'
import PricingPage from './pages/Pricing'
import ServicesPage from './pages/Services'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import './App.css'

const EASE = [0.16, 1, 0.3, 1]

function LogoIcon() {
  return (
    <img
      className="logo-icon"
      src="/idc_logo.png"
      alt="IDC Secure logo"
      width="50"
      height="28"
    />
  )
}

const serviceLinks = [
  { id: 'vulnerability-assessment', label: 'Vulnerability Assessment' },
  { id: 'pentesting', label: 'Pentesting' },
  { id: 'security-audit', label: 'Security Audit' },
  { id: 'security-consulting', label: 'Security Consulting' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="brand">
            <LogoIcon />
            <span className="brand-text">The Internet Defense Company</span>
          </div>
        </div>

        <div className="navbar-right">
          <nav className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>Home</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>About</Link>
            <div className="nav-dropdown">
              <button
                type="button"
                className={`nav-link nav-dropdown-toggle ${servicesOpen ? 'nav-dropdown-open' : ''} ${isActive('/services') ? 'nav-link-active' : ''}`}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {servicesOpen && (
                <div className="nav-dropdown-menu">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services#${service.id}`}
                      className="nav-dropdown-item"
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'nav-link-active' : ''}`}>Pricing</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}>Contact</Link>
          </nav>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  const navigate = useNavigate()

  const handleRequestAssessment = () => {
    navigate('/contact')
  }

  const handleViewServices = () => {
    navigate('/services')
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-subtitle"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}  >
        </motion.div>

        <motion.h1
          className="hero-heading"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          Helping Businesses
          <br />
          Find Vulnerabilities
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          Comprehensive security assessments and penetration testing to protect your web applications, networks, and infrastructure.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          <button className="btn-primary" type="button" onClick={handleRequestAssessment}>
            Request an Assessment
          </button>
          <button className="btn-secondary" type="button" onClick={handleViewServices}>
            View Services
          </button>
        </motion.div>

        <motion.p
          className="hero-industries"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
        >
          Working with SaaS, healthcare, finance, legal, and growing businesses
        </motion.p>
      </div>
      
    </section>
    
  )
}


function Services() {
  const services = [
    {
      id: 'vulnerability-assessment',
      icon: (
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4L4 10V16C4 22 16 28 16 28C16 28 28 22 28 16V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Vulnerability Assessment',
      price: 'From ₹8,000',
      description: 'Identify and evaluate security vulnerabilities across your systems, applications, and infrastructure to understand your risk exposure.'
    },
    {
      id: 'pentesting',
      icon: (
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 13V10M16 22V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Pentesting',
      price: 'From ₹18,000',
      description: 'Simulate real-world attacks to test your defenses and identify exploitable vulnerabilities before malicious actors do.'
    },
    {
      id: 'security-audit',
      icon: (
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 12H22M10 16H22M10 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="6" fill="#ffffff" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 21V24L25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Security Audit',
      price: 'From ₹8,000',
      description: 'Comprehensive review of your security posture, configurations, policies, and controls to ensure compliance and best practices.'
    },
    {
      id: 'security-consulting',
      icon: (
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
          <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 6V10M16 22V26M6 16H10M22 16H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Security Consulting',
      price: '₹1,500 / hour',
      freeCall: true,
      description: 'Expert guidance on security strategy, risk management, compliance requirements, and building a robust security program.'
    }
  ]

  return (
    <motion.section
      className="services-section"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
        >
          Our Core Services
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        >
          Structured assessments that uncover real business risk
        </motion.p>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ x: 120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: 'linear' }}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-price-row">
                <span className="service-price">{service.price}</span>
                {service.freeCall && (
                  <span className="service-free-tag">Free Initial Session</span>
                )}
              </div>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function About() {
  return (
    <motion.section
      className="about-section"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="section-container">
        <div className="about-content">
          <div className="about-text">
            <motion.h2
              className="section-title"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              Security Through Visibility
            </motion.h2>
            <motion.p
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              You can't secure what you can't see.
            </motion.p>
            <motion.p
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              IDC Secure helps organizations uncover vulnerabilities across web applications, networks, and IT environments through structured security assessments and penetration testing.
            </motion.p>
            <motion.p
              className="about-description"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            >
              Our reports prioritize real business risks with clear remediation guidance so organizations know exactly what to fix.
            </motion.p>
            <motion.div
              className="about-features"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Practical security assessments</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Business-focused reporting</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Clear remediation guidance</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Professional testing methodology</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Transparent communication</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Affordable services for all sizes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Initial Consultation', desc: 'Understand your security needs and objectives' },
    { num: '02', title: 'Scope Definition', desc: 'Define assessment boundaries and requirements' },
    { num: '03', title: 'Security Assessment', desc: 'Conduct comprehensive testing and analysis' },
    { num: '04', title: 'Analysis & Validation', desc: 'Validate findings and assess business impact' },
    { num: '05', title: 'Detailed Reporting', desc: 'Deliver comprehensive findings and recommendations' },
    { num: '06', title: 'Remediation Guidance', desc: 'Provide clear steps to address vulnerabilities' },
    { num: '07', title: 'Optional Retesting', desc: 'Verify fixes and ensure security improvements' },
  ]

  return (
    <motion.section
      className="process-section"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Our Process
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          A structured approach to security assessment
        </motion.p>

        <div className="process-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="process-card"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: EASE }}
            >
              <div className="process-number">{step.num}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function HomeCta() {
  const navigate = useNavigate()

  const handleExploreServices = () => {
    navigate('/services')
  }

  return (
    <motion.section
      className="home-cta"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="home-cta-inner">
        <h2 className="home-cta-title">Looking for something specific?</h2>
        <p className="home-cta-text">
          Explore our full range of cybersecurity services to find the right solution for your business.
        </p>
        <button className="home-cta-btn" type="button" onClick={handleExploreServices}>
          Explore Services
        </button>
      </div>
    </motion.section>
  )
}

function Contact() {
  return (
    <motion.section
      className="contact-section"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Ready to improve your security posture? Request a consultation today.
        </motion.p>

        <motion.form
          className="contact-form"
          onSubmit={(e) => e.preventDefault()}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Required</label>
            <select id="service" name="service" required>
              <option value="">Select a service</option>
              <option value="web-pentest">Web Application Penetration Testing</option>
              <option value="network-pentest">Network Penetration Testing</option>
              <option value="security-audit">Security Audit</option>
              <option value="consulting">Security Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>

          <button type="submit" className="btn-primary submit-btn">
            Request Consultation
          </button>
        </motion.form>
      </div>
    </motion.section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand-col">
          <div className="brand">
            <LogoIcon /><br /><br />
            <span className="brand-text footer-brand-text">The Internet Defense Company</span>
          </div>
          <p className="footer-tagline">
            Helping businesses find vulnerabilities.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/services" className="footer-link">Services</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <span className="footer-text">Web Application Pentesting</span>
          <span className="footer-text">Network Pentesting</span>
          <span className="footer-text">Security Audit</span>
          <span className="footer-text">Security Consulting</span>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Get In Touch</h4>
          <a href="mailto:business@idcsecure.com" className="footer-contact-link" aria-label="Email business@idcsecure.com">
            <Mail size={15} strokeWidth={2} className="footer-contact-icon" />
            <span>business@idcsecure.com</span>
          </a>
          <a
            href="https://instagram.com/idcsecure"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
            aria-label="Instagram idcsecure"
          >
            <Instagram size={15} strokeWidth={2} className="footer-contact-icon" />
            <span>idcsecure</span>
          </a>
          <a href="tel:+917736907547" className="footer-contact-link" aria-label="Call +91 7736907547">
            <Phone size={15} strokeWidth={2} className="footer-contact-icon" />
            <span>+91 7736907547</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 The Internet Defense Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait for the target page to render before scrolling to the section.
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <div className="content-sections">
              <Services />
              <Process />
            </div>
            <HomeCta />
          </>
        } />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}