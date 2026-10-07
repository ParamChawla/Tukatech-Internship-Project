import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axios'
import useAuthStore from '../store/authStore'

const Register = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore(s => s.setUser)
  const [mode, setMode] = useState('create') // 'create' or 'join'
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', inviteCode: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = mode === 'join'
        ? { name: form.name, email: form.email, password: form.password, inviteCode: form.inviteCode }
        : { name: form.name, email: form.email, password: form.password, company: form.company }
      const { data } = await axiosInstance.post('/auth/register', payload)
      setUser(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#ea580c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '18px' }}>T</span>
            </div>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '20px' }}>TUKATECH</span>
          </Link>
          <h2 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Create your account</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Start your 14-day free trial. No credit card needed.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '4px', marginBottom: '24px', gap: '4px' }}>
          {[
            { key: 'create', label: '🏢 Create Workspace', desc: 'Start a new company workspace' },
            { key: 'join', label: '🔗 Join Workspace', desc: 'Join with an invite code' },
          ].map(opt => (
            <button key={opt.key} onClick={() => setMode(opt.key)} style={{
              flex: 1, padding: '12px 16px', borderRadius: '10px', border: 'none',
              backgroundColor: mode === opt.key ? 'rgba(234,88,12,0.2)' : 'transparent',
              color: mode === opt.key ? '#fb923c' : '#6b7280',
              fontWeight: mode === opt.key ? 700 : 400,
              fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
              borderWidth: mode === opt.key ? '1px' : '0',
              borderStyle: 'solid',
              borderColor: mode === opt.key ? 'rgba(234,88,12,0.3)' : 'transparent'
            }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.5rem', color: '#f87171', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Common fields */}
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Sara Khan' },
              { label: 'Work Email', name: 'email', type: 'email', placeholder: 'sara@company.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.name} style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  style={{
                    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                    padding: '12px 16px', color: 'white', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#ea580c'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            ))}

            {/* Conditional field */}
            {mode === 'create' ? (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  Company / Workspace Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Apparel"
                  style={{
                    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                    padding: '12px 16px', color: 'white', fontSize: '14px',
                    outline: 'none', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#ea580c'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            ) : (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  Invite Code
                </label>
                <input
                  type="text"
                  name="inviteCode"
                  value={form.inviteCode}
                  onChange={e => setForm({ ...form, inviteCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. A1B2C3"
                  required
                  maxLength={12}
                  style={{
                    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                    padding: '12px 16px', color: 'white', fontSize: '16px',
                    outline: 'none', boxSizing: 'border-box',
                    letterSpacing: '0.2em', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700
                  }}
                  onFocus={e => e.target.style.borderColor = '#ea580c'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px' }}>
                  Ask your workspace owner for the invite code from their Team settings.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', backgroundColor: loading ? '#9a3412' : '#ea580c',
                color: 'white', fontWeight: 700, fontSize: '15px',
                padding: '14px', borderRadius: '14px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', marginTop: '0.5rem',
                boxShadow: '0 8px 24px rgba(234,88,12,0.3)'
              }}
            >
              {loading ? 'Creating account...' : mode === 'create' ? 'Create Account →' : 'Join Workspace →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#fb923c', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register