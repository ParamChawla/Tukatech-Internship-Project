import { Link } from 'react-router-dom'

const SmartFactories = () => {
  const packages = [
    {
      name: 'Digital Pattern Room',
      icon: '✏️',
      color: '#ea580c',
      desc: 'Complete digital pattern making setup for apparel manufacturers moving from paper to CAD.',
      includes: ['TUKAcad CPE licenses', 'TUKAjet plotter', 'Installation & setup', 'Staff training (3 days)', 'Remote support (6 months)'],
    },
    {
      name: 'Virtual Sampling Studio',
      icon: '👗',
      color: '#3b82f6',
      desc: 'Full 3D virtual sampling setup to reduce physical samples and speed up buyer approvals.',
      includes: ['TUKAcad CPE licenses', 'TUKA3D Professional licenses', 'TUKAcloud workspace', 'Custom avatar setup', 'Training & onboarding'],
    },
    {
      name: 'Automated Cutting Room',
      icon: '✂️',
      color: '#10b981',
      desc: 'End-to-end automated cutting room — from marker making to final cut, fully automated.',
      includes: ['SMARTmark license', 'TUKAspread machine', 'TUKAcut machine', 'Cutting room integration', 'Operator training'],
    },
    {
      name: 'Full Smart Factory',
      icon: '🏭',
      color: '#8b5cf6',
      desc: 'Complete turnkey smart factory — CAD, 3D, cloud, spreading, cutting, and sewing automation under one roof.',
      includes: ['Full software suite', 'Complete hardware lineup', 'Factory floor integration', 'ERP/MES connectivity', 'Dedicated project manager', '12-month support contract'],
    },
  ]

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Turnkey Solutions</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                Turnkey Smart Factories
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Tukatech delivers complete, integrated factory solutions — from a single CAD room to a fully automated smart factory. We design, supply, install, and train your team.
              </p>
              <Link to="/contact" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(234,88,12,0.3)' }}>
                Get a Consultation →
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { num: '500+', label: 'Factories equipped', icon: '🏭' },
                { num: '42', label: 'Countries served', icon: '🌍' },
                { num: '40+', label: 'Years experience', icon: '📅' },
                { num: '24/7', label: 'Support available', icon: '🛠️' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Smart Factory Packages</h2>
          <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '480px', margin: '0 auto' }}>From a single department upgrade to a complete factory transformation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {packages.map((pkg, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '28px', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(234,88,12,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ width: '52px', height: '52px', backgroundColor: pkg.color + '18', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>{pkg.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1923', marginBottom: '8px' }}>{pkg.name}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{pkg.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                {pkg.includes.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: pkg.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: pkg.color, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '13px', color: '#4b5563' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{ display: 'block', textAlign: 'center', color: pkg.color, border: `1.5px solid ${pkg.color}`, borderRadius: '12px', padding: '11px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = pkg.color; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = pkg.color }}
              >
                Get a Quote →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>How we work with you</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { step: '01', title: 'Consultation', desc: 'We assess your current workflow, production volume, and goals to recommend the right solution.' },
              { step: '02', title: 'Custom Design', desc: 'We design a custom factory layout and software/hardware configuration for your specific needs.' },
              { step: '03', title: 'Installation', desc: 'Our engineers install and configure everything on-site. Zero downtime to your existing production.' },
              { step: '04', title: 'Training & Support', desc: 'Comprehensive staff training and ongoing support to ensure your team gets full value from day one.' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ color: '#ea580c', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>{s.step}</div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartFactories