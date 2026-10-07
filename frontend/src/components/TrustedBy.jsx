const brands = [
  'Orient Craft', 'Epic Group', 'Timex Group', 'Pima College',
  'SUNY Ulster', 'Chaffey College', 'Stringking', 'Freedom Rave Wear',
  'Black Design Collective', 'Combined Fabrics'
]

const TrustedBy = () => {
  return (
    <section style={{ backgroundColor: '#0a0f18', padding: '4rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Trusted by apparel professionals worldwide
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
          {brands.map((brand, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '10px 20px', color: '#6b7280', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#e5e7eb' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#6b7280' }}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy