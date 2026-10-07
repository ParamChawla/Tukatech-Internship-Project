import { Link } from 'react-router-dom'

const ProductPage = ({ product }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '-8rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(234,88,12,0.06)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/software" style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '2rem' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            ← Back to Software
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: `${product.color}18`, border: `1px solid ${product.color}33`,
                borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem'
              }}>
                <span style={{ color: product.color, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.tag}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
                {product.name}
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '480px' }}>
                {product.desc}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/register" style={{
                  backgroundColor: '#ea580c', color: 'white', fontWeight: 700,
                  fontSize: '15px', padding: '14px 28px', borderRadius: '14px',
                  textDecoration: 'none', boxShadow: '0 8px 24px rgba(234,88,12,0.3)'
                }}>
                  Start Free Trial →
                </Link>
                <a href="#features" style={{
                  color: 'rgba(255,255,255,0.7)', fontWeight: 600,
                  fontSize: '15px', padding: '14px 28px', borderRadius: '14px',
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  See Features
                </a>
              </div>
            </div>

            {/* Right side mockup */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px', padding: '32px', textAlign: 'center'
            }}>
              {product.heroImage ? (
                <img src={product.heroImage} alt={`${product.name} software workspace`} style={{ display: 'block', width: '100%', maxHeight: '360px', objectFit: 'cover', borderRadius: '14px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
              ) : (
                <div style={{ fontSize: '80px', marginBottom: '16px' }}>{product.icon}</div>
              )}
              <div style={{ color: 'white', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{product.name}</div>
              <div style={{ color: '#6b7280', fontSize: '14px' }}>{product.tagline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            What {product.name} can do
          </h2>
          <p style={{ color: '#6b7280', fontSize: '17px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            {product.featuresIntro}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {product.features.map((feature, i) => (
            <div key={i} style={{
              backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0',
              borderRadius: '16px', padding: '24px', transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234,88,12,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f1923', marginBottom: '8px' }}>{feature.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Ready to try {product.name}?
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '17px', marginBottom: '2.5rem' }}>Start your 14-day free trial. No credit card required.</p>
        <Link to="/register" style={{
          backgroundColor: '#ea580c', color: 'white', fontWeight: 700,
          fontSize: '16px', padding: '16px 36px', borderRadius: '16px',
          textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)'
        }}>
          Get Started Free →
        </Link>
      </div>
    </div>
  )
}

export default ProductPage
