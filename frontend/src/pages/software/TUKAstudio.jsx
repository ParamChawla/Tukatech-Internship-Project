import ProductPage from '../ProductPage'

const product = {
  name: 'TUKAstudio',
  tag: 'Design',
  tagline: 'Textile & print design software',
  color: '#ec4899',
  heroImage: '/images/tukastudio-textile-workspace.png',
  icon: '🎨',
  desc: 'A robust collection of textile and print design software with modules for color separation, repeats, colorways, and more. The complete toolkit for textile designers.',
  featuresIntro: 'From concept prints to production-ready repeats — TUKAstudio handles the full textile design workflow.',
  features: [
    { icon: '🖌️', title: 'Print Design', desc: 'Design prints, graphics, and surface patterns with professional tools built for fashion.' },
    { icon: '🎨', title: 'Colorways', desc: 'Create and manage multiple colorways for each design. Present options to buyers efficiently.' },
    { icon: '🔁', title: 'Repeat Patterns', desc: 'Build perfect repeats for woven, knit, and printed textiles. Multiple repeat types supported.' },
    { icon: '✂️', title: 'Color Separation', desc: 'Prepare designs for screen printing and digital printing with precise color separation tools.' },
    { icon: '📁', title: 'Asset Library', desc: 'Build a library of reusable design assets, textures, and motifs. Speed up design process.' },
    { icon: '🔗', title: 'TUKA3D Integration', desc: 'Send prints directly to TUKA3D for visualization on 3D garments before production.' },
  ]
}

const TUKAstudio = () => <ProductPage product={product} />
export default TUKAstudio
