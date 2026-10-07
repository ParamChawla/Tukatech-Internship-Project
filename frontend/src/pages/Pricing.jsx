import { useState } from 'react'
import { Link } from 'react-router-dom'

const softwarePlans = [
  {
    name: 'TUKAcad Learning Edition',
    category: 'TUKAcad',
    monthly: 19, yearly: 180,
    desc: 'For fashion students and educators',
    features: ['TUKAdesign Module', '14 pattern pieces per file', '4 graded sizes per file', 'Markers up to 59×120"', 'Video help included'],
    color: '#ea580c',
    cta: 'Start Free Trial',
    href: 'https://www.tukaweb.com/subscriptions/?ref=tukatech'
  },
  {
    name: 'TUKAdesign CPE',
    category: 'TUKAcad',
    monthly: 99, yearly: 950,
    desc: 'Pattern making & grading',
    features: ['Unlimited pattern pieces', 'Unlimited graded sizes', 'Editable measurement chart', 'Data Import/Export', 'Digitizing'],
    color: '#ea580c',
    cta: 'Subscribe Now',
    href: 'https://www.tukaweb.com/subscriptions/?ref=tukatech'
  },
  {
    name: 'TUKAcad CPE',
    category: 'TUKAcad',
    monthly: 199, yearly: 1900,
    desc: 'Full pattern, grading & marker making',
    features: ['Everything in TUKAdesign', 'Unlimited marker dimensions', 'Cut data optimization', 'Yield reports', 'Advanced features'],
    color: '#ea580c',
    popular: true,
    cta: 'Subscribe Now',
    href: 'https://www.tukaweb.com/subscriptions/?ref=tukatech'
  },
  {
    name: 'TUKA3D Basic',
    category: 'TUKA3D',
    monthly: 99, yearly: 950,
    desc: '3D virtual sampling essentials',
    features: ['3D garment simulation', 'Virtual fit models', 'Basic fabric library', 'TUKAcad integration'],
    color: '#3b82f6',
    cta: 'Start Free Trial',
    href: '/register'
  },
  {
    name: 'TUKA3D Professional',
    category: 'TUKA3D',
    monthly: 249, yearly: 2390,
    desc: 'Full 3D design & simulation',
    features: ['Everything in Basic', 'Motion simulation', 'Advanced fabric physics', 'Photorealistic renders', 'Colorway management'],
    color: '#3b82f6',
    popular: true,
    cta: 'Start Free Trial',
    href: '/register'
  },
  {
    name: 'TUKAcloud Starter',
    category: 'TUKAcloud',
    monthly: 29, yearly: 290,
    desc: 'Cloud collaboration for small teams',
    features: ['Up to 3 users', '10GB storage', 'File upload & share', 'Comments', 'Basic activity feed'],
    color: '#06b6d4',
    cta: 'Start Free Trial',
    href: '/register'
  },
  {
    name: 'TUKAcloud Professional',
    category: 'TUKAcloud',
    monthly: 79, yearly: 750,
    desc: 'Full cloud platform for growing teams',
    features: ['Up to 15 users', '100GB storage', 'All Starter features', 'Collections management', 'Team workspaces', 'Priority support'],
    color: '#06b6d4',
    popular: true,
    cta: 'Start Free Trial',
    href: '/register'
  },
]

const categories = ['All', 'TUKAcad', 'TUKA3D', 'TUKAcloud']

const Pricing = () => {
  const [billing, setBilling] = useState('monthly')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = softwarePlans.filter(p => activeCategory === 'All' || p.category === activeCategory)

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-4rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Simple, Transparent Pricing</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Plans that scale with your team.
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Start free for 14 days. No credit card required.
          </p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '4px', gap: '4px' }}>
            {[['monthly', 'Monthly'], ['yearly', 'Yearly (Save ~20%)']].map(([key, label]) => (
              <button key={key} onClick={() => setBilling(key)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: billing === key ? 'white' : 'transparent', color: billing === key ? '#0f1923' : '#9ca3af', transition: 'all 0.2s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem 0' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 20px', borderRadius: '999px', border: `1px solid ${activeCategory === cat ? '#ea580c' : '#e5e7eb'}`, backgroundColor: activeCategory === cat ? '#fff7ed' : 'white', color: activeCategory === cat ? '#ea580c' : '#6b7280', fontSize: '13px', fontWeight: activeCategory === cat ? 700 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
          {filtered.map((plan, i) => (
            <div key={i} style={{ backgroundColor: plan.popular ? '#0f1923' : '#f9f9f9', border: `1px solid ${plan.popular ? plan.color + '44' : '#f0f0f0'}`, borderRadius: '20px', padding: '28px', position: 'relative', boxShadow: plan.popular ? `0 24px 60px ${plan.color}22` : 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
              onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)' } }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: plan.color, color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 16px', borderRadius: '999px', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Most Popular
                </div>
              )}

              <div style={{ fontSize: '10px', fontWeight: 700, color: plan.color, backgroundColor: plan.color + '18', border: `1px solid ${plan.color}33`, borderRadius: '999px', padding: '3px 10px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                {plan.category}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: plan.popular ? 'white' : '#0f1923', marginBottom: '4px' }}>{plan.name}</h3>
              <p style={{ fontSize: '12px', color: plan.popular ? '#9ca3af' : '#6b7280', marginBottom: '16px' }}>{plan.desc}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', color: plan.popular ? '#9ca3af' : '#6b7280' }}>$</span>
                <span style={{ fontSize: '40px', fontWeight: 900, color: plan.popular ? 'white' : '#0f1923' }}>
                  {billing === 'monthly' ? plan.monthly : Math.round(plan.yearly / 12)}
                </span>
                <span style={{ fontSize: '13px', color: plan.popular ? '#6b7280' : '#9ca3af' }}>/mo</span>
              </div>

              {billing === 'yearly' && (
                <div style={{ fontSize: '12px', color: '#34d399', marginBottom: '16px', fontWeight: 600 }}>
                  ${plan.yearly}/yr — save ${(plan.monthly * 12) - plan.yearly}/yr
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: plan.popular ? plan.color + '33' : plan.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: plan.color, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '13px', color: plan.popular ? '#d1d5db' : '#4b5563' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href={plan.href} target={plan.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.popular ? plan.color : 'transparent', color: plan.popular ? 'white' : plan.color, border: `1.5px solid ${plan.color}`, borderRadius: '12px', padding: '12px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.backgroundColor = plan.color; e.currentTarget.style.color = 'white' } }}
                onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = plan.color } }}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Need a custom solution?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          For large manufacturers, custom integrations, on-premise deployment, or volume licensing — talk to our team.
        </p>
        <Link to="/contact" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
          Contact Sales →
        </Link>
      </div>
    </div>
  )
}

export default Pricing