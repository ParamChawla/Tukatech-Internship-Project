import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKAcut Laser',
  tag: 'Laser Cutting Machine',
  color: '#ec4899',
  icon: '⚡',
  desc: 'Laser cutting technology for precision cutting of delicate fabrics, lace, technical materials, and intricate designs. Sealed edges, zero fraying, perfect repeatability.',
  features: [
    { icon: '🎯', title: 'Laser Precision', desc: 'Laser beam follows cut paths with sub-millimeter accuracy. Perfect for intricate designs and delicate materials.' },
    { icon: '🧵', title: 'Sealed Edges', desc: 'Laser heat seals fabric edges as it cuts — no fraying on synthetics, technical fabrics, or lace.' },
    { icon: '🎨', title: 'Intricate Designs', desc: 'Cut complex shapes, lace patterns, and decorative elements that straight-knife cutters cannot achieve.' },
    { icon: '🔄', title: 'Perfect Repeatability', desc: 'Every piece cut identically. Laser guidance ensures consistent results across long production runs.' },
  ],
  specs: [
    { label: 'Laser Type', value: 'CO₂ laser' },
    { label: 'Cutting Width', value: 'Up to 160 cm' },
    { label: 'Cutting Speed', value: 'Up to 1,500 mm/s' },
    { label: 'Accuracy', value: '±0.05mm' },
    { label: 'Best For', value: 'Synthetics, lace, technical' },
    { label: 'Engrave Function', value: 'Yes' },
  ],
  integration: 'TUKAcut Laser integrates with TUKAcad marker files. Ideal for fashion-forward brands working with technical fabrics, swim, lingerie, and luxury materials.'
}

const TUKAcutLaser = () => <HardwarePage machine={machine} />
export default TUKAcutLaser