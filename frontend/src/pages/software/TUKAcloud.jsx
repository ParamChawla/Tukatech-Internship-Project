import { Link } from 'react-router-dom'
import ProductPage from '../ProductPage'

const product = {
  name: 'TUKAcloud',
  tag: 'Cloud Platform',
  tagline: 'Digital sample room & mini PLM',
  color: '#06b6d4',
  heroImage: '/images/tukacloud-sample-room.png',
  icon: '☁️',
  desc: 'Web-based digital sample room and Process Lifecycle Management system. Connect everyone in product development under one digital roof — designers, patternmakers, merchandisers, and factories.',
  featuresIntro: 'Collaborate on patterns and 3D samples in real time. No more emailing files or losing track of versions.',
  features: [
    { icon: '📁', title: 'Cloud File Management', desc: 'Upload, organize and access your pattern files, 3D samples, and markers from anywhere in the world.' },
    { icon: '👥', title: 'Team Collaboration', desc: 'Invite your entire team — designers, patternmakers, factories. Everyone works in one shared workspace.' },
    { icon: '💬', title: 'Comments & Feedback', desc: 'Leave comments directly on files. Track feedback, approvals, and revisions in one place.' },
    { icon: '📊', title: 'Activity Feed', desc: 'See everything happening in your workspace. Who uploaded what, when, and what changed.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your files are private to your workspace. Enterprise-grade security for sensitive design assets.' },
    { icon: '🌐', title: 'Access Anywhere', desc: 'Browser-based — works on any device, any OS. No software installation required for reviewers.' },
  ]
}

const TUKAcloudPage = () => (
  <div>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
      </div>
    </div>
    <ProductPage product={product} />
    {/* Extra CTA to launch app */}
    <div style={{ backgroundColor: '#fff7ed', padding: '4rem 2rem', textAlign: 'center' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f1923', marginBottom: '8px' }}>Already have an account?</h3>
      <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '1.5rem' }}>Launch TUKAcloud and start collaborating with your team.</p>
      <Link to="/dashboard" style={{
        backgroundColor: '#0f1923', color: 'white', fontWeight: 700,
        fontSize: '15px', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none'
      }}>
        Open TUKAcloud →
      </Link>
    </div>
  </div>
)

export default TUKAcloudPage
