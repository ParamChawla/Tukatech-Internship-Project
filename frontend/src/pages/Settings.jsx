import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import axiosInstance from '../lib/axios'

const SecurityTab = ({ user }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword)
      return setError('All fields are required')
    if (form.newPassword !== form.confirmPassword)
      return setError('New passwords do not match')
    if (form.newPassword.length < 6)
      return setError('New password must be at least 6 characters')
    setLoading(true)
    try {
      await axiosInstance.put('/users/change-password', {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      })
      setSuccess('Password updated successfully')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    padding: '12px 16px', color: 'white', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
  }

  return (
    <div>
      <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Change Password</h3>
      <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>
        Update your account password. You'll need to enter your current password to confirm.
      </p>

      <div style={{ backgroundColor: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px', flexShrink: 0 }}>
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <div style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>{user?.name}</div>
          <div style={{ color: '#9ca3af', fontSize: '12px' }}>{user?.email}</div>
        </div>
      </div>

      {success && (
        <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#34d399', fontSize: '14px' }}>
          ✓ {success}
        </div>
      )}
      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#f87171', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {[
        { label: 'Current Password', name: 'currentPassword' },
        { label: 'New Password', name: 'newPassword' },
        { label: 'Confirm New Password', name: 'confirmPassword' },
      ].map(field => (
        <div key={field.name} style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{field.label}</label>
          <input
            type="password"
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#ea580c'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>
      ))}

      <div style={{ marginBottom: '24px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.7 }}>
          <strong style={{ color: '#d1d5db' }}>Password requirements:</strong><br />
          • Minimum 6 characters<br />
          • Use a mix of letters and numbers for security
        </div>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        style={{ backgroundColor: loading ? '#7c2d12' : '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  )
}

const Settings = () => {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: user?.name || '',
    company: user?.company || '',
    bio: user?.bio || '',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      const { data } = await axiosInstance.put('/users/update', form)
      setUser(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const navItems = [
    { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
    { icon: '📁', label: 'My Files', path: '/dashboard' },
    { icon: '🗂️', label: 'Collections', path: '/collections' },
    { icon: '👥', label: 'Team', path: '/team' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ]

  const inputStyle = {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    padding: '12px 16px', color: 'white', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', display: 'flex' }}>

      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, backgroundColor: '#0f1923', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '24px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#ea580c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>T</span>
          </div>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>TUKAcloud</span>
        </div>

        {navItems.map((item) => (
          <div key={item.label} onClick={() => navigate(item.path)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', backgroundColor: item.label === 'Settings' ? 'rgba(234,88,12,0.12)' : 'transparent', color: item.label === 'Settings' ? '#fb923c' : '#6b7280', fontSize: '14px', fontWeight: item.label === 'Settings' ? 600 : 400, transition: 'all 0.15s' }}
            onMouseEnter={e => { if (item.label !== 'Settings') { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#d1d5db' } }}
            onMouseLeave={e => { if (item.label !== 'Settings') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' } }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px', flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ color: '#6b7280', fontSize: '11px' }}>{user?.email}</div>
            </div>
          </div>
          <div onClick={async () => { await axiosInstance.get('/auth/logout'); useAuthStore.getState().logout(); navigate('/') }}
            style={{ color: '#6b7280', fontSize: '13px', padding: '8px 12px', cursor: 'pointer', borderRadius: '8px' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >← Sign out</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0 }}>
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Settings</h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Manage your account and preferences.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px', maxWidth: '800px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { key: 'profile', label: '👤 Profile' },
              { key: 'security', label: '🔒 Security' },
              { key: 'workspace', label: '🏢 Workspace' },
            ].map(tab => (
              <div key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{ padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', backgroundColor: activeTab === tab.key ? 'rgba(234,88,12,0.12)' : 'transparent', color: activeTab === tab.key ? '#fb923c' : '#6b7280', fontSize: '14px', fontWeight: activeTab === tab.key ? 600 : 400, transition: 'all 0.15s' }}
                onMouseEnter={e => { if (activeTab !== tab.key) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (activeTab !== tab.key) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                {tab.label}
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px' }}>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>Profile Information</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: 'white', flexShrink: 0 }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontSize: '15px', fontWeight: 600 }}>{user?.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>{user?.email}</div>
                    <div style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, marginTop: '4px', textTransform: 'capitalize' }}>{user?.role || 'member'}</div>
                  </div>
                </div>

                {success && (
                  <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', color: '#34d399', fontSize: '14px' }}>
                    ✓ Profile updated successfully
                  </div>
                )}
                {error && (
                  <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', color: '#f87171', fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                {[
                  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your name' },
                  { label: 'Company', name: 'company', type: 'text', placeholder: 'Your company' },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{field.label}</label>
                    <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#ea580c'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Bio</label>
                  <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell your team about yourself..." rows={3}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#ea580c'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <button onClick={handleSave} disabled={saving}
                  style={{ backgroundColor: saving ? '#7c2d12' : '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && <SecurityTab user={user} />}

            {/* Workspace Tab */}
            {activeTab === 'workspace' && (
              <>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>Workspace</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'Workspace Name', value: user?.workspace?.name || 'No workspace' },
                    { label: 'Your Role', value: user?.role || 'member' },
                    { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—' },
                    { label: 'Email', value: user?.email },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#6b7280', fontSize: '13px' }}>{item.label}</span>
                      <span style={{ color: '#e5e7eb', fontSize: '13px', fontWeight: 500, textTransform: item.label === 'Your Role' ? 'capitalize' : 'none' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '12px' }}>
                  <div style={{ color: '#fb923c', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Team Invite Code</div>
                  <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6 }}>
                    Go to the <span onClick={() => navigate('/team')} style={{ color: '#ea580c', cursor: 'pointer', fontWeight: 600 }}>Team page</span> to view and share your workspace invite code.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings