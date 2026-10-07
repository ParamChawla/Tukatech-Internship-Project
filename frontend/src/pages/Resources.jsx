const Resources = () => {
  const categories = [
    {
      title: 'Online Training',
      icon: '🎓',
      color: '#ea580c',
      desc: 'Self-paced courses for TUKAcad, TUKA3D, TUKAcloud and more. Learn at your own pace with built-in video instruction.',
      links: [
        { label: 'Getting Started with TUKAcad', href: 'https://academy.tukatech.com/p/getting-started-with-tukacad' },
        { label: 'Pattern Making for Fashion Design', href: 'https://academy.tukatech.com/p/patternmaking-for-fashion-design' },
        { label: 'Getting Started with TUKA3D', href: 'https://academy.tukatech.com/p/getting-started-with-tuka3d' },
        { label: 'Getting Started with TUKAcloud', href: 'https://academy.tukatech.com/p/tukacloud-course-bundle' },
      ],
      cta: 'Browse All Courses',
      ctaHref: 'https://academy.tukatech.com'
    },
    {
      title: 'Fashion Education',
      icon: '🏫',
      color: '#3b82f6',
      desc: 'Tukatech partners with 500+ fashion institutes worldwide. Educators and students get special pricing on all software.',
      links: [
        { label: 'Educational pricing available', href: '/contact' },
        { label: 'Institute partnership program', href: '/contact' },
        { label: 'Student learning edition', href: '/software/tukacad' },
        { label: 'Curriculum resources', href: '/contact' },
      ],
      cta: 'Partner With Us',
      ctaHref: '/contact'
    },
    {
      title: 'TUKAtips',
      icon: '💡',
      color: '#10b981',
      desc: 'Quick tips, tricks, and tutorials from Tukatech experts. Short-form video content to help you get more from your software.',
      links: [
        { label: 'Pattern making tips', href: 'https://tukatech.com/tukatips/' },
        { label: 'Grading shortcuts', href: 'https://tukatech.com/tukatips/' },
        { label: 'Marker making efficiency', href: 'https://tukatech.com/tukatips/' },
        { label: '3D simulation tricks', href: 'https://tukatech.com/tukatips/' },
      ],
      cta: 'View All TUKAtips',
      ctaHref: 'https://tukatech.com/tukatips/'
    },
    {
      title: 'TUKAcenters',
      icon: '📍',
      color: '#8b5cf6',
      desc: 'Find an authorized Tukatech training and support center near you. In-person training, demos, and technical support.',
      links: [
        { label: 'Find centers in USA', href: 'https://tukatech.com/tukacenters/' },
        { label: 'Find centers in Asia', href: 'https://tukatech.com/tukacenters/' },
        { label: 'Find centers in Europe', href: 'https://tukatech.com/tukacenters/' },
        { label: 'Become a TUKAcenter', href: '/contact' },
      ],
      cta: 'Find a TUKAcenter',
      ctaHref: 'https://tukatech.com/tukacenters/'
    },
    {
      title: 'Blog & Insights',
      icon: '📝',
      color: '#ec4899',
      desc: 'Industry insights, product updates, case studies, and fashion technology news from the Tukatech team.',
      links: [
        { label: 'Fashion tech trends', href: 'https://tukatech.com/fashion-industry-insight/' },
        { label: 'Customer success stories', href: 'https://tukatech.com/fashion-industry-insight/' },
        { label: 'Product updates', href: 'https://tukatech.com/category/news/' },
        { label: 'Tukatalks podcast', href: 'https://tukatech.com/tukatalks/' },
      ],
      cta: 'Read the Blog',
      ctaHref: 'https://tukatech.com/fashion-industry-insight/'
    },
    {
      title: 'Career Connection',
      icon: '💼',
      color: '#f59e0b',
      desc: 'The fashion industry job portal. Connect fashion professionals with apparel companies seeking Tukatech-trained talent.',
      links: [
        { label: 'Browse fashion jobs', href: 'https://tukatech.com/fashion-job-portal/' },
        { label: 'Post a job opening', href: 'https://tukatech.com/fashion-job-portal/' },
        { label: 'Pattern maker roles', href: 'https://tukatech.com/fashion-job-portal/' },
        { label: 'CAD technician roles', href: 'https://tukatech.com/fashion-job-portal/' },
      ],
      cta: 'Visit Career Connection',
      ctaHref: 'https://tukatech.com/fashion-job-portal/'
    },
  ]

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Resources & Education</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Everything you need to<br />
            <span style={{ background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              master fashion technology.
            </span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Training courses, support centers, industry insights, and career tools — all in one place.
          </p>
        </div>
      </div>

      {/* Resources grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {categories.map((cat, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '28px', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(234,88,12,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: cat.color + '18', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f1923' }}>{cat.title}</h3>
              </div>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{cat.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                {cat.links.map((link, j) => (
                  <a key={j} href={link.href} target={link.href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ color: cat.color, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    → {link.label}
                  </a>
                ))}
              </div>
              <a href={cat.ctaHref} target={cat.ctaHref.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ display: 'inline-block', backgroundColor: cat.color + '15', color: cat.color, border: `1px solid ${cat.color}33`, borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = cat.color; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = cat.color + '15'; e.currentTarget.style.color = cat.color }}
              >
                {cat.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resources
