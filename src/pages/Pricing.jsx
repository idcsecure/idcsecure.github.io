import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Pricing.css'

const EASE = [0.16, 1, 0.3, 1]

const pricingPlans = [
  {
    id: 'essential-security',
    name: 'Essential Security Pack',
    price: 'Starting from ₹12,000',
    description: 'Ideal for small businesses and startups looking to identify common security weaknesses.',
    features: [
      'Web Application Vulnerability Assessment',
      'Website Security Audit',
      'Executive Summary',
      'Technical Findings',
      'Remediation Recommendations'
    ]
  },
  {
    id: 'web-security',
    name: 'Web Security Pack',
    price: 'Starting from ₹25,000',
    description: 'Designed for businesses that rely on web applications and APIs.',
    features: [
      'Web Application Penetration Test',
      'API Security Testing',
      'OWASP Top 10 Assessment',
      'Authentication & Authorization Testing',
      'Business Logic Testing',
      'Executive & Technical Reports',
      'Remediation Guidance'
    ]
  },
  {
    id: 'business-security',
    name: 'Business Security Pack',
    price: '₹30,000',
    description: 'A comprehensive assessment of your internal infrastructure and network security.',
    features: [
      'Network Penetration Test',
      'Internal & External Network Assessment',
      'Wi-Fi Security Assessment',
      'Firewall & Segmentation Review',
      'Privilege Escalation Testing',
      'Executive & Technical Reports'
    ]
  },
  {
    id: 'enterprise-security',
    name: 'Enterprise Security Pack',
    price: '₹50,000',
    description: 'A full security engagement covering your applications, infrastructure, and security posture.',
    features: [
      'Web Application Penetration Test',
      'Network Penetration Test',
      'Security Audit',
      'Cloud Configuration Review',
      'Security Consultation',
      'Executive & Technical Reports',
      'Remediation Recommendations',
      'Post-Assessment Review Session'
    ]
  }
]

const individualServices = [
  { name: 'Web Application Vulnerability Assessment', price: '₹8,000' },
  { name: 'API Security Testing', price: '₹12,000' },
  { name: 'Authentication & Authorization Testing', price: '₹6,000' },
  { name: 'Website Security Audit', price: '₹5,000' },
  { name: 'Network Vulnerability Assessment', price: '₹10,000' },
  { name: 'Network Penetration Test', price: '₹22,000' },
  { name: 'Cloud Security Assessment', price: '₹12,000' },
  { name: 'Security Audit', price: '₹8,000' },
  { name: 'Security Consultation', price: '₹2,500 / hour' },
  { name: 'Free Discovery Call', price: 'Free' }
]

export default function Pricing() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <div className="pricing-hero-bg">
          <img src="/pixelated globe.png" alt="" className="pricing-hero-globe" />
        </div>
        <div className="pricing-hero-content">
          <motion.h1
            className="pricing-hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Our Pricing
          </motion.h1>
          <motion.p
            className="pricing-hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Transparent pricing for comprehensive security assessments. Every engagement is tailored to your organization's needs.
          </motion.p>
        </div>
      </div>

      <div className="pricing-content">
        <p className="pricing-note">
          The prices listed are starting estimates. Final pricing is determined based on the scope of the engagement, the size and complexity of your environment, the number of assets or devices, and your specific security requirements.
        </p>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              id={plan.id}
              className="pricing-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: EASE }}
            >
              <div className="pricing-card-header">
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <p className="pricing-plan-description">{plan.description}</p>
                <p className="pricing-plan-price">{plan.price}</p>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature} className="pricing-feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="pricing-cta-btn" type="button">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="individual-services"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="individual-services-header">
            <h2 className="individual-services-title">Individual Services</h2>
            <p className="individual-services-subtitle">
              Need just one specific assessment? Choose individual services à la carte.
            </p>
          </div>
          <div className="individual-services-list">
            {individualServices.map((service, index) => (
              <motion.div
                key={service.name}
                className="individual-service-row"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              >
                <span className="individual-service-name">{service.name}</span>
                <span className="individual-service-price">{service.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="pricing-cta">
        <motion.div
          className="pricing-cta-inner"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="pricing-cta-title">Need a custom solution?</h2>
          <p className="pricing-cta-text">
            Contact us for a personalized quote tailored to your organization's specific requirements.
          </p>
          <button className="pricing-cta-btn" type="button">
            Request a Consultation
          </button>
        </motion.div>
      </div>
    </div>
  )
}