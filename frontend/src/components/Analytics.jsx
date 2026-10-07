import { useState } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts'

const COLORS = ['#ea580c', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4']

const formatSize = (bytes) => {
  if (!bytes) return '0 B'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#1a2332', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px' }}>
        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: '13px', fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const Analytics = ({ files, activities }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  // File type distribution
  const typeData = files.reduce((acc, file) => {
    const ext = file.name?.split('.').pop()?.toLowerCase() || 'other'
    const typeMap = { tuka: 'TUKA3D', dxf: 'Pattern', mkr: 'Marker', pdf: 'PDF', jpg: 'Image', png: 'Image' }
    const type = typeMap[ext] || 'Other'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(typeData).map(([name, value]) => ({ name, value }))

  // Collection size data
  const collectionData = files.reduce((acc, file) => {
    const col = file.collectionName || 'General'
    if (!acc[col]) acc[col] = { name: col, files: 0, size: 0 }
    acc[col].files += 1
    acc[col].size += file.size || 0
    return acc
  }, {})
  const barData = Object.values(collectionData).map(c => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + '...' : c.name,
    Files: c.files,
    'Size (MB)': parseFloat((c.size / (1024 * 1024)).toFixed(2))
  }))

  // Activity over last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return {
      date: d.toLocaleDateString('en', { weekday: 'short' }),
      fullDate: d.toDateString(),
      uploads: 0, comments: 0, deletes: 0
    }
  })
  activities.forEach(act => {
    const actDate = new Date(act.createdAt).toDateString()
    const day = last7Days.find(d => d.fullDate === actDate)
    if (day) {
      if (act.type === 'upload') day.uploads++
      else if (act.type === 'comment') day.comments++
      else if (act.type === 'delete') day.deletes++
    }
  })

  // Storage by type
  const storageByType = files.reduce((acc, file) => {
    const ext = file.name?.split('.').pop()?.toLowerCase() || 'other'
    const typeMap = { tuka: 'TUKA3D', dxf: 'Pattern', mkr: 'Marker', pdf: 'PDF', jpg: 'Image', png: 'Image' }
    const type = typeMap[ext] || 'Other'
    acc[type] = (acc[type] || 0) + (file.size || 0)
    return acc
  }, {})
  const storageData = Object.entries(storageByType).map(([name, size]) => ({
    name, size: parseFloat((size / (1024 * 1024)).toFixed(2))
  }))

  // Key metrics
  const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0)
  const totalComments = files.reduce((acc, f) => acc + (f.comments?.length || 0), 0)
  const avgFileSize = files.length ? totalSize / files.length : 0
  const mostActiveCollection = Object.values(collectionData).sort((a, b) => b.files - a.files)[0]
  const uploadTrend = last7Days.reduce((acc, d) => acc + d.uploads, 0)

  const metrics = [
    { label: 'Total Storage', value: formatSize(totalSize), icon: '☁️', color: '#ea580c', sub: `${files.length} files` },
    { label: 'Avg File Size', value: formatSize(avgFileSize), icon: '📊', color: '#3b82f6', sub: 'per file' },
    { label: 'Total Comments', value: totalComments, icon: '💬', color: '#10b981', sub: 'across all files' },
    { label: 'Uploads This Week', value: uploadTrend, icon: '📈', color: '#8b5cf6', sub: 'last 7 days' },
    { label: 'Collections', value: Object.keys(collectionData).length, icon: '🗂️', color: '#f59e0b', sub: 'total' },
    { label: 'Most Active', value: mostActiveCollection?.name || '—', icon: '🔥', color: '#ec4899', sub: `${mostActiveCollection?.files || 0} files` },
  ]

  if (files.length === 0) {
    return (
      <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '48px', textAlign: 'center', marginTop: '24px' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
        <div style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No data yet</div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>Upload files to see analytics</div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>Workspace Analytics</h2>
        <span style={{ backgroundColor: 'rgba(234,88,12,0.15)', color: '#fb923c', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px' }}>Live</span>
      </div>

      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = m.color + '66'; e.currentTarget.style.backgroundColor = m.color + '0a' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)' }}
          >
            <span style={{ fontSize: '20px' }}>{m.icon}</span>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'white', margin: '8px 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{m.label}</div>
            <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '2px' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* File Type Donut */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Files by Type</h3>
          {pieData.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={45} outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {pieData.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: COLORS[i % COLORS.length], flexShrink: 0 }}></div>
                      <span style={{ color: '#9ca3af', fontSize: '12px' }}>{entry.name}</span>
                    </div>
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>No data</div>
          )}
        </div>

        {/* Activity Line Chart */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Activity — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={last7Days} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="commentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="uploads" name="Uploads" stroke="#ea580c" strokeWidth={2} fill="url(#uploadGrad)" />
              <Area type="monotone" dataKey="comments" name="Comments" stroke="#3b82f6" strokeWidth={2} fill="url(#commentGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Collection Bar Chart */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Files per Collection</h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Files" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>No collections yet</div>
          )}
        </div>

        {/* Storage by Type Bar */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Storage by Type (MB)</h3>
          {storageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={storageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="size" name="Size (MB)" radius={[4, 4, 0, 0]}>
                  {storageData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>No data</div>
          )}
        </div>
      </div>

      {/* Insights */}
      <div style={{ backgroundColor: 'rgba(234,88,12,0.06)', border: '1px solid rgba(234,88,12,0.15)', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ color: '#fb923c', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>🤖 AI Insights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            {
              insight: files.length > 0
                ? `Your most used file type is ${pieData.sort((a, b) => b.value - a.value)[0]?.name || '—'} with ${pieData.sort((a, b) => b.value - a.value)[0]?.value || 0} files.`
                : 'Upload files to get insights.',
              icon: '📁'
            },
            {
              insight: mostActiveCollection
                ? `"${mostActiveCollection.name}" is your most active collection with ${mostActiveCollection.files} files (${formatSize(mostActiveCollection.size)}).`
                : 'Create collections to organize your files.',
              icon: '🗂️'
            },
            {
              insight: uploadTrend > 0
                ? `Your team uploaded ${uploadTrend} file${uploadTrend !== 1 ? 's' : ''} in the last 7 days. ${uploadTrend >= 5 ? 'Great activity! 🔥' : 'Keep it up!'}`
                : 'No uploads in the last 7 days. Start uploading!',
              icon: '📈'
            },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
              <p style={{ color: '#d1d5db', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics
