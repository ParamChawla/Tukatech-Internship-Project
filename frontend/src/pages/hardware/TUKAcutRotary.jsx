import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKAcut Rotary',
  tag: 'Rotary Cutting Machine',
  color: '#8b5cf6',
  icon: '⚙️',
  desc: 'Rotary blade cutting for knits, stretch fabrics, and technical textiles. The rotary mechanism handles materials that straight-knife cutters struggle with — smooth, distortion-free results every time.',
  features: [
    { icon: '🔄', title: 'Rotary Blade System', desc: 'Rotary blade rolls through fabric rather than pushing — no distortion on stretch fabrics or knits.' },
    { icon: '👗', title: 'Stretch Fabric Handling', desc: 'Designed for jersey, ponte, scuba, and performance stretch fabrics. Cuts clean without pulling.' },
    { icon: '⚡', title: 'Technical Textile Ready', desc: 'Handles technical fabrics like neoprene, bonded materials, and coated textiles with ease.' },
    { icon: '🎯', title: 'Minimal Distortion', desc: 'Rotary action minimizes fabric distortion during cutting. Cut pieces stay true to their pattern shape.' },
  ],
  specs: [
    { label: 'Cutting Width', value: 'Up to 180 cm' },
    { label: 'Blade Type', value: 'Rotary disk' },
    { label: 'Max Ply Height', value: '8 cm' },
    { label: 'Best For', value: 'Knits, stretch, technical' },
    { label: 'Speed', value: 'Up to 10 m/min' },
    { label: 'Accuracy', value: '±0.2mm' },
  ],
  integration: 'Works with TUKAcad markers and TUKAspread. Ideal for activewear, swimwear, lingerie, and performance sportswear manufacturers.'
}

const TUKAcutRotary = () => <HardwarePage machine={machine} />
export default TUKAcutRotary