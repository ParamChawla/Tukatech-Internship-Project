import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '80px', marginBottom: '8px' }}>404</div>
      <h1 style={{ color: 'white', fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>Page not found</h1>
      <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '400px', lineHeight: 1.7, marginBottom: '24px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none' }}>
          Go Home →
        </Link>
        <Link to="/software" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '15px', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
          Browse Software
        </Link>
      </div>
    </div>
  )
}

export default NotFound
