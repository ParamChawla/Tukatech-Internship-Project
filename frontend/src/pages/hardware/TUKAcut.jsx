import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKAcut',
  tag: 'Automatic Fabric Cutter',
  color: '#ea580c',
  icon: '✂️',
  desc: 'Automatic straight-knife fabric cutting machines. Cut multiple plies with precision and speed, guided by your TUKAcad markers for maximum accuracy and minimum waste.',
  features: [
    { icon: '✂️', title: 'Precision Cutting', desc: 'Straight-knife cutting follows CAD marker paths precisely. Every piece cut accurately to spec.' },
    { icon: '📚', title: 'Multi-Ply Cutting', desc: 'Cut through multiple fabric plies in a single pass. Handle large production runs efficiently.' },
    { icon: '🗺️', title: 'Marker Integration', desc: 'Reads TUKAcad markers directly. No manual re-entry — the machine follows your optimized marker.' },
    { icon: '📉', title: 'Waste Reduction', desc: 'Precise cutting combined with optimized markers dramatically reduces fabric waste per order.' },
  ],
  specs: [
    { label: 'Cutting Width', value: 'Up to 180 cm' },
    { label: 'Cutting Speed', value: 'Up to 12 m/min' },
    { label: 'Max Ply Height', value: '10 cm' },
    { label: 'Blade Type', value: 'Straight knife' },
    { label: 'Positioning', value: '±0.1mm accuracy' },
    { label: 'Compatible', value: 'TUKAcad, SMARTmark' },
  ],
  integration: 'TUKAcut reads marker files directly from TUKAcad and SMARTmark. The complete workflow: design → grade → mark → cut, all in the Tukatech ecosystem.'
}

const TUKAcut = () => <HardwarePage machine={machine} />
export default TUKAcut