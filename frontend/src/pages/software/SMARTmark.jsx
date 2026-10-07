import ProductPage from '../ProductPage'

const product = {
  name: 'SMARTmark',
  tag: 'Efficiency',
  tagline: 'Advanced marker making & material planning',
  color: '#10b981',
  heroImage: '/images/smartmark-marker-workspace.png',
  icon: '📐',
  desc: 'Get the most out of the fabric you purchase and beat the human brain every time with advanced marker making and material requirement planning.',
  featuresIntro: 'Maximize fabric utilization and reduce material costs with AI-powered marker making.',
  features: [
    { icon: '🧠', title: 'AI Marker Making', desc: 'Algorithms that beat human efficiency every time. Achieve higher fabric utilization automatically.' },
    { icon: '📉', title: 'Cost Reduction', desc: 'Reduce fabric waste and material costs significantly. ROI visible from the first marker.' },
    { icon: '📋', title: 'Material Planning', desc: 'Plan material requirements accurately across styles, sizes, and production runs.' },
    { icon: '⚡', title: 'Fast Processing', desc: 'Generate optimized markers in seconds, not hours. Handle large production runs effortlessly.' },
    { icon: '🔗', title: 'TUKAcad Integration', desc: 'Direct integration with TUKAcad patterns. No file conversion or re-digitizing required.' },
    { icon: '📊', title: 'Reports & Analytics', desc: 'Detailed efficiency reports. Track fabric utilization across styles and seasons.' },
  ]
}

const SMARTmark = () => <ProductPage product={product} />
export default SMARTmark
