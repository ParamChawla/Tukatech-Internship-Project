import { Link } from 'react-router-dom'

const timeline = [
  { year: '1995', event: 'Tukatech becomes the first fashion technology company to make an open CAD system that works with every other CAD system and any CAM hardware.' },
  { year: '2000', event: 'Ram Sareen chosen as Top 20 Most Influential in the Fashion Industry.' },
  { year: '2001', event: 'First to make worldwide TUKAcenters, and introduce an online service portal, TUKAweb, bringing unparalleled customer service to users everywhere.' },
  { year: '2004', event: 'First to partner with Kinko\'s (now FedEx Office) to offer plotting services at 1,248 locations in 10 countries.' },
  { year: '2007', event: 'Ranked #1 on Apparel Magazine\'s Software Scorecard: Best All Around.' },
  { year: '2012', event: 'First to implement a microfactory for on-demand manufacturing in an apparel business model.' },
  { year: '2016', event: 'First to offer cloud-based CAD licensing so students worldwide could learn fashion technology systems.' },
  { year: '2017', event: 'Selected by CIO Review as Most Promising Textile and Apparel Technology Provider.' },
  { year: '2018', event: 'Ram Sareen honored by LA Business Journal with Fashion Award for Technology Innovation.' },
  { year: '2020', event: 'First in fashion to create a fully automatic pattern making and grading system — TUKA APM.' },
  { year: '2021', event: 'First fashion tech company to offer digital assets for personal and professional use in CAD, PDF, and 3D form.' },
  { year: '2022', event: 'Launched TUKA3D 2022 as the first open 3D system for the fashion industry.' },
  { year: '2024', event: 'Launched Los Angeles Innovation Center to support nearshoring for outsourced operations.' },
]

const blogPosts = [
  { title: 'The Biggest Disruption of My Adult Life', category: 'Tukatalks', excerpt: 'Ram Sareen outlines how you can connect fashion into one eco-system for maximum efficiency.' },
  { title: 'Virtual Garments, Real Efficiency: How Digital Fashion Cuts Sampling & Speeds Design', category: 'Fashion Industry Insight', excerpt: 'Brands have reduced sample creation by 50% using 3D tools. Digital transformation is not only viable but essential.' },
  { title: 'Fabric First: Why Materials Requirement Planning Should Be Your Top Priority', category: 'Fashion Industry Insight', excerpt: 'Fabric is your single largest cost in garment production — often 50–70% of the total cost. Every inch wasted is profit lost.' },
  { title: 'Use Your Design, Development, and Fabric Utilization Systems Properly', category: 'News', excerpt: 'Ram Sareen outlines the steps taken to re-engineer your processes and move forward from outdated methods.' },
  { title: 'Marta Miller | Staying Proactive in an Ever-Changing Industry', category: 'Tukatalks', excerpt: 'Marta Miller discusses positive takeaways in the ongoing tariff situation and the importance of being proactive.' },
  { title: 'Nitish Varshney Joins Tukatech as Director of Digital Manufacturing Initiatives', category: 'News', excerpt: 'Tukatech announces the appointment of Nitish Varshney as Director – Digital Manufacturing Initiatives for Global Programs.' },
]

const categoryColors = {
  'Tukatalks': { bg: '#fff7ed', color: '#ea580c' },
  'Fashion Industry Insight': { bg: '#eff6ff', color: '#3b82f6' },
  'News': { bg: '#f0fdf4', color: '#16a34a' },
  'Customer Spotlight': { bg: '#fdf4ff', color: '#9333ea' },
}

