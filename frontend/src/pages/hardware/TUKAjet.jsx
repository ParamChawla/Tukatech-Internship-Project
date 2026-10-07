import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKAjet',
  tag: 'CAD Plotter & Printer',
  color: '#3b82f6',
  icon: '🖨️',
  desc: 'High-speed CAD plotters and inkjet printers for printing full-size patterns on paper or directly on fabric. The essential tool for every pattern room.',
  features: [
    { icon: '⚡', title: 'High Speed Printing', desc: 'Print full-size patterns at high speed without sacrificing accuracy. Keep up with your patternmakers.' },
    { icon: '📐', title: 'Precise Output', desc: 'Accurate pattern output with tight tolerances. What you design in TUKAcad is exactly what you get printed.' },
    { icon: '📄', title: 'Multiple Paper Widths', desc: 'Supports a range of paper widths to match your pattern sizes and fabric widths.' },
    { icon: '🔗', title: 'TUKAcad Integration', desc: 'Prints directly from TUKAcad with one click. No file conversion or driver headaches.' },
  ],
  specs: [
    { label: 'Print Width', value: 'Up to 72 inches' },
    { label: 'Print Speed', value: 'Up to 45 m²/hr' },
    { label: 'Resolution', value: '300-600 DPI' },
    { label: 'Media Type', value: 'Paper, fabric, film' },
    { label: 'Connectivity', value: 'USB, LAN, WiFi' },
    { label: 'Compatible Software', value: 'TUKAcad, SMARTmark' },
  ],
  integration: 'TUKAjet integrates directly with TUKAcad and SMARTmark. Print patterns, grade rules, and markers directly from your CAD software with a single click.'
}

const TUKAjet = () => <HardwarePage machine={machine} />
export default TUKAjet