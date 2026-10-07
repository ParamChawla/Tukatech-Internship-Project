const features = [
  {
    icon: '✦',
    title: 'TUKAcad',
    desc: 'Industry-leading 2D pattern making, grading and marker making software trusted by top apparel brands worldwide.',
    tag: 'CAD Software'
  },
  {
    icon: '◈',
    title: 'TUKA3D',
    desc: 'Real-time 3D garment simulation. Visualize fit, fabric drape and design details before cutting a single sample.',
    tag: '3D Design'
  },
  {
    icon: '⬡',
    title: 'TUKAcloud',
    desc: 'Cloud platform for fashion teams. Upload, manage and collaborate on patterns and 3D samples from anywhere.',
    tag: 'Cloud Platform'
  },
  {
    icon: '▲',
    title: 'SMARTmark',
    desc: 'Automated marker making that maximizes fabric utilization and reduces material waste significantly.',
    tag: 'Marker Making'
  },
  {
    icon: '◉',
    title: 'TUKAcut',
    desc: 'Precision cutting room solutions. Automated spreading and cutting machines integrated with your CAD workflow.',
    tag: 'Hardware'
  },
  {
    icon: '❋',
    title: 'TUKA Academy',
    desc: 'Certified training programs for fashion professionals. 500+ institutes worldwide teach on Tukatech systems.',
    tag: 'Education'
  },
]

const Features = () => {
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
            <span style={{ color: '#ea580c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Full Product Suite</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Everything fashion teams need.<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              All in one place.
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            From sketching to shipping — Tukatech covers every step of the apparel production pipeline.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div key={i}
              style={{
                backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0',
                borderRadius: '20px', padding: '2rem', cursor: 'pointer',
                transition: 'all 0.25s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#fff'
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
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#fff7ed',
                  borderRadius: '14px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px', color: '#ea580c'
                }}>
                  {f.icon}
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 700, color: '#ea580c',
                  backgroundColor: '#fff7ed', border: '1px solid #fed7aa',
                  borderRadius: '999px', padding: '3px 10px', letterSpacing: '0.05em', textTransform: 'uppercase'
                }}>
                  {f.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f1923', marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features