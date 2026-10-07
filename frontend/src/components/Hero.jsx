import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section style={{ backgroundColor: '#0f1923', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.08)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

        {/* Left */}
        <div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '2rem' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%' }}></div>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fashion Technology Leader</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Design.<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Engineer.
            </span><br />
            Deliver.
          </h1>

          {/* Subtext */}
          <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '420px' }}>
            The world's most advanced fashion CAD software and 3D design tools. Used by 20,000+ professionals across 42 countries.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link to="/register" style={{
              backgroundColor: '#ea580c', color: 'white', fontWeight: 600,
              padding: '14px 32px', borderRadius: '16px', textDecoration: 'none',
              fontSize: '15px', transition: 'all 0.2s',
              boxShadow: '0 8px 32px rgba(234,88,12,0.3)'
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              Start Free Trial →
            </Link>
            <Link to="/software" style={{
              color: 'rgba(255,255,255,0.7)', fontWeight: 600,
              padding: '14px 32px', borderRadius: '16px', textDecoration: 'none',
              fontSize: '15px', border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.7)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >
              Explore Software →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem' }}>
            {[{ num: '20K+', label: 'Installations' }, { num: '42', label: 'Countries' }, { num: '500+', label: 'Institutes' }].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>{stat.num}</div>
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dashboard Card */}
        <div style={{ position: 'relative' }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '28px',
            transition: 'border-color 0.3s'
          }}>
            {/* Window bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f87171' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4ade80' }}></div>
              <div style={{ marginLeft: '12px', flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '6px 12px' }}>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>TUKAcloud — My Collections</span>
              </div>
            </div>

            {/* File grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {['Pattern A', 'Jacket 3D', 'SS25 Draft', 'Grading v2', 'Marker Set', 'Final Cut'].map((name, i) => (
                <div key={i} style={{
                  backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px', padding: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.1)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                >
                  <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(234,88,12,0.2)', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📄</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 500 }}>{name}</div>
                  <div style={{ color: '#4b5563', fontSize: '10px', marginTop: '2px' }}>2d ago</div>
                </div>
              ))}
            </div>

            {/* Activity */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Sara uploaded Jacket_3D_final.tuka', 'Ravi commented on Pattern A', 'New version: SS25_Draft_v3'].map((act, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ea580c', flexShrink: 0 }}></div>
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <div style={{
            position: 'absolute', top: '-16px', right: '-16px',
            backgroundColor: '#ea580c', color: 'white', fontSize: '12px', fontWeight: 700,
            padding: '8px 16px', borderRadius: '16px', transform: 'rotate(3deg)',
            boxShadow: '0 8px 24px rgba(234,88,12,0.4)'
          }}>
            TUKAcloud Live ✦
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, white, transparent)' }}></div>
    </section>
  )
}

export default Hero