import { Link } from 'react-router-dom'

const products = [
  {
    name: 'TUKA APM',
    tag: 'AI-Powered',
    tagColor: '#8b5cf6',
    desc: 'The world\'s first fully automatic pattern making and grading software. Generate a complete pattern from a spec sheet using AI.',
    features: ['Auto pattern generation', 'Spec sheet import', 'AI grading', 'TUKAcad integration'],
    to: '/software/tuka-apm',
    icon: '🤖'
  },
  {
    name: 'TUKAcad',
    tag: 'Most Popular',
    tagColor: '#ea580c',
    desc: 'Industry-leading CAD software for pattern making, grading and marker making. The first step in apparel product development.',
    features: ['Pattern making', 'Grading', 'Marker making', 'DXF/AAMA compatible'],
    to: '/software/tukacad',
    icon: '✏️'
  },
  {
    name: 'SMARTmark',
    tag: 'Efficiency',
    tagColor: '#10b981',
    desc: 'Advanced marker making and material requirement planning. Beat the human brain every time for maximum fabric utilization.',
    features: ['Auto marker making', 'Material planning', 'Fabric efficiency', 'Cost reduction'],
    to: '/software/smartmark',
    icon: '📐'
  },
  {
    name: 'TUKAstudio',
    tag: 'Design',
    tagColor: '#ec4899',
    desc: 'Robust textile and print design software with modules for color separation, repeats, colorways, and more.',
    features: ['Print design', 'Color separation', 'Repeat patterns', 'Colorways'],
    to: '/software/tukastudio',
    icon: '🎨'
  },
  {
    name: 'TUKA3D',
    tag: '3D Simulation',
    tagColor: '#3b82f6',
    desc: 'The fashion industry\'s most advanced 3D apparel fit and virtual fashion design system with real-time motion simulation.',
    features: ['3D fit simulation', 'Virtual models', 'Real-time motion', 'Fabric drape'],
    to: '/software/tuka3d',
    icon: '👗'
  },
  {
    name: 'TUKA3D DE',
    tag: 'Visualizer',
    tagColor: '#f59e0b',
    desc: 'Design new styles from 3D fashion assets. Visualize prints, graphics, and placements on life-like 3D garments.',
    features: ['3D visualization', 'Print placement', 'Style design', 'Asset library'],
    to: '/software/tuka3d-de',
    icon: '🖼️'
  },
  {
    name: 'TUKAcloud',
    tag: 'Cloud Platform',
    tagColor: '#06b6d4',
    desc: 'Web-based digital sample room and mini PLM system. Connect everyone in product development under one digital roof.',
    features: ['Cloud collaboration', 'Digital samples', 'Team management', 'File versioning'],
    to: '/software/tukacloud',
    icon: '☁️'
  },
]

const Software = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)',
            borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem'
          }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Software Suite</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Every tool fashion teams need.<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              From sketch to shipment.
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Tukatech's integrated software ecosystem covers every step of the apparel product development pipeline.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {products.map((product, i) => (
            <Link key={i} to={product.to} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0',
                borderRadius: '20px', padding: '28px', height: '100%',
                transition: 'all 0.25s', cursor: 'pointer'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#fed7aa'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(234,88,12,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#f9f9f9'
                  e.currentTarget.style.borderColor = '#f0f0f0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px' }}>{product.icon}</div>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '3px 10px',
                    borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em',
                    backgroundColor: product.tagColor + '18', color: product.tagColor,
                    border: `1px solid ${product.tagColor}33`
                  }}>{product.tag}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f1923', marginBottom: '8px', letterSpacing: '-0.01em' }}>{product.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>{product.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  {product.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#ea580c', flexShrink: 0 }}>✓</div>
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ color: '#ea580c', fontSize: '13px', fontWeight: 700 }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Software