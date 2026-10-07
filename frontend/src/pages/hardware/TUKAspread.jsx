import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKAspread',
  tag: 'Fabric Spreader',
  color: '#10b981',
  icon: '📏',
  desc: 'Automated fabric spreading machines that lay fabric evenly, accurately, and consistently for cutting. Eliminate manual spreading labor and improve cut quality.',
  features: [
    { icon: '🤖', title: 'Automatic Spreading', desc: 'Automated fabric spreading eliminates manual labor. Consistent ply tension and alignment every time.' },
    { icon: '📊', title: 'Ply Count Control', desc: 'Set exact ply heights and the machine handles the rest. No more miscounting or uneven layers.' },
    { icon: '🎯', title: 'Edge Alignment', desc: 'Automatic edge alignment sensors keep fabric perfectly aligned across the full spread length.' },
    { icon: '⚡', title: 'High Speed', desc: 'Spread fabric significantly faster than manual methods. Keep your cutting room operating at full capacity.' },
  ],
  specs: [
    { label: 'Spreading Width', value: 'Up to 180 cm' },
    { label: 'Spreading Speed', value: 'Up to 80 m/min' },
    { label: 'Max Ply Height', value: '15 cm' },
    { label: 'Fabric Types', value: 'Woven, knit, technical' },
    { label: 'Table Length', value: 'Customizable' },
    { label: 'Power', value: '220V / 380V' },
  ],
  integration: 'TUKAspread works with TUKAcut for a complete automated spreading and cutting workflow. Spread fabric and cut in sequence for maximum efficiency.'
}

const TUKAspread = () => <HardwarePage machine={machine} />
export default TUKAspread