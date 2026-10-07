const steps = [
  { num: '01', title: 'Create your account', desc: 'Sign up as an individual designer or register your company. Free trial, no credit card required.' },
  { num: '02', title: 'Upload your patterns', desc: 'Drag and drop your pattern files, 3D samples, and markers into TUKAcloud collections.' },
  { num: '03', title: 'Collaborate with your team', desc: 'Invite team members, leave comments, track versions, and manage approvals in real time.' },
  { num: '04', title: 'Ship faster', desc: 'Reduce sampling rounds by 60%. Go from concept to production-ready patterns in record time.' },
]

const HowItWorks = () => {
  return (
    <section style={{ backgroundColor: '#0f1923', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem'
          }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>How It Works</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Up and running in{' '}
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              minutes.
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: '24px', left: 'calc(100% - 1rem)', right: '-1rem',
                  height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', zIndex: 0
                }}></div>
              )}
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px', padding: '2rem', position: 'relative', zIndex: 1,
                transition: 'all 0.25s'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(234,88,12,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(234,88,12,0.25)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '13px', fontWeight: 800, color: '#ea580c',
                  fontFamily: 'monospace', marginBottom: '1.2rem', letterSpacing: '0.05em'
                }}>{step.num}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks