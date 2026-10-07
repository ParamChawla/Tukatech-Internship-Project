const shimmer = `
  @keyframes shimmer {
    0% { background-position: -800px 0; }
    100% { background-position: 800px 0; }
  }
`

const skeletonStyle = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
  backgroundSize: '800px 100%',
  animation: 'shimmer 1.5s infinite linear',
  borderRadius: '8px'
}

export const SkeletonBlock = ({ width = '100%', height = '16px', borderRadius = '8px', style = {} }) => (
  <>
    <style>{shimmer}</style>
    <div style={{ ...skeletonStyle, width, height, borderRadius, ...style }} />
  </>
)

export const StatCardSkeleton = () => (
  <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px' }}>
    <style>{shimmer}</style>
    <SkeletonBlock width="32px" height="32px" borderRadius="8px" />
    <SkeletonBlock width="60px" height="28px" style={{ margin: '10px 0 6px' }} />
    <SkeletonBlock width="80px" height="12px" />
  </div>
)

export const FileRowSkeleton = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center', gap: '8px' }}>
    <style>{shimmer}</style>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <SkeletonBlock width="32px" height="32px" borderRadius="8px" style={{ flexShrink: 0 }} />
      <SkeletonBlock width="60%" height="14px" />
    </div>
    <SkeletonBlock width="60px" height="22px" borderRadius="999px" />
    <SkeletonBlock width="70%" height="14px" />
    <SkeletonBlock width="50%" height="14px" />
    <div style={{ display: 'flex', gap: '8px' }}>
      <SkeletonBlock width="20px" height="20px" />
      <SkeletonBlock width="20px" height="20px" />
    </div>
  </div>
)

export const ActivitySkeleton = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
    <style>{shimmer}</style>
    <SkeletonBlock width="36px" height="36px" borderRadius="10px" style={{ flexShrink: 0 }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <SkeletonBlock width="70%" height="13px" />
    </div>
    <SkeletonBlock width="40px" height="11px" />
  </div>
)

export const DashboardSkeleton = () => (
  <div style={{ padding: '40px', marginLeft: '240px' }}>
    <style>{shimmer}</style>

    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SkeletonBlock width="280px" height="28px" />
        <SkeletonBlock width="200px" height="14px" />
      </div>
      <SkeletonBlock width="130px" height="40px" borderRadius="12px" />
    </div>

    {/* Stats */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
      {[1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)}
    </div>

    {/* Table */}
    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonBlock width="80px" height="18px" />
        <SkeletonBlock width="220px" height="34px" borderRadius="10px" />
      </div>
      {[1, 2, 3, 4, 5].map(i => <FileRowSkeleton key={i} />)}
    </div>

    {/* Activity */}
    <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <SkeletonBlock width="100px" height="18px" />
      </div>
      {[1, 2, 3].map(i => <ActivitySkeleton key={i} />)}
    </div>
  </div>
)