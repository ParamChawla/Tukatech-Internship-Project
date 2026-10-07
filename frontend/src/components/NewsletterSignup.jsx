import { useState } from 'react'
import axiosInstance from '../lib/axios'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      await axiosInstance.post('/newsletter', { email })
      setSuccess(true)
      setEmail('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ backgroundColor: '#0f1923', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
          <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Stay Updated</span>
        </div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Get the latest from Tukatech
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Industry insights, product updates, and fashion technology tips — straight to your inbox.
        </p>

        {success ? (
          <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '20px', color: '#34d399', fontSize: '15px', fontWeight: 600 }}>
            ✓ You're subscribed! Welcome to the Tukatech community.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', color: 'white', fontSize: '14px', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#ea580c'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              <button type="submit" disabled={loading} style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px 24px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(234,88,12,0.3)' }}>
                {loading ? '...' : 'Subscribe →'}
              </button>
            </div>
            {error && <p style={{ color: '#f87171', fontSize: '13px', marginTop: '10px' }}>{error}</p>}
            <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '12px' }}>No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  )
}

export default NewsletterSignup
