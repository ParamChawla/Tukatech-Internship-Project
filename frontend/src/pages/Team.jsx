import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import axiosInstance from '../lib/axios'

const avatarColors = ['#ea580c', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b']

const Sidebar = ({ active, navigate, user }) => {
  const navItems = [
    { icon: '⊞', label: 'Dashboard', path: '/dashboard' },
    { icon: '📁', label: 'My Files', path: '/dashboard' },
    { icon: '🗂️', label: 'Collections', path: '/collections' },
    { icon: '👥', label: 'Team', path: '/team' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ]

  return (
    <aside style={{ width: '240px', flexShrink: 0, backgroundColor: '#0f1923', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '24px' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#ea580c', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>T</span>
        </div>
        <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>TUKAcloud</span>
      </div>
      {navItems.map(item => (
        <div key={item.label} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', backgroundColor: item.label === active ? 'rgba(234,88,12,0.12)' : 'transparent', color: item.label === active ? '#fb923c' : '#6b7280', fontSize: '14px', fontWeight: item.label === active ? 600 : 400, transition: 'all 0.15s' }}
          onMouseEnter={e => { if (item.label !== active) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#d1d5db' } }}
          onMouseLeave={e => { if (item.label !== active) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280' } }}
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
        <div onClick={async () => { await axiosInstance.get('/auth/logout'); useAuthStore.getState().logout(); navigate('/') }} style={{ color: '#6b7280', fontSize: '13px', padding: '8px 12px', cursor: 'pointer', borderRadius: '8px' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >← Sign out</div>
      </div>
    </aside>
  )
}

const Team = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [copied, setCopied] = useState(false)
  const [regenerating, setRegenerating] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchTeamData()
  }, [user])

  const fetchTeamData = async () => {
    try {
      const [teamRes, wsRes] = await Promise.all([
        axiosInstance.get('/users/team'),
        axiosInstance.get('/users/workspace')
      ])
      setMembers(teamRes.data)
      setWorkspace(wsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyInviteCode = () => {
    if (!workspace?.inviteCode) return
    navigator.clipboard.writeText(workspace.inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const regenerateCode = async () => {
    setRegenerating(true)
    try {
      const { data } = await axiosInstance.post('/users/workspace/regenerate-code')
      setWorkspace(prev => ({ ...prev, inviteCode: data.inviteCode }))
    } catch (err) {
      console.error(err)
    } finally {
      setRegenerating(false)
    }
  }

  const removeMember = async (userId) => {
    if (!confirm('Remove this member from the workspace?')) return
    try {
      await axiosInstance.delete(`/users/team/${userId}`)
      setMembers(prev => prev.filter(m => m.user?._id !== userId))
    } catch (err) {
      console.error(err)
    }
  }

  const getRoleColor = (role) => {
    if (role === 'owner') return { bg: 'rgba(234,88,12,0.15)', color: '#fb923c' }
    if (role === 'admin') return { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' }
    return { bg: 'rgba(255,255,255,0.06)', color: '#9ca3af' }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', display: 'flex' }}>
      <Sidebar active="Team" navigate={navigate} user={user} />

      <main style={{ marginLeft: '240px', flex: 1, padding: '40px', minWidth: 0 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>Team</h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              {workspace?.name || 'Your workspace'} · {members.length} member{members.length !== 1 ? 's' : ''}
            </p>
          </div>
          {(user?.role === 'owner' || user?.role === 'admin') && (
            <button onClick={() => setShowInvite(true)} style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(234,88,12,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >+ Invite Member</button>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Members', value: members.length, icon: '👥' },
            { label: 'Your Role', value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Member', icon: '🎖️' },
            { label: 'Workspace', value: workspace?.name || '—', icon: '🏢' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
              <span style={{ fontSize: '22px' }}>{stat.icon}</span>
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'white', margin: '10px 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Invite code card — owner only */}
        {(user?.role === 'owner' || user?.role === 'admin') && workspace?.inviteCode && (
          <div style={{ backgroundColor: 'rgba(234,88,12,0.06)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ color: '#fb923c', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Workspace Invite Code</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'white', fontSize: '28px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.15em' }}>{workspace.inviteCode}</span>
                <button onClick={copyInviteCode} style={{ backgroundColor: copied ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)', color: copied ? '#34d399' : '#9ca3af', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {copied ? '✓ Copied' : '⧉ Copy'}
                </button>
              </div>
              <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '6px' }}>Share this code with team members so they can join during registration.</p>
            </div>
            <button onClick={regenerateCode} disabled={regenerating} style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
              {regenerating ? 'Regenerating...' : '↻ Regenerate Code'}
            </button>
          </div>
        )}

        {/* Members list */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>Members</h2>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>{members.length} total</span>
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>Loading team...</div>
          ) : members.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>👥</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No team members yet</div>
              <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>Share your invite code to add team members</div>
              <button onClick={() => setShowInvite(true)} style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                + Invite Member
              </button>
            </div>
          ) : (
            members.map((member, i) => {
              const memberUser = member.user || member
              const memberRole = member.role || 'member'
              const roleStyle = getRoleColor(memberRole)
              const isMe = memberUser?._id === user?._id
              const colorIndex = i % avatarColors.length

              return (
                <div key={memberUser?._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: avatarColors[colorIndex], display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '16px', flexShrink: 0, position: 'relative' }}>
                      {memberUser?.name?.[0]?.toUpperCase() || '?'}
                      {isMe && <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid #0d1117' }}></div>}
                    </div>
                    <div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                        {memberUser?.name || 'Unknown'}
                        {isMe && <span style={{ color: '#6b7280', fontWeight: 400, fontSize: '12px', marginLeft: '8px' }}>(you)</span>}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '12px' }}>{memberUser?.email || ''}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ backgroundColor: roleStyle.bg, color: roleStyle.color, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', textTransform: 'capitalize' }}>
                      {memberRole}
                    </span>
                    <span style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px' }}>
                      Active
                    </span>
                    {user?.role === 'owner' && !isMe && (
                      <button onClick={() => removeMember(memberUser?._id)} style={{ backgroundColor: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>

      {/* Invite modal - shows invite code */}
      {showInvite && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
          <div style={{ backgroundColor: '#0f1923', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>Invite Team Member</h3>
              <span onClick={() => setShowInvite(false)} style={{ color: '#6b7280', cursor: 'pointer', fontSize: '20px' }}>✕</span>
            </div>

            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Share this invite code with your team member. They'll need to enter it when registering a new account by selecting "Join Workspace".
            </p>

            {workspace?.inviteCode ? (
              <>
                <div style={{ backgroundColor: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workspace Invite Code</div>
                  <div style={{ color: 'white', fontSize: '36px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: '8px' }}>
                    {workspace.inviteCode}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>{workspace.name}</div>
                </div>

                <button onClick={copyInviteCode} style={{ width: '100%', backgroundColor: copied ? 'rgba(16,185,129,0.2)' : '#ea580c', color: copied ? '#34d399' : 'white', fontWeight: 700, fontSize: '15px', padding: '14px', borderRadius: '14px', border: copied ? '1px solid rgba(16,185,129,0.3)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {copied ? '✓ Copied to clipboard' : '⧉ Copy Invite Code'}
                </button>

                <div style={{ marginTop: '16px', padding: '14px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '12px', lineHeight: 1.6 }}>
                    <strong style={{ color: '#d1d5db' }}>How it works:</strong><br />
                    1. Share this code with your team member<br />
                    2. They go to Register → "Join Workspace"<br />
                    3. They enter the code and create their account<br />
                    4. They automatically join your workspace
                  </div>
                </div>
              </>
            ) : (
              <div style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>No workspace found. Please refresh.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Team