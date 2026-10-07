import { Link } from 'react-router-dom'

const HardwarePage = ({ machine }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: `${machine.color}18`, borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/hardware" style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >← All Hardware</Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: `${machine.color}18`, border: `1px solid ${machine.color}33`, borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ color: machine.color, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{machine.tag}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1rem' }}>{machine.name}</h1>
              <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>{machine.desc}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(234,88,12,0.3)' }}>
                  Request a Quote →
                </Link>
                <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Machine visual */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '96px', marginBottom: '16px' }}>{machine.icon}</div>
              <div style={{ color: 'white', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{machine.name}</div>
              <div style={{ color: machine.color, fontSize: '13px', fontWeight: 600 }}>{machine.tag}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Features */}
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '2rem' }}>Key Features</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {machine.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px', border: '1px solid #f0f0f0', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0' }}
                >
                  <div style={{ width: '36px', height: '36px', backgroundColor: machine.color + '18', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f1923', marginBottom: '4px' }}>{f.title}</h4>
                    <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs table */}
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '2rem' }}>Specifications</h2>
            <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden' }}>
              {machine.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i < machine.specs.length - 1 ? '1px solid #f0f0f0' : 'none', backgroundColor: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>{spec.label}</span>
                  <span style={{ color: '#0f1923', fontSize: '13px', fontWeight: 600 }}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '16px' }}>
              <div style={{ color: '#ea580c', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>💡 Integration</div>
              <p style={{ color: '#92400e', fontSize: '13px', lineHeight: 1.6 }}>{machine.integration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Interested in {machine.name}?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Our hardware specialists will help you find the right configuration.</p>
        <Link to="/contact" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
          Request a Quote →
        </Link>
      </div>
    </div>
  )
}

export default HardwarePage