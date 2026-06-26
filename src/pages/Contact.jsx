import { useState, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Contact.css'

const EMPTY_FIELDS = { name: '', email: '', message: '' }
const EMPTY_ERRORS = { name: '', email: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields) {
  const errors = { ...EMPTY_ERRORS }
  if (!fields.name.trim()) errors.name = 'Please enter your name.'
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

export default function Contact() {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const successTimer = useRef(null)

  if (!supabase) {
    return (
      <div className="contact">
        <div className="contact-inner">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-config-error">
            Contact form is not available — Supabase is not configured.
          </p>
        </div>
      </div>
    )
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')

    const validation = validate(fields)
    if (hasErrors(validation)) {
      setErrors(validation)
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('messages').insert({
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    })
    setSubmitting(false)

    if (error) {
      setSubmitError('Something went wrong. Please try again.')
      return
    }

    setFields(EMPTY_FIELDS)
    setErrors(EMPTY_ERRORS)
    setSuccess(true)

    clearTimeout(successTimer.current)
    successTimer.current = setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="contact">
      <div className="contact-inner">
        <div className="contact-header">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-subtitle">
            Have a question or want to work together? Send a message and I&apos;ll
            get back to you.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>

          <div className={`form-field${errors.name ? ' form-field-error' : ''}`}>
            <label className="form-label" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={fields.name}
              onChange={handleChange}
              autoComplete="name"
              disabled={submitting}
            />
            {errors.name && (
              <span className="form-error-msg" role="alert">{errors.name}</span>
            )}
          </div>

          <div className={`form-field${errors.email ? ' form-field-error' : ''}`}>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={fields.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={submitting}
            />
            {errors.email && (
              <span className="form-error-msg" role="alert">{errors.email}</span>
            )}
          </div>

          <div className={`form-field${errors.message ? ' form-field-error' : ''}`}>
            <label className="form-label" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="What's on your mind?"
              rows={6}
              value={fields.message}
              onChange={handleChange}
              disabled={submitting}
            />
            {errors.message && (
              <span className="form-error-msg" role="alert">{errors.message}</span>
            )}
          </div>

          {submitError && (
            <p className="form-submit-error" role="alert">{submitError}</p>
          )}

          {success && (
            <p className="form-success" role="status">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}

          <button
            type="submit"
            className="form-submit"
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Send Message'}
          </button>

        </form>
      </div>
    </div>
  )
}
