import { Link } from 'react-router-dom'

const machines = [
  {
    name: 'TUKAjet',
    tag: 'CAD Plotter',
    tagColor: '#3b82f6',
    icon: '🖨️',
    desc: 'High-speed CAD plotters and printers for printing patterns full size on paper or fabric. Essential for any pattern room.',
    features: ['Full-size pattern printing', 'High resolution output', 'Fast print speeds', 'Multiple paper widths'],
    to: '/hardware/tukajet'
  },
  {
    name: 'TUKAspread',
    tag: 'Fabric Spreader',
    tagColor: '#10b981',
    icon: '📏',
    desc: 'Automated fabric spreading machines that lay fabric evenly and accurately for cutting. Reduce labor and improve consistency.',
    features: ['Automatic fabric spreading', 'Multiple ply heights', 'Speed control', 'Edge alignment sensors'],
    to: '/hardware/tukaspread'
  },
  {
    name: 'TUKAcut',
    tag: 'Fabric Cutter',
    tagColor: '#ea580c',
    icon: '✂️',
    desc: 'Automatic straight-knife fabric cutting machines. Cut multiple plies precisely and efficiently with minimal waste.',
    features: ['Automatic cutting', 'Multi-ply cutting', 'Precision blade control', 'CAD marker integration'],
    to: '/hardware/tukacut'
  },
  {
    name: 'TUKAcut Rotary',
    tag: 'Rotary Cutter',
    tagColor: '#8b5cf6',
    icon: '⚙️',
    desc: 'Rotary blade cutting for knits, stretch fabrics, and technical textiles. Smooth cuts on difficult materials.',
    features: ['Rotary blade system', 'Stretch fabric handling', 'Technical textile cutting', 'Minimal distortion'],
    to: '/hardware/tukacut-rotary'
  },
  {
    name: 'TUKAcut Laser',
    tag: 'Laser Cutter',
    tagColor: '#ec4899',
    icon: '⚡',
    desc: 'Laser cutting technology for precision cutting of delicate fabrics, lace, technical materials, and intricate designs.',
    features: ['Laser precision cutting', 'Delicate fabric handling', 'Intricate design cutting', 'Sealed edges'],
    to: '/hardware/tukacut-laser'
  },
  {
    name: 'TUKA INA',
    tag: 'Smart Sewing',
    tagColor: '#f59e0b',
    icon: '🧵',
    desc: 'Intelligent sewing automation system. Automate repetitive sewing operations and increase production throughput.',
    features: ['Automated sewing ops', 'Consistent stitch quality', 'Production tracking', 'IoT connectivity'],
    to: '/hardware/tukaina'
  },
]

const Hardware = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hardware Solutions</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            From digital to physical.<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Complete cutting room solutions.
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Tukatech's hardware lineup covers every step of the physical production process — plotting, spreading, and cutting.
          </p>
        </div>
      </div>

      {/* Machines grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {machines.map((machine, i) => (
            <Link key={i} to={machine.to} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '28px', height: '100%', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(234,88,12,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '36px' }}>{machine.icon}</div>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: machine.tagColor + '18', color: machine.tagColor, border: `1px solid ${machine.tagColor}33` }}>
                    {machine.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f1923', marginBottom: '8px' }}>{machine.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{machine.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  {machine.features.map((f, j) => (
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

      {/* CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Ready to automate your cutting room?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Contact our hardware specialists for a consultation.</p>
        <Link to="/contact" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
          Contact Sales →
        </Link>
      </div>
    </div>
  )
}

export default Hardware