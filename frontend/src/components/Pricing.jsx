const plans = [
  {
    name: 'Starter',
    price: '49',
    desc: 'Perfect for freelance designers and small studios just getting started.',
    features: ['TUKAcad Basic', '5GB Cloud Storage', 'Up to 3 team members', 'Email support', 'Pattern & marker tools'],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '149',
    desc: 'For growing fashion teams that need full CAD + 3D capabilities.',
    features: ['TUKAcad + TUKA3D', '50GB Cloud Storage', 'Up to 15 team members', 'Priority support', 'SMARTmark automation', 'Version control', 'API access'],
    cta: 'Get Started',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large apparel brands and manufacturers with advanced needs.',
    features: ['Full product suite', 'Unlimited storage', 'Unlimited team members', 'Dedicated account manager', 'On-premise deployment', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false
  },
]

const Pricing = () => {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '7rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#fff7ed', border: '1px solid #fed7aa',
            borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem'
          }}>
            <span style={{ color: '#ea580c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Simple Pricing</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Plans that scale with<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              your team.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '440px', margin: '0 auto', lineHeight: 1.7 }}>
            Start free for 14 days. No credit card required.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              backgroundColor: plan.highlighted ? '#0f1923' : '#f9f9f9',
              border: `1px solid ${plan.highlighted ? 'rgba(234,88,12,0.4)' : '#f0f0f0'}`,
              borderRadius: '24px',
              padding: '2.5rem',
              position: 'relative',
              transform: plan.highlighted ? 'scale(1.03)' : 'scale(1)',
              boxShadow: plan.highlighted ? '0 32px 80px rgba(234,88,12,0.15)' : 'none',
              transition: 'all 0.25s'
            }}
              onMouseEnter={e => { if (!plan.highlighted) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.06)' } }}
              onMouseLeave={e => { if (!plan.highlighted) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' } }}
            >
              {plan.highlighted && (
                <div style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: '#ea580c', color: 'white', fontSize: '11px', fontWeight: 700,
                  padding: '5px 16px', borderRadius: '999px', letterSpacing: '0.06em', textTransform: 'uppercase'
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: plan.highlighted ? '#fb923c' : '#ea580c', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{plan.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '0.75rem' }}>
                  {plan.price !== 'Custom' && <span style={{ fontSize: '16px', fontWeight: 600, color: plan.highlighted ? '#9ca3af' : '#6b7280' }}>$</span>}
                  <span style={{ fontSize: '48px', fontWeight: 900, color: plan.highlighted ? 'white' : '#0f1923', letterSpacing: '-0.02em' }}>{plan.price}</span>
                  {plan.price !== 'Custom' && <span style={{ fontSize: '14px', color: plan.highlighted ? '#6b7280' : '#9ca3af' }}>/mo</span>}
                </div>
                <p style={{ fontSize: '14px', color: plan.highlighted ? '#9ca3af' : '#6b7280', lineHeight: 1.6 }}>{plan.desc}</p>
              </div>

              {/* Features */}
              <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: plan.highlighted ? 'rgba(234,88,12,0.2)' : '#fff7ed',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', color: '#ea580c'
                    }}>✓</div>
                    <span style={{ fontSize: '14px', color: plan.highlighted ? '#d1d5db' : '#4b5563' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="/register" style={{
                display: 'block', textAlign: 'center',
                backgroundColor: plan.highlighted ? '#ea580c' : 'transparent',
                color: plan.highlighted ? 'white' : '#ea580c',
                border: `1.5px solid ${plan.highlighted ? '#ea580c' : '#ea580c'}`,
                borderRadius: '14px', padding: '14px',
                fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = plan.highlighted ? '#c2410c' : '#ea580c'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = plan.highlighted ? '#ea580c' : 'transparent'
                  e.target.style.color = plan.highlighted ? 'white' : '#ea580c'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing