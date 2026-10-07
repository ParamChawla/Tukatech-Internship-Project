import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import axiosInstance from '../lib/axios'
import Analytics from '../components/Analytics'

const typeColors = {
  'tuka': { bg: 'rgba(234,88,12,0.15)', color: '#fb923c', label: 'TUKA3D' },
  'dxf': { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', label: 'Pattern' },
  'mkr': { bg: 'rgba(16,185,129,0.15)', color: '#34d399', label: 'Marker' },
  'pdf': { bg: 'rgba(168,85,247,0.15)', color: '#c084fc', label: 'PDF' },
  'jpg': { bg: 'rgba(236,72,153,0.15)', color: '#f472b6', label: 'Image' },
  'png': { bg: 'rgba(236,72,153,0.15)', color: '#f472b6', label: 'Image' },
  'default': { bg: 'rgba(255,255,255,0.08)', color: '#9ca3af', label: 'File' },
}

const getTypeInfo = (filename) => {
  const ext = filename?.split('.').pop()?.toLowerCase()
  return typeColors[ext] || typeColors['default']
}

const formatSize = (bytes) => {
  if (!bytes) return '0 B'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date)
  const mins = Math.floor(diff / 60000)
  const hrs = Math.floor(mins / 60)
  const days = Math.floor(hrs / 24)
  if (days > 0) return `${days}d ago`
  if (hrs > 0) return `${hrs}h ago`
  if (mins > 0) return `${mins}m ago`
  return 'just now'
}

const activityConfig = {
  upload: { icon: '⬆️', color: '#34d399', bg: 'rgba(16,185,129,0.1)' },
  delete: { icon: '🗑️', color: '#f87171', bg: 'rgba(239,68,68,0.1)' },
  comment: { icon: '💬', color: '#60a5fa', bg: 'rgba(59,130,246,0.1)' },
  join: { icon: '👋', color: '#fb923c', bg: 'rgba(234,88,12,0.1)' },
  invite: { icon: '📨', color: '#c084fc', bg: 'rgba(168,85,247,0.1)' },
}

// ── Skeleton Components ──
const shimmerStyle = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '800px 100%',
  animation: 'shimmer 1.5s infinite linear',
  borderRadius: '8px'
}

const StatCardSkeleton = () => (
  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
    <div style={{ ...shimmerStyle, width: '32px', height: '32px', borderRadius: '8px' }} />
    <div style={{ ...shimmerStyle, width: '60px', height: '28px', margin: '10px 0 6px' }} />
    <div style={{ ...shimmerStyle, width: '80px', height: '12px' }} />
  </div>
)

const FileRowSkeleton2 = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center', gap: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ ...shimmerStyle, width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0 }} />
      <div style={{ ...shimmerStyle, width: '60%', height: '14px' }} />
    </div>
    <div style={{ ...shimmerStyle, width: '60px', height: '22px', borderRadius: '999px' }} />
    <div style={{ ...shimmerStyle, width: '70%', height: '14px' }} />
    <div style={{ ...shimmerStyle, width: '50%', height: '14px' }} />
    <div style={{ display: 'flex', gap: '8px' }}>
      <div style={{ ...shimmerStyle, width: '20px', height: '20px' }} />
      <div style={{ ...shimmerStyle, width: '20px', height: '20px' }} />
    </div>
  </div>
)

const ActivitySkeleton2 = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
    <div style={{ ...shimmerStyle, width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ ...shimmerStyle, width: '70%', height: '13px' }} />
    </div>
    <div style={{ ...shimmerStyle, width: '40px', height: '11px' }} />
  </div>
)

