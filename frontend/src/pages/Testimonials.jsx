import { Link } from 'react-router-dom'

const testimonials = [
  {
    quote: 'No one else could teach our pattern makers to use CAD systems. Today we are 100% digital, achieving great quality and speed with half the staff.',
    name: 'Nidhi Dutt',
    company: 'Orient Craft',
    category: 'TUKAcad',
    region: '🇮🇳 India'
  },
  {
    quote: 'Our pattern makers doubled the number of styles that fit correctly. Replacing our other CAD systems with Tukatech was the only way for us to move forward.',
    name: 'Dinesh Virwani',
    title: 'Managing Director',
    company: 'Epic Group',
    category: 'TUKAcad',
    region: '🌏 Asia'
  },
  {
    quote: 'It took only 3 days to organize, train, and convert 35 pattern makers to TUKAcad.',
    name: 'Arshad Sattar',
    company: 'Timex & Fergasam Group',
    category: 'TUKAcad',
    region: '🌍 Global'
  },
  {
    quote: 'TUKA3D reduced our sampling rounds from 4 to 1. We now approve fits virtually and only make a physical sample for the final sign-off.',
    name: 'Head of Product Development',
    company: 'Global Apparel Brand',
    category: 'TUKA3D',
    region: '🌍 Global'
  },
  {
    quote: 'Our buyers love receiving 3D renders before the physical samples. It speeds up approvals and reduces back-and-forth significantly.',
    name: 'Design Director',
    company: 'International Fashion Retailer',
    category: 'TUKA3D',
    region: '🇺🇸 USA'
  },
  {
    quote: 'The fabric simulation is incredibly accurate. We can predict how a new fabric will behave before ordering it — saving thousands in sampling costs.',
    name: 'Senior Pattern Maker',
    company: 'Sportswear Manufacturer',
    category: 'TUKA3D',
    region: '🇪🇺 Europe'
  },
  {
    quote: 'SMARTmark consistently achieves higher fabric utilization than our manual markers. We saved 5% on fabric costs in the first month alone.',
    name: 'Production Manager',
    company: 'Denim Manufacturer',
    category: 'SMARTmark',
    region: '🇧🇩 Bangladesh'
  },
  {
    quote: 'TUKAcloud made it possible for our LA design team to collaborate with our Mumbai pattern room in real time. Game changer.',
    name: 'Creative Director',
    company: 'Fashion Brand',
    category: 'TUKAcloud',
    region: '🇺🇸 USA'
  },
  {
    quote: 'TUKAcut has been running 24/7 for two years without a single breakdown. The ROI was clear within six months.',
    name: 'Factory Manager',
    company: 'Apparel Manufacturer',
    category: 'Hardware',
    region: '🌏 Asia'
  },
  {
    quote: 'Switching from Lectra to Tukatech was the best decision we made. Better technology, better support, and a fraction of the annual maintenance cost.',
    name: 'Operations Director',
    company: 'Knitwear Manufacturer',
    category: 'TUKAcad',
    region: '🇵🇰 Pakistan'
  },
  {
    quote: 'TUKA APM cut our pattern development time from days to hours. Our technical team was skeptical at first — now they won\'t work without it.',
    name: 'Technical Director',
    company: 'Fast Fashion Brand',
    category: 'TUKA APM',
    region: '🇬🇧 UK'
  },
  {
    quote: 'The training resources are exceptional. Our team was fully productive within a week of installation — that\'s unheard of with CAD systems.',
    name: 'Training Manager',
    company: 'Fashion Institute',
    category: 'Education',
    region: '🇺🇸 USA'
  },
]

const categoryColors = {
  'TUKAcad': { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
  'TUKA3D': { bg: '#eff6ff', color: '#3b82f6', border: '#bfdbfe' },
  'SMARTmark': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  'TUKAcloud': { bg: '#ecfeff', color: '#0891b2', border: '#a5f3fc' },
  'Hardware': { bg: '#fdf4ff', color: '#9333ea', border: '#e9d5ff' },
  'TUKA APM': { bg: '#f5f3ff', color: '#7c3aed', border: '#ddd6fe' },
  'Education': { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
}

const Testimonials = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Customer Testimonials</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            20,000+ installations.<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Countless success stories.
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            From independent designers to global manufacturers — here's what Tukatech customers say.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: '#0a0f18', padding: '32px 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          {[
            { num: '20,000+', label: 'Installations' },
            { num: '10,000+', label: 'Competitor replacements' },
            { num: '42', label: 'Countries' },
            { num: '500+', label: 'Fashion institutes' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>{s.num}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials masonry grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ columns: '3', columnGap: '20px' }}>
          {testimonials.map((t, i) => {
            const cat = categoryColors[t.category] || categoryColors['TUKAcad']
            return (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: '20px', backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '24px', transition: 'all 0.2s', display: 'inline-block', width: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = cat.border; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${cat.color}15` }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Category + Region */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ backgroundColor: cat.bg, color: cat.color, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', border: `1px solid ${cat.border}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.category}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '12px' }}>{t.region}</span>
                </div>

                {/* Quote */}
                <div style={{ color: cat.color, fontSize: '28px', lineHeight: 1, marginBottom: '10px' }}>"</div>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>
                  {t.quote}
                </p>

                {/* Attribution */}
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: cat.color, fontSize: '14px', flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ color: '#0f1923', fontSize: '13px', fontWeight: 700 }}>{t.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>{t.title ? `${t.title}, ` : ''}{t.company}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Join 20,000+ fashion professionals.
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Start your 14-day free trial. No credit card required.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
            Get Started Free →
          </Link>
          <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Testimonials