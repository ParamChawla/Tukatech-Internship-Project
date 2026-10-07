import { Link } from 'react-router-dom'
import { useState } from 'react'

const GarmentIllustration = () => (
  <div style={{ backgroundColor: '#1a2332', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f87171' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4ade80' }}></div>
      <div style={{ flex: 1, height: '24px', backgroundColor: '#0f1923', borderRadius: '6px', marginLeft: '8px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <span style={{ color: '#6b7280', fontSize: '11px' }}>TUKA3D — Jacket_SS25_v3.tuka</span>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {/* 3D viewport */}
      <div style={{ backgroundColor: '#0d1520', borderRadius: '12px', padding: '16px', position: 'relative', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Simple 3D garment SVG */}
        <svg viewBox="0 0 160 240" width="120" height="180">
          {/* Body silhouette */}
          <ellipse cx="80" cy="60" rx="28" ry="32" fill="#2a3a50" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          {/* Jacket body */}
          <path d="M 30 85 Q 20 120 22 200 L 138 200 Q 140 120 130 85 Q 105 95 80 92 Q 55 95 30 85 Z"
            fill="rgba(59,130,246,0.25)" stroke="#60a5fa" strokeWidth="1.5"/>
          {/* Lapels */}
          <path d="M 80 92 L 65 110 L 70 140 L 80 135" fill="rgba(59,130,246,0.4)" stroke="#60a5fa" strokeWidth="1"/>
          <path d="M 80 92 L 95 110 L 90 140 L 80 135" fill="rgba(59,130,246,0.4)" stroke="#60a5fa" strokeWidth="1"/>
          {/* Sleeves */}
          <path d="M 30 85 Q 5 100 8 160 Q 20 165 28 162 Q 32 120 42 100 Z"
            fill="rgba(59,130,246,0.2)" stroke="#60a5fa" strokeWidth="1.5"/>
          <path d="M 130 85 Q 155 100 152 160 Q 140 165 132 162 Q 128 120 118 100 Z"
            fill="rgba(59,130,246,0.2)" stroke="#60a5fa" strokeWidth="1.5"/>
          {/* Seam lines */}
          <line x1="80" y1="92" x2="80" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="4,3"/>
          {/* Fabric simulation lines */}
          <path d="M 40 120 Q 80 115 120 120" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5" fill="none"/>
          <path d="M 38 135 Q 80 130 122 135" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5" fill="none"/>
          <path d="M 36 150 Q 80 145 124 150" stroke="rgba(96,165,250,0.3)" strokeWidth="0.5" fill="none"/>
          {/* Stress points */}
          <circle cx="50" cy="108" r="3" fill="rgba(251,146,60,0.6)"/>
          <circle cx="110" cy="108" r="3" fill="rgba(251,146,60,0.6)"/>
        </svg>

        {/* overlays */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '4px 8px' }}>
          <span style={{ color: '#60a5fa', fontSize: '10px', fontWeight: 600 }}>3D View</span>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px' }}>
          {['Front', 'Back', 'Side'].map((v, i) => (
            <div key={i} style={{ backgroundColor: i === 0 ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)', color: i === 0 ? '#60a5fa' : '#6b7280', fontSize: '9px', fontWeight: 600, padding: '3px 7px', borderRadius: '4px' }}>{v}</div>
          ))}
        </div>
      </div>

      {/* Right panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Fabric properties */}
        <div style={{ backgroundColor: '#0f1923', borderRadius: '10px', padding: '12px' }}>
          <div style={{ color: '#fb923c', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>FABRIC SIMULATION</div>
          {[
            { label: 'Weight', value: '280 g/m²', bar: 0.6 },
            { label: 'Stretch', value: '12%', bar: 0.2 },
            { label: 'Drape', value: '0.78', bar: 0.78 },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ color: '#6b7280', fontSize: '10px' }}>{p.label}</span>
                <span style={{ color: '#e5e7eb', fontSize: '10px', fontWeight: 600 }}>{p.value}</span>
              </div>
              <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${p.bar * 100}%`, backgroundColor: '#ea580c', borderRadius: '2px' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Fit analysis */}
        <div style={{ backgroundColor: '#0f1923', borderRadius: '10px', padding: '12px' }}>
          <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>FIT ANALYSIS</div>
          {[
            { zone: 'Chest', status: 'Good', color: '#34d399' },
            { zone: 'Shoulder', status: 'Tight', color: '#fb923c' },
            { zone: 'Waist', status: 'Good', color: '#34d399' },
            { zone: 'Hip', status: 'Good', color: '#34d399' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: '#9ca3af', fontSize: '11px' }}>{f.zone}</span>
              <span style={{ color: f.color, fontSize: '11px', fontWeight: 600 }}>{f.status}</span>
            </div>
          ))}
        </div>

        {/* Size selector */}
        <div style={{ backgroundColor: '#0f1923', borderRadius: '10px', padding: '12px' }}>
          <div style={{ color: '#60a5fa', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>SIZE COMPARISON</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {['XS','S','M','L','XL','2XL'].map((s, i) => (
              <div key={i} style={{ backgroundColor: i === 3 ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.05)', color: i === 3 ? '#60a5fa' : '#6b7280', fontSize: '10px', fontWeight: 600, padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* bottom bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '6px 8px', backgroundColor: '#0f1923', borderRadius: '6px' }}>
      <span style={{ color: '#6b7280', fontSize: '10px' }}>Real-time simulation · 60fps</span>
      <span style={{ color: '#34d399', fontSize: '10px' }}>✓ Fit approved</span>
    </div>
  </div>
)

const MotionIllustration = () => (
  <div style={{ backgroundColor: '#1a2332', borderRadius: '16px', padding: '20px' }}>
    <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
      <span>Motion Simulation — Walk Cycle</span>
      <span style={{ color: '#60a5fa' }}>▶ Playing</span>
    </div>
    <div style={{ backgroundColor: '#0d1520', borderRadius: '10px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
      {['🚶', '🚶', '🚶', '🚶', '🚶'].map((_, i) => (
        <div key={i} style={{ backgroundColor: i === 2 ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 2 ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px', opacity: i === 2 ? 1 : 0.5 }}>🧍</div>
          <div style={{ color: i === 2 ? '#60a5fa' : '#4b5563', fontSize: '9px' }}>Frame {i * 6}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{ flex: 1, height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
        <div style={{ width: '40%', height: '100%', backgroundColor: '#60a5fa', borderRadius: '2px' }}></div>
      </div>
      <span style={{ color: '#6b7280', fontSize: '10px' }}>0:02 / 0:05</span>
    </div>
  </div>
)

const plans = [
  {
    name: 'TUKA3D Basic',
    monthly: '$99', yearly: '$950',
    features: ['3D garment simulation', 'Virtual fit models', 'Basic fabric library', 'TUKAcad integration', 'Static renders'],
    popular: false
  },
  {
    name: 'TUKA3D Professional',
    monthly: '$249', yearly: '$2,390',
    features: ['Everything in Basic', 'Motion simulation', 'Advanced fabric physics', 'Photorealistic rendering', 'Multi-size comparison', 'Colorway management'],
    popular: true
  },
  {
    name: 'TUKA3D Enterprise',
    monthly: 'Custom', yearly: 'Custom',
    features: ['Everything in Professional', 'Custom avatar creation', 'PLM integration', 'Team collaboration', 'Dedicated support', 'On-site training'],
    popular: false
  },
]

const TUKA3D = () => {
  const [billing, setBilling] = useState('monthly')

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(59,130,246,0.12)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-4rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/software" style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >← All Software</Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#60a5fa', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>3D Simulation · Virtual Fashion Design</span>
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1rem' }}>TUKA3D</h1>
              <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
                The fashion industry's most advanced 3D apparel fit and virtual fashion design system. Complete with custom virtual fit models and real-time motion simulation.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/register" style={{ backgroundColor: '#3b82f6', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}>
                  Start Free Trial →
                </Link>
                <a href="#pricing" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  See Pricing
                </a>
              </div>
            </div>
            <GarmentIllustration />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: '#0a0f18', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          {[
            { num: '60%', label: 'Reduction in physical samples' },
            { num: 'Real-time', label: 'Motion simulation' },
            { num: '100+', label: 'Fabric presets' },
            { num: '360°', label: 'Garment visualization' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Visualize before you cut
          </h2>
          <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Reduce sampling rounds, get buyer approvals faster, and go to production with confidence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '🧍', title: 'Virtual Fit Models', color: '#3b82f6', desc: 'Dress custom virtual fit models that match your target customer. Define exact measurements, posture, and body shape. Simulate fit across all sizes simultaneously.' },
            { icon: '🌊', title: 'Fabric Physics', color: '#10b981', desc: 'Real-time simulation of how different fabrics drape, stretch and move. Import actual fabric data from physical tests for hyper-accurate virtual samples.' },
            { icon: '🎬', title: 'Motion Simulation', color: '#8b5cf6', desc: 'See how garments move in real-time — walking, sitting, bending. Full motion capture sequences to evaluate ease of movement and comfort.' },
            { icon: '🔗', title: 'TUKAcad Integration', color: '#ea580c', desc: 'Direct integration with TUKAcad. Send patterns to 3D with one click. Changes made in 3D can flow back to 2D patterns automatically.' },
            { icon: '📸', title: 'Photorealistic Renders', color: '#f59e0b', desc: 'Generate high-quality product images for presentations, line sheets, and e-commerce. Multiple lighting setups and background options.' },
            { icon: '📊', title: 'Fit Analysis', color: '#ec4899', desc: 'Automatic stress analysis shows tight, loose, and ideal fit zones on the garment surface. Color-coded visualization makes fit issues immediately obvious.' },
          ].map((f, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#bfdbfe'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(59,130,246,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ width: '48px', height: '48px', backgroundColor: f.color + '18', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '14px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1923', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motion simulation section */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
              <span style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Motion Simulation</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              See how it moves, not just how it looks
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Static renders only show one moment. TUKA3D's motion simulation shows how garments behave during real activities — walking, sitting, raising arms — so you can approve fit with full confidence.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Walk, run, sit, bend — full motion library', 'Real-time fabric response to movement', 'Identify fit issues before production', 'Record and share motion previews with buyers', 'Reduce "surprise" fit problems at final fitting'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#3b82f6', flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <MotionIllustration />
        </div>
      </div>

      {/* Workflow section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            From 2D pattern to 3D sample in minutes
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { step: '01', icon: '✏️', title: 'Create in TUKAcad', desc: 'Design your 2D pattern in TUKAcad with all seams, darts, and grading.' },
            { step: '02', icon: '↗️', title: 'Send to TUKA3D', desc: 'One click sends your pattern pieces directly to the 3D environment.' },
            { step: '03', icon: '👗', title: 'Simulate & Analyze', desc: 'Dress a virtual model, simulate fabric physics, analyze fit zones.' },
            { step: '04', icon: '✅', title: 'Approve & Share', desc: 'Export renders for buyer approval. Send back corrections to 2D.' },
          ].map((s, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', position: 'relative' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#3b82f6', marginBottom: '12px' }}>{s.step}</div>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f1923', marginBottom: '6px' }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>What designers say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { quote: 'TUKA3D reduced our sampling rounds from 4 to 1. We now approve fits virtually and only make a physical sample for the final sign-off.', name: 'Head of Product Development', company: 'Global Apparel Brand' },
              { quote: 'Our buyers love receiving 3D renders before the physical samples. It speeds up approvals and reduces back-and-forth significantly.', name: 'Design Director', company: 'Fashion Retailer' },
              { quote: 'The fabric simulation is incredibly accurate. We can predict how a new fabric will behave before ordering it.', name: 'Senior Pattern Maker', company: 'Sportswear Manufacturer' },
            ].map((t, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ color: '#60a5fa', fontSize: '32px', lineHeight: 1, marginBottom: '16px' }}>"</div>
                <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>{t.quote}</p>
                <div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Pricing</h2>
          <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px', gap: '4px' }}>
            {[['monthly', 'Monthly'], ['yearly', 'Yearly (Save 20%)']].map(([key, label]) => (
              <button key={key} onClick={() => setBilling(key)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: billing === key ? 'white' : 'transparent', color: billing === key ? '#0f1923' : '#6b7280', boxShadow: billing === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ backgroundColor: plan.popular ? '#0f1923' : '#f9f9f9', border: `1px solid ${plan.popular ? 'rgba(59,130,246,0.4)' : '#f0f0f0'}`, borderRadius: '20px', padding: '28px', position: 'relative', transform: plan.popular ? 'scale(1.03)' : 'scale(1)', boxShadow: plan.popular ? '0 24px 60px rgba(59,130,246,0.15)' : 'none' }}>
              {plan.popular && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#3b82f6', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>Most Popular</div>}
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: plan.popular ? '#60a5fa' : '#3b82f6', marginBottom: '16px' }}>{plan.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '40px', fontWeight: 900, color: plan.popular ? 'white' : '#0f1923' }}>{plan[billing]}</span>
                {plan[billing] !== 'Custom' && <span style={{ fontSize: '13px', color: plan.popular ? '#6b7280' : '#9ca3af' }}>{billing === 'monthly' ? '/mo' : '/yr'}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: plan.popular ? 'rgba(59,130,246,0.2)' : '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#3b82f6', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '13px', color: plan.popular ? '#d1d5db' : '#4b5563' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/register" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.popular ? '#3b82f6' : 'transparent', color: plan.popular ? 'white' : '#3b82f6', border: `1.5px solid #3b82f6`, borderRadius: '12px', padding: '12px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                {plan[billing] === 'Custom' ? 'Contact Sales →' : 'Start Free Trial →'}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          See your designs come to life
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Start your 14-day free trial. No credit card required.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ backgroundColor: '#3b82f6', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}>
            Start Free Trial →
          </Link>
          <a href="https://tukatech.com/contact/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  )
}

export default TUKA3D