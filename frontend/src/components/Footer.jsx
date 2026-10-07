const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0a1018', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: '#ea580c', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>T</span>
              </div>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '18px', letterSpacing: '-0.01em' }}>TUKATECH</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.8, maxWidth: '280px', marginBottom: '1.5rem' }}>
              The world's leading fashion technology company. Empowering designers and manufacturers since 1983.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.15)'; e.currentTarget.style.color = '#fb923c' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af' }}
                >{icon}</div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Products</h4>
            {['TUKAcad', 'TUKA3D', 'TUKAcloud', 'SMARTmark', 'TUKAcut'].map(item => (
              <div key={item} style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fb923c'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}
                >{item}</a>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Company</h4>
            {['About Us', 'Careers', 'Press', 'Partners', 'Contact'].map(item => (
              <div key={item} style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fb923c'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}
                >{item}</a>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Resources</h4>
            {['Documentation', 'TUKA Academy', 'Blog', 'Support', 'Status'].map(item => (
              <div key={item} style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fb923c'}
                  onMouseLeave={e => e.target.style.color = '#6b7280'}
                >{item}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: '#4b5563', fontSize: '13px' }}>© 2025 Tukatech International. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ color: '#4b5563', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#9ca3af'}
                onMouseLeave={e => e.target.style.color = '#4b5563'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
