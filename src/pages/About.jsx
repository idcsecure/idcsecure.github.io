import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import './About.css'

const EASE = [0.16, 1, 0.3, 1]

function useTypingAnimation(text, startDelay = 0, typingSpeed = 50) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, typingSpeed)

      return () => clearInterval(interval)
    }, startDelay * 1000)

    return () => clearTimeout(timeout)
  }, [text, startDelay, typingSpeed])

  return { displayed, isComplete }
}

function TypingText({ text, startDelay = 0, typingSpeed = 50, className }) {
  const { displayed, isComplete } = useTypingAnimation(text, startDelay, typingSpeed)

  return (
    <span className={className}>
      {displayed}
      {!isComplete && <span className="typing-cursor">|</span>}
    </span>
  )
}

const features = [
  'Practical security assessments',
  'Business-focused reporting',
  'Clear remediation guidance',
  'Professional testing methodology',
  'Transparent communication',
  'Affordable services for all sizes'
]

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            <TypingText text="Security Through Visibility" startDelay={0.3} typingSpeed={60} />
          </h1>
          <p className="about-hero-subtitle">
            <TypingText text="You can't secure what you can't see." startDelay={1.5} typingSpeed={30} />
          </p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-container">
          <div className="about-text">
            <p className="about-description">
              IDC Secure helps organizations uncover vulnerabilities across web applications, networks, and IT environments through structured security assessments and penetration testing.
            </p>
            <p className="about-description">
              Our reports prioritize real business risks with clear remediation guidance so organizations know exactly what to fix.
            </p>
          </div>

          
            <h2 className="about-features-title">Why Choose Us?</h2><br></br>
            <div className="features-list">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-item"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: EASE }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          

          <div className="about-mission">
            <h3 className="mission-title">Founder's Note</h3>
            <p className="mission-text">
             <u> 09-09-2025</u><br />

I founded IDC with a clear goal — to make cybersecurity practical and affordable for businesses. While many firms focus on high-end clients, IDC is dedicated to helping growing businesses with reliable, cost-effective security solutions that truly make a difference. We focus on redefining how businesses approach cybersecurity — making it simple, affordable, and genuinely effective.

<br /><br />Ahamed Salim
<br />Founder
<br />The Internet Defense Company
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}