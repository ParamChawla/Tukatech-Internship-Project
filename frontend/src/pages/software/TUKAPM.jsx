import ProductPage from '../ProductPage'

const product = {
  name: 'TUKA APM',
  tag: 'AI-Powered',
  tagline: "World's first automatic pattern making",
  color: '#8b5cf6',
  heroImage: '/images/tuka-apm-pattern-workspace.png',
  icon: '🤖',
  desc: "TUKA APM is the world's first fully automatic pattern making and grading software as a module within TUKAcad. Generate a complete pattern from a spec sheet using artificial intelligence.",
  featuresIntro: 'Revolutionary AI technology that transforms spec sheets into production-ready patterns automatically.',
  features: [
    { icon: '📄', title: 'Spec Sheet Import', desc: 'Import your spec sheet directly. TUKA APM reads measurements and design details automatically.' },
    { icon: '🤖', title: 'Auto Pattern Generation', desc: 'AI generates a complete, accurate pattern from your spec. No manual drafting required.' },
    { icon: '📏', title: 'Auto Grading', desc: 'Automatic grading across all sizes based on your grade rules. Perfectly consistent results.' },
    { icon: '⚡', title: 'Speed', desc: 'What takes hours manually takes minutes with APM. Transform your product development speed.' },
    { icon: '✏️', title: 'TUKAcad Integration', desc: 'Runs as a module inside TUKAcad. Edit and refine generated patterns with full CAD tools.' },
    { icon: '📈', title: 'Scalable', desc: 'Handle large style counts without increasing headcount. Scale production without scaling costs.' },
  ]
}

const TUKAPM = () => <ProductPage product={product} />
export default TUKAPM
