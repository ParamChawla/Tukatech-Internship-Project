import { Link } from 'react-router-dom'
import { useState } from 'react'

// CSS illustration of a pattern making workspace
const PatternIllustration = () => (
  <div style={{ backgroundColor: '#1a2332', borderRadius: '16px', padding: '24px', fontFamily: 'monospace', position: 'relative', overflow: 'hidden' }}>
    {/* toolbar */}
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f87171' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4ade80' }}></div>
      <div style={{ flex: 1, height: '24px', backgroundColor: '#0f1923', borderRadius: '6px', marginLeft: '8px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <span style={{ color: '#6b7280', fontSize: '11px' }}>TUKAcad — Pattern_A_Front.dxf</span>
      </div>
    </div>

    {/* main canvas area */}
    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 160px', gap: '8px', height: '280px' }}>
      {/* left toolbar */}
      <div style={{ backgroundColor: '#0f1923', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
        {['✏️','⬡','📐','✂️','🔍','↩','⊕'].map((icon, i) => (
          <div key={i} style={{ width: '32px', height: '32px', backgroundColor: i === 0 ? 'rgba(234,88,12,0.3)' : 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: 'pointer' }}>{icon}</div>
        ))}
      </div>

      {/* canvas */}
      <div style={{ backgroundColor: '#0d1520', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
        {/* grid lines */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Pattern piece - bodice front */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Main bodice shape */}
          <path d="M 80 40 L 180 40 L 200 80 L 210 160 L 190 240 L 70 240 L 50 160 L 60 80 Z"
            fill="rgba(234,88,12,0.08)" stroke="#ea580c" strokeWidth="1.5" />
          {/* Dart lines */}
          <line x1="130" y1="40" x2="130" y2="100" stroke="#fb923c" strokeWidth="1" strokeDasharray="4,3"/>
          <line x1="110" y1="240" x2="130" y2="180" stroke="#fb923c" strokeWidth="1" strokeDasharray="4,3"/>
          <line x1="150" y1="240" x2="130" y2="180" stroke="#fb923c" strokeWidth="1" strokeDasharray="4,3"/>
          {/* Grain line */}
          <line x1="130" y1="60" x2="130" y2="220" stroke="#60a5fa" strokeWidth="1"/>
          <polygon points="130,55 126,65 134,65" fill="#60a5fa"/>
          <polygon points="130,225 126,215 134,215" fill="#60a5fa"/>
          {/* Notches */}
          <line x1="60" y1="120" x2="50" y2="120" stroke="#ea580c" strokeWidth="1.5"/>
          <line x1="200" y1="120" x2="210" y2="120" stroke="#ea580c" strokeWidth="1.5"/>
          {/* Label */}
          <text x="120" y="140" fill="#9ca3af" fontSize="10" textAnchor="middle">FRONT BODICE</text>
          <text x="120" y="155" fill="#6b7280" fontSize="8" textAnchor="middle">Cut 1 on fold</text>
        </svg>

        {/* measurement tooltip */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(234,88,12,0.9)', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace' }}>
          W: 45.2cm H: 62.8cm
        </div>
      </div>

      {/* right panel */}
      <div style={{ backgroundColor: '#0f1923', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: '#fb923c', fontSize: '10px', fontWeight: 700, marginBottom: '4px' }}>PROPERTIES</div>
        {[
          { label: 'Piece', value: 'Front Bodice' },
          { label: 'Fabric', value: 'Woven' },
          { label: 'Grain', value: '0°' },
          { label: 'Notches', value: '2' },
          { label: 'Area', value: '28.4 cm²' },
        ].map((p, i) => (
          <div key={i}>
            <div style={{ color: '#4b5563', fontSize: '9px', textTransform: 'uppercase' }}>{p.label}</div>
            <div style={{ color: '#e5e7eb', fontSize: '11px', fontWeight: 600 }}>{p.value}</div>
          </div>
        ))}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
          <div style={{ color: '#4b5563', fontSize: '9px', textTransform: 'uppercase', marginBottom: '6px' }}>SIZES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {['XS','S','M','L','XL'].map((s, i) => (
              <div key={i} style={{ backgroundColor: i === 2 ? 'rgba(234,88,12,0.3)' : 'rgba(255,255,255,0.05)', color: i === 2 ? '#fb923c' : '#6b7280', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* status bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', padding: '4px 8px', backgroundColor: '#0f1923', borderRadius: '6px' }}>
      <span style={{ color: '#6b7280', fontSize: '10px' }}>12 pieces · 5 sizes graded</span>
      <span style={{ color: '#34d399', fontSize: '10px' }}>✓ Saved</span>
    </div>
  </div>
)

// Marker making illustration
const MarkerIllustration = () => (
  <div style={{ backgroundColor: '#1a2332', borderRadius: '16px', padding: '20px' }}>
    <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
      <span>Marker — SS25_Jacket_M.mkr</span>
      <span style={{ color: '#34d399' }}>Efficiency: 89.4%</span>
    </div>
    <div style={{ backgroundColor: '#0d1520', borderRadius: '8px', padding: '12px', position: 'relative', overflow: 'hidden', height: '180px' }}>
      <svg width="100%" height="100%">
        {/* Fabric boundary */}
        <rect x="2" y="2" width="96%" height="96%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="6,4"/>
        {/* Pattern pieces placed */}
        <rect x="8" y="8" width="80" height="100" fill="rgba(234,88,12,0.15)" stroke="#ea580c" strokeWidth="1" rx="2"/>
        <text x="48" y="63" fill="#fb923c" fontSize="8" textAnchor="middle">FRONT</text>
        <rect x="96" y="8" width="75" height="95" fill="rgba(59,130,246,0.15)" stroke="#60a5fa" strokeWidth="1" rx="2"/>
        <text x="134" y="60" fill="#60a5fa" fontSize="8" textAnchor="middle">BACK</text>
        <rect x="178" y="8" width="55" height="90" fill="rgba(16,185,129,0.15)" stroke="#34d399" strokeWidth="1" rx="2"/>
        <text x="206" y="57" fill="#34d399" fontSize="8" textAnchor="middle">SLEEVE</text>
        <rect x="8" y="115" width="60" height="50" fill="rgba(168,85,247,0.15)" stroke="#c084fc" strokeWidth="1" rx="2"/>
        <text x="38" y="144" fill="#c084fc" fontSize="8" textAnchor="middle">COLLAR</text>
        <rect x="75" y="110" width="50" height="55" fill="rgba(234,88,12,0.15)" stroke="#ea580c" strokeWidth="1" rx="2"/>
        <text x="100" y="141" fill="#fb923c" fontSize="8" textAnchor="middle">CUFF</text>
        <rect x="132" y="108" width="45" height="58" fill="rgba(59,130,246,0.15)" stroke="#60a5fa" strokeWidth="1" rx="2"/>
        <text x="155" y="140" fill="#60a5fa" fontSize="8" textAnchor="middle">POCKET</text>
        <rect x="184" y="104" width="48" height="60" fill="rgba(16,185,129,0.15)" stroke="#34d399" strokeWidth="1" rx="2"/>
        <text x="208" y="137" fill="#34d399" fontSize="8" textAnchor="middle">FLAP</text>
        {/* Waste areas */}
        <text x="240" y="50" fill="rgba(239,68,68,0.5)" fontSize="8">waste</text>
      </svg>
    </div>
    <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
      {[{ label: 'Fabric Used', value: '89.4%', color: '#34d399' }, { label: 'Waste', value: '10.6%', color: '#f87171' }, { label: 'Pieces', value: '7', color: '#fb923c' }].map((s, i) => (
        <div key={i}>
          <div style={{ color: s.color, fontSize: '14px', fontWeight: 700 }}>{s.value}</div>
          <div style={{ color: '#6b7280', fontSize: '10px' }}>{s.label}</div>
        </div>
      ))}
    </div>
  </div>
)

const plans = [
  {
    name: 'Learning Edition',
    subtitle: 'For students & educators',
    monthly: '$19', sixmo: '$95', yearly: '$180',
    features: ['TUKAdesign Module', '14 pattern pieces per file', '4 graded sizes per file', 'Markers up to 59×120"', 'Built-in video help', 'All languages included'],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'TUKAdesign CPE',
    subtitle: 'Pattern making & grading',
    monthly: '$99', sixmo: '$500', yearly: '$950',
    features: ['Unlimited pattern pieces', 'Unlimited graded sizes', 'Editable measurement chart', 'Data Import/Export', 'Digitizing', 'All languages included'],
    cta: 'Subscribe Now',
    popular: false
  },
  {
    name: 'TUKAcad CPE',
    subtitle: 'Pattern, grading & marker making',
    monthly: '$199', sixmo: '$1,025', yearly: '$1,900',
    features: ['Everything in TUKAdesign', 'Unlimited marker dimensions', 'Cut data optimization', 'Yield report', 'Advanced features', 'Priority support'],
    cta: 'Subscribe Now',
    popular: true
  },
]

const testimonials = [
  { quote: 'No one else could teach our pattern makers to use CAD systems. Today we are 100% digital, achieving great quality and speed with half the staff.', name: 'Nidhi Dutt', company: 'Orient Craft' },
  { quote: 'Our pattern makers doubled the number of styles that fit correctly. Replacing our other CAD systems with Tukatech was the only way for us to move forward.', name: 'Dinesh Virwani', company: 'Managing Director, Epic Group' },
  { quote: 'It took only 3 days to organize, train, and convert 35 pattern makers to TUKAcad.', name: 'Arshad Sattar', company: 'Timex & Fergasam Group' },
]

const TUKAcad = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.12)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-4rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(234,88,12,0.06)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/software" style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            ← All Software
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CAD Software · Starting at $19/mo</span>
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1rem' }}>
                TUKAcad
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '20px', fontWeight: 300, marginBottom: '1rem', fontStyle: 'italic' }}>
                "In fashion, if it doesn't fit, it doesn't sell."
              </p>
              <p style={{ color: '#9ca3af', fontSize: '16px', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
                Your complete solution for digital pattern making, grading, and marker making. Used by 20,000+ fashion professionals across 42 countries.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(234,88,12,0.3)' }}>
                  Start 14-Day Free Trial →
                </Link>
                <a href="#pricing" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                  See Pricing
                </a>
              </div>
              <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '12px' }}>No credit card required for free trial</p>
            </div>

            {/* Pattern illustration */}
            <PatternIllustration />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: '#0a0f18', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '24px 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          {[
            { num: '20,000+', label: 'Installations worldwide' },
            { num: '42', label: 'Countries' },
            { num: '14 days', label: 'Free trial' },
            { num: '$19/mo', label: 'Starting price' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What is TUKAcad */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              What is TUKAcad?
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              TUKAcad is an advanced Computer-Aided Design (CAD) software tailored specifically for the fashion industry. It empowers professionals and aspiring designers to efficiently create, modify, and grade patterns digitally, as well as generate markers.
            </p>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '2rem' }}>
              By leveraging TUKAcad's powerful features, you can accelerate your design process, reduce waste, and enhance overall productivity.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: '🌍', text: 'All languages in one installation' },
                { icon: '📹', text: 'Built-in video help' },
                { icon: '📋', text: 'Free pattern block templates' },
                { icon: '💳', text: 'Monthly subscription, cancel anytime' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 module cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '✏️', title: 'Digital Pattern Making', color: '#ea580c', desc: 'Transition from paper to digital. Create precise patterns with advanced drafting tools. Minimize errors and allow for easy modifications.' },
              { icon: '📏', title: 'Grading', color: '#3b82f6', desc: 'Create custom grade rules to standardize fit across every style. Half-size grading, angle grading for curves — full size range control.' },
              { icon: '🗺️', title: 'Marker Making', color: '#10b981', desc: 'Leave nothing on the cutting table. Calculate efficient fabric utilization with stripe/plaid matching, buffers, blocking, and robust reports.' },
            ].map((module, i) => (
              <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(234,88,12,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: '44px', height: '44px', backgroundColor: module.color + '18', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{module.icon}</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f1923', marginBottom: '6px' }}>{module.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{module.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marker making section */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <MarkerIllustration />
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
              <span style={{ color: '#ea580c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Marker Making</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Leave nothing on the cutting table
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Calculate efficient fabric utilization, including stripe and plaid matching, buffers, blocking, and more. Share yield and consumption data with robust reports.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Automatic nesting for maximum efficiency', 'Stripe & plaid matching support', 'Buffers and blocking controls', 'Yield and consumption reports', 'Unlimited marker dimensions (CPE)'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#ea580c', flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>All languages. One installation.</h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Every available language is now included in a single TUKAcad installation. Switch languages instantly without reinstalling.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {['English', 'Español', 'Français', 'Deutsch', 'Italiano', 'हिंदी', '中文', 'বাংলা', 'Tiếng Việt', 'ภาษาไทย', '한국어', 'العربية', 'Português', 'Русский'].map((lang, i) => (
            <div key={i} style={{ padding: '8px 16px', backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '999px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
              {lang}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>Trusted by apparel businesses worldwide</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ color: '#fb923c', fontSize: '32px', lineHeight: 1, marginBottom: '16px' }}>"</div>
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
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Flexible Pricing</h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '2rem' }}>Choose the right TUKAcad package for you.</p>
          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px', gap: '4px' }}>
            {[['monthly', 'Monthly'], ['sixmo', 'Every 6 Months'], ['yearly', 'Yearly (Save 20%)']].map(([key, label]) => (
              <button key={key} onClick={() => setBillingPeriod(key)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: billingPeriod === key ? 'white' : 'transparent', color: billingPeriod === key ? '#0f1923' : '#6b7280', boxShadow: billingPeriod === key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ backgroundColor: plan.popular ? '#0f1923' : '#f9f9f9', border: `1px solid ${plan.popular ? 'rgba(234,88,12,0.4)' : '#f0f0f0'}`, borderRadius: '20px', padding: '28px', position: 'relative', transform: plan.popular ? 'scale(1.03)' : 'scale(1)', boxShadow: plan.popular ? '0 24px 60px rgba(234,88,12,0.15)' : 'none' }}>
              {plan.popular && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ea580c', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>Most Popular</div>}
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: plan.popular ? '#fb923c' : '#ea580c', marginBottom: '4px' }}>{plan.name}</h3>
              <p style={{ fontSize: '12px', color: plan.popular ? '#9ca3af' : '#6b7280', marginBottom: '16px' }}>{plan.subtitle}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '40px', fontWeight: 900, color: plan.popular ? 'white' : '#0f1923' }}>{plan[billingPeriod]}</span>
                <span style={{ fontSize: '13px', color: plan.popular ? '#6b7280' : '#9ca3af' }}>{billingPeriod === 'monthly' ? '/mo' : billingPeriod === 'sixmo' ? '/6mo' : '/yr'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: plan.popular ? 'rgba(234,88,12,0.2)' : '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#ea580c', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '13px', color: plan.popular ? '#d1d5db' : '#4b5563' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://www.tukaweb.com/subscriptions/?ref=tukatech" target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.popular ? '#ea580c' : 'transparent', color: plan.popular ? 'white' : '#ea580c', border: `1.5px solid ${plan.popular ? '#ea580c' : '#ea580c'}`, borderRadius: '12px', padding: '12px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '20px' }}>
          Software subscriptions facilitated by TUKAweb, Tukatech's service portal. You will be redirected to TUKAweb to complete checkout.
        </p>
      </div>

      {/* Online Training */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Online Training Available</h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>Learn digital pattern making at your own pace with our in-depth courses.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { title: 'Getting Started with TUKAcad', desc: 'Learn the fundamentals by drafting a graded t-shirt pattern, complete with a nested marker.', price: '$199', tag: 'One-Time Purchase' },
              { title: 'Make a Wrap Dress from a Block', desc: 'Create a stylish ruffled wrap dress from a block pattern using digital pattern making and grading tools.', price: '$99', tag: 'One-Time Purchase' },
              { title: 'Pattern Making for Fashion Design', desc: "As seen on the DVD accompanying the 5th edition of Helen Joseph Armstrong's must-read fashion textbook.", price: 'FREE', tag: 'Free Course' },
            ].map((course, i) => (
              <div key={i} style={{ backgroundColor: 'white', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234,88,12,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ backgroundColor: '#0f1923', borderRadius: '12px', height: '100px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>✏️</div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#ea580c', backgroundColor: '#fff7ed', padding: '3px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{course.tag}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f1923', margin: '10px 0 8px' }}>{course.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, marginBottom: '16px' }}>{course.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#0f1923' }}>{course.price}</span>
                  <a href="https://academy.tukatech.com" target="_blank" rel="noreferrer" style={{ backgroundColor: '#ea580c', color: 'white', fontSize: '12px', fontWeight: 700, padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>Enroll Now →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1923', marginBottom: '16px' }}>🖥 System Requirements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Microsoft Windows® 10 or later', 'Intel® Core i5® processor (7th Gen. or better)', 'Active internet connection required', '8GB RAM recommended'].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ea580c', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '13px', color: '#4b5563' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1923', marginBottom: '16px' }}>🍎 Mac Users</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, marginBottom: '12px' }}>
              Install Windows® virtually using a tool such as Bootcamp, Parallels, or VMWare Fusion.
            </p>
            <a href="mailto:support@tukatech.com" style={{ color: '#ea580c', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Contact support for Mac installation help →</a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Ready to go digital?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Try TUKAcad free for 14 days. No credit card required.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
            Start Free Trial →
          </Link>
          <a href="https://tukatech.com/contact/" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
            Talk to a Specialist
          </a>
        </div>
      </div>
    </div>
  )
}

export default TUKAcad