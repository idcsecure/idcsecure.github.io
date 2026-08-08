import { motion } from 'motion/react'
import { useState } from 'react'
import './Contact.css'

const EASE = [0.16, 1, 0.3, 1]

const WORKER_URL = "https://idcsecure-contact.ahmedsalimps.workers.dev/"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("");

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),

      // Honeypot
      website: formData.get("website") || "",
    };

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      setSubmitStatus(
        "Thank you! Your enquiry has been submitted successfully."
      );

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);

      setSubmitStatus(
        "We couldn't submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">Ready to improve your security posture? Request a consultation today.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                pointerEvents: "none",
              }}
            />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company Name *</label>
                <input type="text" id="company" name="company" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Business Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Interested In *</label>
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
              <label htmlFor="budget">Budget</label>
              <select id="budget" name="budget">
                <option value="">Select a budget</option>
                <option value="under-10k">Under ₹10,000</option>
                <option value="10k-25k">₹10,000 – ₹25,000</option>
                <option value="25k-50k">₹25,000 – ₹50,000</option>
                <option value="50k-plus">₹50,000+</option>
                <option value="not-sure">Not Sure</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell us what you are looking for" required></textarea>
            </div>

            <motion.button
              type="submit"
              className="btn-primary submit-btn"
              disabled={isSubmitting}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              {isSubmitting ? "Sending..." : "Request Consultation"}
            </motion.button>

            {submitStatus && (
              <p className="form-status">
                {submitStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
