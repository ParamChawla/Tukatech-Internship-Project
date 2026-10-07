import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../lib/axios'
import useAuthStore from '../store/authStore'

const Login = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore(s => s.setUser)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await axiosInstance.post('/auth/login', form)
      setUser(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#ea580c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '18px' }}>T</span>
            </div>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '20px' }}>TUKATECH</span>
          </Link>
          <h2 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.5rem' }}>Welcome back</h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Sign in to your TUKAcloud account</p>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem' }}>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.5rem', color: '#f87171', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { label: 'Email', name: 'email', type: 'email', placeholder: 'sara@company.com' },
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
                    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#ea580c'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', backgroundColor: loading ? '#9a3412' : '#ea580c',
                color: 'white', fontWeight: 700, fontSize: '15px',
                padding: '14px', borderRadius: '14px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem', transition: 'all 0.2s',
                boxShadow: '0 8px 24px rgba(234,88,12,0.3)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#fb923c', fontWeight: 600, textDecoration: 'none' }}>Get started free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login