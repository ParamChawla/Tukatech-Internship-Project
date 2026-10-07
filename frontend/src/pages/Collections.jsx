import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import axiosInstance from '../lib/axios'

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const COLORS = [
  'rgba(234,88,12,0.15)', 'rgba(59,130,246,0.15)',
  'rgba(16,185,129,0.15)', 'rgba(168,85,247,0.15)',
  'rgba(236,72,153,0.15)', 'rgba(234,179,8,0.15)'
]
const TEXT_COLORS = ['#fb923c', '#60a5fa', '#34d399', '#c084fc', '#f472b6', '#facc15']

const Collections = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchFiles()
  }, [user])

  const fetchFiles = async () => {
    try {
      const { data } = await axiosInstance.get('/files/my')
      setFiles(Array.isArray(data) ? data : data.files || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Group files by collectionName
  const collections = files.reduce((acc, file) => {
    const name = file.collectionName || 'General'
    if (!acc[name]) acc[name] = []
    acc[name].push(file)
    return acc
  }, {})

  const collectionList = Object.entries(collections)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', display: 'flex' }}>

      {/* Sidebar — same as dashboard */}
      <aside style={{
        width: '240px', flexShrink: 0, backgroundColor: '#0f1923',
        borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px',
        display: 'flex', flexDirection: 'column', gap: '4px',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '24px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#ea580c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>T</span>
          </div>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>TUKAcloud</span>
        </div>

        {[
          { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
          { icon: '🧵', label: 'Style Workflow', path: '/styles' },
          { icon: '🏭', label: 'Factory MES', path: '/factory-dashboard' },
          { icon: '📁', label: 'My Files', path: '/dashboard' },
          { icon: '🗂️', label: 'Collections', path: '/collections' },
          { icon: '👥', label: 'Team', path: '/team' },
          { icon: '⚙️', label: 'Settings', path: '/settings' },
        ].map((item) => (
          <div key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
              backgroundColor: item.label === 'Collections' ? 'rgba(234,88,12,0.12)' : 'transparent',
              color: item.label === 'Collections' ? '#fb923c' : '#6b7280',
              fontSize: '14px', fontWeight: item.label === 'Collections' ? 600 : 400,
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => { if (item.label !== 'Collections') { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#d1d5db' } }}
            onMouseLeave={e => { if (item.label !== 'Collections') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' } }}
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
          <div onClick={() => { axiosInstance.get('/auth/logout'); useAuthStore.getState().logout(); navigate('/') }}
            style={{ color: '#6b7280', fontSize: '13px', padding: '8px 12px', cursor: 'pointer', borderRadius: '8px' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >← Sign out</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0 }}>
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Collections</h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Your files organized by collection.</p>
        </div>

        {loading ? (
          <div style={{ color: '#6b7280', textAlign: 'center', padding: '60px' }}>Loading...</div>
        ) : collectionList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗂️</div>
            <div style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No collections yet</div>
            <div style={{ color: '#6b7280', fontSize: '14px' }}>Upload files and assign them to collections</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {collectionList.map(([name, colFiles], i) => {
              const colorIndex = i % COLORS.length
              return (
                <div key={name}
                  onClick={() => setSelected(selected === name ? null : name)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${selected === name ? 'rgba(234,88,12,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '16px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(234,88,12,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = selected === name ? 'rgba(234,88,12,0.4)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: COLORS[colorIndex], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      🗂️
                    </div>
                    <span style={{ backgroundColor: COLORS[colorIndex], color: TEXT_COLORS[colorIndex], fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px' }}>
                      {colFiles.length} files
                    </span>
                  </div>
                  <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{name}</h3>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>
                    {formatSize(colFiles.reduce((acc, f) => acc + f.size, 0))} total
                  </p>

                  {/* Expanded file list */}
                  {selected === name && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      {colFiles.map(f => (
                        <div key={f._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '14px' }}>📄</span>
                            <span style={{ color: '#e5e7eb', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{f.name}</span>
                          </div>
                          <span style={{ color: '#4b5563', fontSize: '11px', flexShrink: 0 }}>{formatSize(f.size)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default Collections
