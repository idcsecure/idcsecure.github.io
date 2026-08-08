import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import './Services.css'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

function useEncryptionAnimation(text, startDelay = 0, duration = 1.5) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === ' ') {
                return ' '
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )

        if (iteration >= text.length) {
          clearInterval(interval)
          setIsComplete(true)
        }

        iteration += 1 / 3
      }, 30)

      return () => clearInterval(interval)
    }, startDelay * 1000)

    return () => clearTimeout(timeout)
  }, [text, startDelay, duration])

  return { displayed, isComplete }
}

function EncryptedText({ text, startDelay = 0, duration = 1.5, className }) {
  const { displayed, isComplete } = useEncryptionAnimation(text, startDelay, duration)

  return (
    <span className={className}>
      {displayed}
      {!isComplete && <span className="encryption-cursor">|</span>}
    </span>
  )
}

const EASE = [0.16, 1, 0.3, 1]

const services = [
  {
    id: 'vulnerability-assessment',
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L4 10V16C4 22 16 28 16 28C16 28 28 22 28 16V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Vulnerability Assessment',
    description: 'Identify weaknesses before attackers do.',
    items: [
      {
        title: 'Web Application Assessment',
        description: 'Comprehensive scanning and testing of web applications to identify security vulnerabilities, misconfigurations, and potential entry points for attackers.'
      },
      {
        title: 'Internal Network Assessment',
        description: 'Evaluate your internal network infrastructure for vulnerabilities, weak configurations, and potential lateral movement paths.'
      },
      {
        title: 'External Network Assessment',
        description: 'Assess externally-facing systems and services to identify exposed vulnerabilities and potential attack vectors from the internet.'
      },
      {
        title: 'Wireless Network Assessment',
        description: 'Test wireless network security including encryption strength, access controls, and potential unauthorized access points.'
      },
      {
        title: 'Cloud Configuration Review',
        description: 'Review cloud infrastructure configurations for security best practices, misconfigurations, and compliance gaps.'
      },
      {
        title: 'Server & Infrastructure Assessment',
        description: 'Evaluate server hardening, patch levels, service configurations, and overall infrastructure security posture.'
      }
    ]
  },
  {
    id: 'pentesting',
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 13V10M16 22V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Penetration Testing',
    description: 'Simulate real-world attacks to validate your security.',
    items: [
      {
        title: 'Web Application Penetration Testing',
        description: 'Hands-on testing to exploit vulnerabilities in web applications and validate security controls.',
        subItems: [
          'Authentication & Authorization',
          'Business Logic Testing',
          'API Testing',
          'OWASP Top 10',
          'File Upload & Injection Testing'
        ]
      },
      {
        title: 'Network Penetration Testing',
        description: 'Simulated attacks on network infrastructure to identify and exploit security weaknesses.',
        subItems: [
          'Internal Network Pentest',
          'External Network Pentest',
          'Active Directory Assessment',
          'Firewall & Segmentation Review',
          'Privilege Escalation'
        ]
      }
    ]
  },
  {
    id: 'security-audit',
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 12H22M10 16H22M10 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="6" fill="#0a0a0a" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 21V24L25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Security Audits',
    description: 'Review your environment against security best practices.',
    items: [
      {
        title: 'Website Security Audit',
        description: 'Comprehensive review of website security including SSL/TLS configuration, headers, and application security.'
      },
      {
        title: 'Network Security Audit',
        description: 'Evaluate network security controls, segmentation, firewall rules, and overall network hardening.'
      },
      {
        title: 'Wi-Fi Security Audit',
        description: 'Assess wireless network security including encryption, authentication, and access point configurations.'
      },
      {
        title: 'Cloud Security Audit',
        description: 'Review cloud service configurations, identity management, and security controls across cloud platforms.'
      },
      {
        title: 'Configuration Review',
        description: 'Detailed examination of system and application configurations against security best practices.'
      },
      {
        title: 'Security Policy Review',
        description: 'Evaluate existing security policies, procedures, and documentation for completeness and effectiveness.'
      },
      {
        title: 'User & Access Review',
        description: 'Audit user accounts, permissions, access controls, and identity management practices.'
      }
    ]
  },
  {
    id: 'security-consulting',
    num: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 6V10M16 22V26M6 16H10M22 16H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Security Consultation',
    description: 'Expert guidance for building a stronger security posture.',
    items: [
      {
        title: 'Security Roadmap',
        description: 'Develop a comprehensive security strategy and roadmap aligned with your business objectives.'
      },
      {
        title: 'Architecture Review',
        description: 'Evaluate and improve your security architecture to ensure robust protection across all layers.'
      },
      {
        title: 'Compliance Guidance',
        description: 'Navigate compliance requirements and implement frameworks to meet industry standards.'
      },
      {
        title: 'Incident Response Planning',
        description: 'Create and refine incident response plans to effectively handle security breaches and minimize impact.'
      },
      {
        title: 'Secure Deployment Advice',
        description: 'Guidance on secure software development lifecycle and secure deployment practices.'
      },
      {
        title: 'Security Awareness Guidance',
        description: 'Develop training programs and awareness initiatives to build a security-conscious culture.'
      }
    ]
  }
]

export default function Services() {
  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-bg">
          <img src="/pixelated globe.png" alt="" className="services-hero-globe" />
        </div>
        <div className="services-hero-content">
          <motion.div
            className="services-hero-badge"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
          </motion.div>
          <motion.h1
            className="services-hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <EncryptedText text="Security" startDelay={0.3} duration={1} />
            {' '}
            <EncryptedText text="Delivered" startDelay={1.3} duration={1} />
          </motion.h1>
          <motion.p
            className="services-hero-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Real-world testing. Clear findings. Actionable remediation. Every engagement is focused on helping your organization make informed security decisions. 
          </motion.p>
        </div>
      </div>

      <div className="services-content">
        <div className="services-sections">
          {services.map((service, index) => (
            <motion.section
              key={service.id}
              id={service.id}
              className="service-section"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: EASE }}
            >
              <div className="service-section-header">
                <div className="service-icon">
                  {service.icon}
                </div>
                <div className="service-section-text">
                  <h2 className="service-section-title">{service.title}</h2>
                  <p className="service-section-description">{service.description}</p>
                </div>
              </div>

              <div className="service-items">
                {service.items.map((item, idx) => (
                  <div key={idx} className="service-item-card">
                    <h3 className="service-item-title">{item.title}</h3>
                    <p className="service-item-description">{item.description}</p>
                    {item.subItems && (
                      <ul className="service-item-list">
                        {item.subItems.map((subItem, subIdx) => (
                          <li key={subIdx} className="service-item-list-item">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{subItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

    </div>
  )
}