import { useState } from 'react'
import axiosInstance from '../lib/axios'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '', interest: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axiosInstance.post('/contact', form)
      setSuccess(true)
      setForm({ name: '', email: '', company: '', subject: '', message: '', interest: '' })
    } catch {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get In Touch</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                Let's talk fashion technology
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '17px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Whether you need a demo, have questions about pricing, or want to discuss a custom solution — our team is ready to help.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '📍', title: 'World HQ', value: 'Los Angeles, CA, USA', sub: '5462 Jillson Street, CA 90040' },
                  { icon: '🌏', title: 'Asia HQ', value: 'Gurugram, Haryana, India', sub: 'GP 42, Sector 18' },
                  { icon: '✉️', title: 'Email', value: 'tukateam@tukatech.com', sub: 'We respond within 24 hours' },
                  { icon: '📞', title: 'Phone', value: '+1-323-726-3836', sub: 'Mon–Fri, 9am–6pm PST' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ color: '#fb923c', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.title}</div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{item.value}</div>
                      <div style={{ color: '#6b7280', fontSize: '12px' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Send us a message</h3>

              {success && (
                <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', color: '#34d399', fontSize: '14px' }}>
                  ✓ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              {error && (
                <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', color: '#f87171', fontSize: '14px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'your@company.com' },
                  ].map(field => (
                    <div key={field.name}>
                      <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>{field.label}</label>
                      <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} required
                        style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = '#ea580c'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Company</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Your company name"
                    style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#ea580c'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>I'm interested in</label>
                  <select name="interest" value={form.interest} onChange={handleChange}
                    style={{ width: '100%', backgroundColor: '#1a2332', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: form.interest ? 'white' : '#6b7280', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#ea580c'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  >
                    <option value="">Select a product or service</option>
                    <option value="TUKAcad">TUKAcad — Pattern making & grading</option>
                    <option value="TUKA3D">TUKA3D — 3D virtual sampling</option>
                    <option value="TUKAcloud">TUKAcloud — Cloud collaboration</option>
                    <option value="SMARTmark">SMARTmark — Marker making</option>
                    <option value="Hardware">Hardware — Plotters & cutters</option>
                    <option value="Training">Training & education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your needs..." rows={4} required
                    style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#ea580c'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <button type="submit" disabled={loading}
                  style={{ width: '100%', backgroundColor: loading ? '#7c2d12' : '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '14px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(234,88,12,0.3)', transition: 'all 0.2s' }}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Support options */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em' }}>Other ways to get help</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '🎓', title: 'TUKA Academy', desc: 'Self-paced online courses for TUKAcad, TUKA3D, and more. Learn at your own pace.', cta: 'Go to Academy', href: 'https://academy.tukatech.com' },
            { icon: '🛠️', title: 'Technical Support', desc: 'Having trouble with the software? Our support team is available Monday–Friday.', cta: 'Email Support', href: 'mailto:support@tukatech.com' },
            { icon: '📍', title: 'TUKAcenters', desc: 'Find a Tukatech authorized training and support center near you.', cta: 'Find a Center', href: 'https://tukatech.com/tukacenters/' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px', textAlign: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234,88,12,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1923', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '20px' }}>{item.desc}</p>
              <a href={item.href} target="_blank" rel="noreferrer" style={{ color: '#ea580c', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>{item.cta} →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