const Dashboard = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [files, setFiles] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activityLoading, setActivityLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [collectionName, setCollectionName] = useState('General')
  const [uploadError, setUploadError] = useState('')
  const [selectedFileDetail, setSelectedFileDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [postingComment, setPostingComment] = useState(false)
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [activeTab, setActiveTab] = useState('files') // 'files' | 'analytics'
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchFiles()
    fetchActivity()
  }, [user])

  const fetchFiles = async () => {
    try {
      const { data } = await axiosInstance.get('/files/my?limit=50')
      setFiles(Array.isArray(data) ? data : data.files || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchActivity = async () => {
    try {
      const { data } = await axiosInstance.get('/users/activity')
      setActivities(data)
    } catch (err) {
      console.error(err)
    } finally {
      setActivityLoading(false)
    }
  }

  const handleUpload = async (fileToUpload = selectedFile) => {
    if (!fileToUpload) return
    setUploading(true)
    setUploadError('')
    try {
      const formData = new FormData()
      formData.append('file', fileToUpload)
      formData.append('collection', collectionName)
      const { data } = await axiosInstance.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setFiles(prev => [data, ...prev])
      fetchActivity()
      setShowUploadModal(false)
      setSelectedFile(null)
      setCollectionName('General')
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (fileId) => {
    if (!confirm('Delete this file?')) return
    try {
      await axiosInstance.delete(`/files/${fileId}`)
      setFiles(prev => prev.filter(f => f._id !== fileId))
      if (selectedFileDetail?._id === fileId) setSelectedFileDetail(null)
      fetchActivity()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownload = async (file) => {
    try {
      const response = await axiosInstance.get(`/files/download/${file._id}`, { responseType: 'blob' })
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.originalName || file.name
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
    }
  }

  const handleAddComment = async (fileId) => {
    if (!comment.trim()) return
    setPostingComment(true)
    try {
      const { data } = await axiosInstance.post(`/files/${fileId}/comment`, { text: comment })
      setSelectedFileDetail(data)
      setFiles(prev => prev.map(f => f._id === fileId ? data : f))
      setComment('')
      fetchActivity()
    } catch (err) {
      console.error(err)
    } finally {
      setPostingComment(false)
    }
  }

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setSelectedFile(droppedFile)
      setShowUploadModal(true)
    }
  }

  const filteredFiles = files.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.collectionName?.toLowerCase().includes(search.toLowerCase()) ||
    getTypeInfo(f.name).label.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Files Uploaded', value: files.length, icon: '📁', color: '#ea580c' },
    { label: 'Collections', value: [...new Set(files.map(f => f.collectionName))].length, icon: '🗂️', color: '#3b82f6' },
    { label: 'Total Size', value: formatSize(files.reduce((acc, f) => acc + (f.size || 0), 0)), icon: '☁️', color: '#10b981' },
    { label: 'Comments', value: files.reduce((acc, f) => acc + (f.comments?.length || 0), 0), icon: '💬', color: '#8b5cf6' },
  ]

  const navItems = [
    { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
    { icon: '🧵', label: 'Style Workflow', path: '/styles' },
    { icon: '🏭', label: 'Factory MES', path: '/factory-dashboard' },
    { icon: '📁', label: 'My Files', path: '/dashboard' },
    { icon: '🗂️', label: 'Collections', path: '/collections' },
    { icon: '👥', label: 'Team', path: '/team' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div
      style={{ minHeight: '100vh', backgroundColor: '#0d1117', display: 'flex' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Drag overlay */}
      {isDragging && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(234,88,12,0.12)',
          border: '3px dashed #ea580c', zIndex: 200, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          gap: '16px', backdropFilter: 'blur(4px)'
        }}>
          <div style={{ fontSize: '64px' }}>☁️</div>
          <div style={{ color: 'white', fontSize: '24px', fontWeight: 800 }}>Drop to upload</div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>Release to add file to TUKAcloud</div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
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

        {navItems.map((item) => (
          <div key={item.label}
            onClick={() => { setActiveNav(item.label); navigate(item.path) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
              backgroundColor: activeNav === item.label ? 'rgba(234,88,12,0.12)' : 'transparent',
              color: activeNav === item.label ? '#fb923c' : '#6b7280',
              fontSize: '14px', fontWeight: activeNav === item.label ? 600 : 400,
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => { if (activeNav !== item.label) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#d1d5db' } }}
            onMouseLeave={e => { if (activeNav !== item.label) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' } }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        {/* Storage indicator */}
        <div style={{ margin: '12px 0', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280', fontSize: '11px' }}>Storage</span>
            <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600 }}>
              {formatSize(files.reduce((acc, f) => acc + (f.size || 0), 0))} / 1 GB
            </span>
          </div>
          <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              backgroundColor: '#ea580c',
              width: `${Math.min((files.reduce((acc, f) => acc + (f.size || 0), 0) / (1024 * 1024 * 1024)) * 100, 100)}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '4px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '14px', flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'white', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ color: '#6b7280', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
            </div>
          </div>
          <div
            onClick={async () => { await axiosInstance.get('/auth/logout'); useAuthStore.getState().logout(); navigate('/') }}
            style={{ color: '#6b7280', fontSize: '13px', padding: '8px 12px', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >← Sign out</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0, animation: 'fadeIn 0.3s ease' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>
              {getGreeting()}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {user?.workspace?.name || 'Your TUKAcloud workspace'} · {files.length} files
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab(activeTab === 'analytics' ? 'files' : 'analytics')}
              style={{
                backgroundColor: activeTab === 'analytics' ? 'rgba(234,88,12,0.15)' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'analytics' ? '#fb923c' : '#9ca3af',
                border: `1px solid ${activeTab === 'analytics' ? 'rgba(234,88,12,0.3)' : 'rgba(255,255,255,0.08)'}`,
                fontWeight: 600, fontSize: '13px', padding: '9px 18px',
                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(234,88,12,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(234,88,12,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(234,88,12,0.3)' }}
            >+ Upload File</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {loading ? (
            [1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)
          ) : (
            stats.map((stat, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = stat.color + '66'; e.currentTarget.style.backgroundColor = stat.color + '0a' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)' }}
              >
                <span style={{ fontSize: '22px' }}>{stat.icon}</span>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', margin: '10px 0 4px' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</div>
              </div>
            ))
          )}
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
          {[
            { key: 'files', label: '📁 Files' },
            { key: 'analytics', label: '📊 Analytics' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '7px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                backgroundColor: activeTab === tab.key ? '#ea580c' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#6b7280',
                boxShadow: activeTab === tab.key ? '0 2px 8px rgba(234,88,12,0.3)' : 'none'
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Analytics files={files} activities={activities} />
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <>
            {/* Files Table */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <h2 style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>My Files</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '14px' }}>🔍</span>
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 14px 8px 36px', color: 'white', fontSize: '13px', outline: 'none', width: '220px', transition: 'all 0.2s' }}
                      onFocus={e => { e.target.style.borderColor = '#ea580c'; e.target.style.width = '260px' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.width = '220px' }}
                    />
                  </div>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>{filteredFiles.length} files</span>
                </div>
              </div>

              {loading ? (
                <>{[1, 2, 3, 4, 5].map(i => <FileRowSkeleton2 key={i} />)}</>
              ) : files.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No files yet</div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Upload your first pattern, 3D file, or marker</div>
                  <div style={{ color: '#4b5563', fontSize: '13px', marginBottom: '24px' }}>💡 Tip: You can also drag & drop files anywhere on this page</div>
                  <button onClick={() => setShowUploadModal(true)} style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                    + Upload File
                  </button>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No files match "{search}"</div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>Try a different search term</div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {['Name', 'Type', 'Collection', 'Size', ''].map((h, i) => (
                      <span key={i} style={{ color: '#4b5563', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
                    ))}
                  </div>
                  {filteredFiles.map((file) => {
                    const typeInfo = getTypeInfo(file.name)
                    return (
                      <div key={file._id}
                        style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s', cursor: 'pointer', alignItems: 'center' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => setSelectedFileDetail(file)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', backgroundColor: typeInfo.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>📄</div>
                          <span style={{ color: '#e5e7eb', fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                        </div>
                        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, backgroundColor: typeInfo.bg, color: typeInfo.color, width: 'fit-content' }}>{typeInfo.label}</span>
                        <span style={{ color: '#6b7280', fontSize: '13px' }}>{file.collectionName}</span>
                        <span style={{ color: '#6b7280', fontSize: '13px' }}>{formatSize(file.size)}</span>
                        <div style={{ display: 'flex', gap: '12px' }} onClick={e => e.stopPropagation()}>
                          <span onClick={() => handleDownload(file)} style={{ color: '#6b7280', fontSize: '16px', cursor: 'pointer', transition: 'color 0.15s' }} title="Download"
                            onMouseEnter={e => e.currentTarget.style.color = '#34d399'}
                            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                          >⬇</span>
                          <span onClick={() => handleDelete(file._id)} style={{ color: '#6b7280', fontSize: '16px', cursor: 'pointer', transition: 'color 0.15s' }} title="Delete"
                            onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                          >🗑</span>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Activity Feed */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>Activity Feed</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#34d399' }}></div>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>{activities.length} events</span>
                </div>
              </div>

              {activityLoading ? (
                <>{[1, 2, 3].map(i => <ActivitySkeleton2 key={i} />)}</>
              ) : activities.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
                  <div style={{ color: '#6b7280', fontSize: '14px' }}>No activity yet. Upload a file to get started.</div>
                </div>
              ) : (
                <div style={{ padding: '8px 0' }}>
                  {activities.map((act, i) => {
                    const config = activityConfig[act.type] || activityConfig.upload
                    return (
                      <div key={act._id || i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                          {config.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>{act.userName}</span>
                            <span style={{ color: '#9ca3af', fontSize: '13px' }}>{act.action}</span>
                            {act.target && <span style={{ color: config.color, fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{act.target}</span>}
                          </div>
                        </div>
                        <span style={{ color: '#4b5563', fontSize: '11px', flexShrink: 0 }}>{timeAgo(act.createdAt)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* ── UPLOAD MODAL ── */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
          <div style={{ backgroundColor: '#0f1923', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '460px', animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>Upload File</h3>
              <span onClick={() => { setShowUploadModal(false); setSelectedFile(null); setUploadError('') }} style={{ color: '#6b7280', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>✕</span>
            </div>

            {uploadError && (
              <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '1rem', color: '#f87171', fontSize: '13px' }}>{uploadError}</div>
            )}

            <div
              onClick={() => document.getElementById('fileInput').click()}
              style={{ border: `2px dashed ${selectedFile ? 'rgba(234,88,12,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '16px', padding: '2.5rem', textAlign: 'center', cursor: 'pointer', marginBottom: '1.25rem', transition: 'all 0.2s', backgroundColor: selectedFile ? 'rgba(234,88,12,0.05)' : 'transparent' }}
              onMouseEnter={e => { if (!selectedFile) e.currentTarget.style.borderColor = 'rgba(234,88,12,0.4)' }}
              onMouseLeave={e => { if (!selectedFile) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >
              <input id="fileInput" type="file" style={{ display: 'none' }} onChange={e => setSelectedFile(e.target.files[0])} />
              {selectedFile ? (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>{selectedFile.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>{formatSize(selectedFile.size)}</div>
                  <div style={{ color: '#4b5563', fontSize: '11px', marginTop: '8px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setSelectedFile(null) }}>✕ Remove</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>☁️</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Click to select or drag & drop</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Supports .tuka, .dxf, .mkr, .pdf and more</div>
                </>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Collection</label>
              <input type="text" value={collectionName} onChange={e => setCollectionName(e.target.value)} placeholder="e.g. SS25 Collection"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#ea580c'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <button onClick={() => handleUpload()} disabled={!selectedFile || uploading}
              style={{ width: '100%', backgroundColor: !selectedFile || uploading ? '#7c2d12' : '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '14px', border: 'none', cursor: !selectedFile || uploading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(234,88,12,0.2)' }}>
              {uploading ? 'Uploading...' : 'Upload File →'}
            </button>
          </div>
        </div>
      )}

      {/* ── FILE DETAIL PANEL ── */}
      {selectedFileDetail && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '360px', backgroundColor: '#0f1923', borderLeft: '1px solid rgba(255,255,255,0.08)', zIndex: 50, padding: '28px', overflowY: 'auto', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>File Details</h3>
            <span onClick={() => setSelectedFileDetail(null)} style={{ color: '#6b7280', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>✕</span>
          </div>

          <div style={{ backgroundColor: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.15)', borderRadius: '14px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, wordBreak: 'break-all' }}>{selectedFileDetail.name}</div>
            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px' }}>{formatSize(selectedFileDetail.size)}</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {[
              { label: 'Collection', value: selectedFileDetail.collectionName },
              { label: 'Uploaded', value: new Date(selectedFileDetail.createdAt).toLocaleDateString() },
              { label: 'Format', value: selectedFileDetail.format?.toUpperCase() || 'Unknown' },
              { label: 'Size', value: formatSize(selectedFileDetail.size) },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>{item.label}</span>
                <span style={{ color: '#e5e7eb', fontSize: '13px', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
            <button onClick={() => handleDownload(selectedFileDetail)}
              style={{ flex: 1, backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.3)', color: '#fb923c', fontWeight: 600, fontSize: '13px', padding: '11px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.1)'}
            >⬇ Download</button>
            <button onClick={() => handleDelete(selectedFileDetail._id)}
              style={{ flex: 1, backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontWeight: 600, fontSize: '13px', padding: '11px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
            >🗑 Delete</button>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>
              Comments ({selectedFileDetail.comments?.length || 0})
            </h4>

            {selectedFileDetail.comments?.length === 0 && (
              <div style={{ color: '#4b5563', fontSize: '13px', marginBottom: '16px', textAlign: 'center', padding: '20px 0' }}>No comments yet. Be the first.</div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {selectedFileDetail.comments?.map((c, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#fb923c', fontSize: '12px', fontWeight: 600 }}>{c.postedByName}</span>
                    <span style={{ color: '#4b5563', fontSize: '11px' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{c.text}</p>
                </div>
              ))}
            </div>

            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." rows={3}
              style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: 'white', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', marginBottom: '8px' }}
              onFocus={e => e.target.style.borderColor = '#ea580c'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button onClick={() => handleAddComment(selectedFileDetail._id)} disabled={postingComment || !comment.trim()}
              style={{ width: '100%', backgroundColor: '#ea580c', color: 'white', fontWeight: 600, fontSize: '13px', padding: '10px', borderRadius: '10px', border: 'none', cursor: postingComment || !comment.trim() ? 'not-allowed' : 'pointer', opacity: !comment.trim() ? 0.5 : 1, transition: 'opacity 0.2s' }}>
              {postingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
