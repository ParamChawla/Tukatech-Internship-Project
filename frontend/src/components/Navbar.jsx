import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuthStore from '../store/authStore'

const softwareLinks = [
  { label: 'TUKA APM', desc: 'AI automatic pattern making', to: '/software/tuka-apm' },
  { label: 'TUKAcad', desc: 'Pattern making & grading', to: '/software/tukacad' },
  { label: 'SMARTmark', desc: 'Marker making', to: '/software/smartmark' },
  { label: 'TUKAstudio', desc: 'Textile & print design', to: '/software/tukastudio' },
  { label: 'TUKA3D', desc: '3D fit & virtual design', to: '/software/tuka3d' },
  { label: 'TUKA3D DE', desc: '3D designer edition', to: '/software/tuka3d-de' },
  { label: 'TUKAcloud', desc: 'Digital sample room', to: '/software/tukacloud' },
]

const hardwareLinks = [
  { label: 'TUKAjet', desc: 'CAD plotters & printers', to: '/hardware/tukajet' },
  { label: 'TUKAspread', desc: 'Fabric spreading machines', to: '/hardware/tukaspread' },
  { label: 'TUKAcut', desc: 'Automatic fabric cutting', to: '/hardware/tukacut' },
  { label: 'TUKAcut Rotary', desc: 'Rotary cutting machine', to: '/hardware/tukacut-rotary' },
  { label: 'TUKAcut Laser', desc: 'Laser cutting machine', to: '/hardware/tukacut-laser' },
  { label: 'TUKA INA', desc: 'Intelligent sewing system', to: '/hardware/tukaina' },
]

const resourceLinks = [
  { label: 'Online Training', desc: 'TUKA Academy courses', to: '/resources/training' },
  { label: 'Fashion Education', desc: 'Institutes & programs', to: '/resources/education' },
  { label: 'TUKAtips', desc: 'Tips & tutorials', to: '/resources/tukatips' },
  { label: 'TUKAcenters', desc: 'Global support centers', to: '/resources/tukacenters' },
  { label: 'Blog', desc: 'Industry insights', to: '/resources/blog' },
  { label: 'Career Connection', desc: 'Fashion job portal', to: '/resources/careers' },
]

const aboutLinks = [
  { label: 'About Us', desc: 'Our story and mission', to: '/about' },
  { label: 'Customer Testimonials', desc: 'Success stories', to: '/about/testimonials' },
  { label: 'News', desc: 'Latest updates', to: '/resources/blog' },
  { label: 'Contact Us', desc: 'Get in touch', to: '/contact' },
]

const Dropdown = ({ links }) => (
  <div style={{
    position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white', borderRadius: '16px',
    border: '1px solid #f0f0f0',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    padding: '8px', minWidth: '260px', zIndex: 200
  }}>
    {links.map((link) => (
      <Link key={link.to} to={link.to} style={{ textDecoration: 'none' }}>
        <div style={{ padding: '10px 12px', borderRadius: '10px', transition: 'background 0.15s', display: 'flex', flexDirection: 'column', gap: '2px' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff7ed'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{ color: '#0f1923', fontSize: '13px', fontWeight: 600 }}>{link.label}</span>
          <span style={{ color: '#9ca3af', fontSize: '11px' }}>{link.desc}</span>
        </div>
      </Link>
    ))}
  </div>
)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
    setMenuOpen(false)
  }, [location])

  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled
  const textColor = transparent ? 'rgba(255,255,255,0.85)' : '#374151'

  const navItems = [
    { label: 'Software', dropdown: softwareLinks },
    { label: 'Hardware', dropdown: hardwareLinks },
    { label: 'Smart Factories', to: '/smart-factories' },
    { label: 'Resources', dropdown: resourceLinks },
    { label: 'About', dropdown: aboutLinks },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
    { label: 'Solution Finder', to: '/solution-finder' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: transparent ? 'transparent' : 'rgba(255,255,255,0.96)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: transparent ? 'none' : '1px solid #f0f0f0',
      transition: 'all 0.3s'
    }}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: '34px', height: '34px', backgroundColor: '#ea580c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '15px' }}>T</span>
          </div>
          <span style={{ fontWeight: 900, fontSize: '17px', letterSpacing: '-0.01em', color: transparent ? 'white' : '#0f1923' }}>TUKATECH</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {navItems.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
            >
              {item.to ? (
                <Link to={item.to} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 500, color: textColor, transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.backgroundColor = transparent ? 'rgba(255,255,255,0.1)' : '#fff7ed' }}
                  onMouseLeave={e => { e.currentTarget.style.color = textColor; e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  {item.label}
                </Link>
              ) : (
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: openDropdown === item.label ? '#ea580c' : textColor, backgroundColor: openDropdown === item.label ? (transparent ? 'rgba(255,255,255,0.1)' : '#fff7ed') : 'transparent', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ea580c'; e.currentTarget.style.backgroundColor = transparent ? 'rgba(255,255,255,0.1)' : '#fff7ed' }}
                  onMouseLeave={e => { if (openDropdown !== item.label) { e.currentTarget.style.color = textColor; e.currentTarget.style.backgroundColor = 'transparent' } }}
                >
                  {item.label}
                  <span style={{ fontSize: '10px', transition: 'transform 0.2s', display: 'inline-block', transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                </button>
              )}
              {item.dropdown && openDropdown === item.label && (
                <Dropdown links={item.dropdown} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {user ? (
            <Link to="/dashboard" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(234,88,12,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,88,12,0.3)' }}
            >
              Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: '13px', fontWeight: 500, color: textColor, textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ea580c' }}
                onMouseLeave={e => { e.currentTarget.style.color = textColor }}
              >
                Sign in
              </Link>
              <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '13px', padding: '9px 18px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(234,88,12,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,88,12,0.3)' }}
              >
                Get Started →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{ overflow: 'hidden', transition: 'max-height 0.3s', maxHeight: menuOpen ? '500px' : '0' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.98)', borderTop: '1px solid #f0f0f0', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map(item => (
            item.to ? (
              <Link key={item.label} to={item.to} style={{ padding: '10px 12px', color: '#374151', textDecoration: 'none', fontSize: '14px', fontWeight: 500, borderRadius: '8px' }}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff7ed'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} style={{ padding: '10px 12px', color: '#374151', fontSize: '14px', fontWeight: 500 }}>{item.label}</div>
            )
          ))}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/login" style={{ padding: '10px 12px', color: '#374151', textDecoration: 'none', fontSize: '14px', fontWeight: 500, borderRadius: '8px' }} onClick={() => setMenuOpen(false)}>Sign in</Link>
            <Link to="/register" style={{ backgroundColor: '#ea580c', color: 'white', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Get Started →</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