const About = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f1923', padding: '10rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(234,88,12,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '-4rem', width: '20rem', height: '20rem', backgroundColor: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid rgba(234,88,12,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#fb923c', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Est. 1995 · Los Angeles</span>
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1rem' }}>
            Disruptive Technologists
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '20px', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.7, fontStyle: 'italic' }}>
            "We have been labeled disruptive technologists since day one."
          </p>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            We believe in empowering our users with powerful tools to face the challenges of the fashion industry with confidence, free from technical challenges and restrictions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ backgroundColor: '#0a0f18', padding: '48px 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {[
            { num: '+20,000', label: 'Installations of Tukatech systems' },
            { num: '42', label: 'Countries using Tukatech systems' },
            { num: '+10,000', label: 'Replacements of competitive systems' },
            { num: 'Multiple', label: 'Languages available for TUKAcad' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: 'white', background: 'linear-gradient(135deg, #fb923c, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px', lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              About Tukatech
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Tukatech applications combine the artistry of traditional fashion production with the efficiency of modern manufacturing, culminating in an end-to-end fashion technology powerhouse. We simplify design and development processes and create fashion technology that companies of every size use to bring the right product to the consumer at the right time.
            </p>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Over two decades later, Tukatech continues to transform fashion businesses with simple, straightforward end-to-end fashion technology systems. We are truly an international company, with a presence in 6 continents and 42 countries, yet we remain devoted to exceptional customer service.
            </p>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.8 }}>
              We endeavor to continue the fashion technology revolution forever!
            </p>
          </div>

          {/* Founder card */}
          <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '24px', padding: '32px' }}>
            <div style={{ width: '72px', height: '72px', backgroundColor: '#ea580c', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>👨‍💼</div>
            <div style={{ color: '#ea580c', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Founder & CEO</div>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f1923', marginBottom: '12px' }}>Ram Sareen</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Ram Sareen founded Tukatech in 1995 with a simple mission: make fashion technology accessible to every apparel professional in the world. Named Top 20 Most Influential in the Fashion Industry, honored with the LA Business Journal Fashion Award for Technology Innovation, and the driving force behind every major Tukatech innovation.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['🏆 Top 20 Most Influential', '🎖️ LA Business Journal Award', '🚀 Fashion Tech Pioneer'].map((tag, i) => (
                <span key={i} style={{ fontSize: '11px', color: '#ea580c', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '999px', padding: '4px 10px', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Tukatech Timeline</h2>
            <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              We were the first to do a lot of things — we consider ourselves true innovators. The revolution we started in 1995 is in the DNA of every Tukatech employee.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 4rem' }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fff7ed', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#ea580c', fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>{item.year.slice(2)}</span>
                  </div>
                  {i < timeline.length - 2 && <div style={{ width: '2px', flex: 1, minHeight: '16px', backgroundColor: '#f0ece4', marginTop: '4px' }}></div>}
                </div>
                <div style={{ paddingTop: '10px', paddingBottom: '8px' }}>
                  <div style={{ color: '#ea580c', fontSize: '13px', fontWeight: 800, fontFamily: 'monospace', marginBottom: '6px' }}>{item.year}</div>
                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.6 }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HQ */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em' }}>Global Headquarters</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            { title: 'World Headquarters', flag: '🇺🇸', address: '5462 Jillson Street\nLos Angeles, CA, USA 90040', phone: '+1-323-726-3836', email: 'tukateam@tukatech.com', color: '#ea580c' },
            { title: 'Asia Headquarters', flag: '🇮🇳', address: 'GP 42, Sector 18\nGurugram, Haryana, India', phone: '+91-97-1100-8946\n+91-124-2347801', email: 'support@tukatech.com', color: '#3b82f6' },
          ].map((hq, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', border: '1px solid #f0f0f0', borderRadius: '20px', padding: '32px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fed7aa'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(234,88,12,0.06)'; e.currentTarget.style.backgroundColor = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.backgroundColor = '#f9f9f9' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '36px' }}>{hq.flag}</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: hq.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tukatech</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f1923' }}>{hq.title}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: '📍', value: hq.address },
                  { icon: '📞', value: hq.phone },
                  { icon: '✉️', value: hq.email, isEmail: true, color: hq.color },
                ].map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                    {item.isEmail ? (
                      <a href={`mailto:${item.value}`} style={{ color: item.color, fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>{item.value}</a>
                    ) : (
                      <span style={{ color: '#4b5563', fontSize: '14px', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog / Latest Content */}
      <div style={{ backgroundColor: '#0f1923', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>The Latest Tukatech Content</h2>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>Insights, news, and stories from the world of fashion technology.</p>
            </div>
            <a href="https://tukatech.com/fashion-industry-insight/" target="_blank" rel="noreferrer" style={{ color: '#fb923c', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>View all posts →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {blogPosts.map((post, i) => {
              const cat = categoryColors[post.category] || categoryColors['News']
              return (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(234,88,12,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ backgroundColor: cat.bg, color: cat.color, fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                    {post.category}
                  </div>
                  <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, lineHeight: 1.4, marginBottom: '10px' }}>{post.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.7 }}>{post.excerpt}</p>
                  <div style={{ color: '#ea580c', fontSize: '13px', fontWeight: 600, marginTop: '16px' }}>Read more →</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mission CTA */}
      <div style={{ backgroundColor: '#fff7ed', padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#0f1923', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            The fashion technology revolution continues.
          </h2>
          <p style={{ color: '#92400e', fontSize: '18px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Join 20,000+ fashion professionals in 42 countries who use Tukatech to design faster, sample smarter, and produce with confidence.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(234,88,12,0.35)' }}>
              Get Started Free →
            </Link>
            <Link to="/contact" style={{ color: '#ea580c', fontWeight: 700, fontSize: '16px', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', border: '2px solid #ea580c' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About