import HardwarePage from '../HardwarePage'

const machine = {
  name: 'TUKA INA',
  tag: 'Intelligent Sewing System',
  color: '#f59e0b',
  icon: '🧵',
  desc: 'Intelligent sewing automation system for apparel manufacturers. Automate repetitive sewing operations, track production in real time, and increase throughput without sacrificing quality.',
  features: [
    { icon: '🤖', title: 'Automated Sewing Ops', desc: 'Automate repetitive sewing operations like hemming, pocket attachment, and label sewing.' },
    { icon: '✅', title: 'Consistent Stitch Quality', desc: 'Machine-controlled tension and speed delivers consistent stitch quality across every garment.' },
    { icon: '📊', title: 'Production Tracking', desc: 'Real-time production tracking and analytics. Know your output rate, efficiency, and bottlenecks.' },
    { icon: '🌐', title: 'IoT Connectivity', desc: 'Connected to your factory network. Feed production data to your ERP and production management systems.' },
  ],
  specs: [
    { label: 'Operation Types', value: 'Hemming, pocket, label, + more' },
    { label: 'Speed', value: 'Up to 4,500 SPM' },
    { label: 'Connectivity', value: 'WiFi, LAN, IoT' },
    { label: 'Tracking', value: 'Real-time production data' },
    { label: 'Programmable', value: 'Yes — custom operations' },
    { label: 'Compatible', value: 'MES, ERP systems' },
  ],
  integration: 'TUKA INA connects to your factory MES and ERP systems. Part of Tukatech\'s Turnkey Smart Factory solution — integrating CAD, cutting, and sewing under one digital roof.'
}

const TUKAINA = () => <HardwarePage machine={machine} />
export default TUKAINA