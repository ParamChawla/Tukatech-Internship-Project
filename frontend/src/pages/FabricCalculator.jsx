import { useMemo, useState } from 'react'

const Field = ({ label, value, onChange, suffix }) => <label style={{ display: 'block', color: '#cbd5e1', fontSize: 13, fontWeight: 600 }}>{label}<div style={{ display: 'flex', marginTop: 7 }}><input type="number" min="0" value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', padding: 12, background: '#172233', color: 'white', border: '1px solid #334155', borderRadius: suffix ? '10px 0 0 10px' : 10, outline: 'none' }} />{suffix && <span style={{ padding: '12px 10px', background: '#243247', color: '#94a3b8', borderRadius: '0 10px 10px 0' }}>{suffix}</span>}</div></label>

export default function FabricCalculator() {
  const [values, setValues] = useState({ quantity: 1200, consumption: 1.85, width: 60, cost: 7.5, current: 78, optimized: 86 })
  const set = key => value => setValues(prev => ({ ...prev, [key]: value }))
  const result = useMemo(() => {
    const base = values.quantity * values.consumption
    const currentNeed = base / (values.current / 100)
    const optimizedNeed = base / (values.optimized / 100)
    const saved = Math.max(0, currentNeed - optimizedNeed)
    return { currentNeed, optimizedNeed, saved, savings: saved * values.cost }
  }, [values])
  return <div style={{ minHeight: '100vh', background: '#0d1117', color: 'white', padding: '96px max(24px, calc((100vw - 1120px)/2)) 48px' }}>
    <p style={{ color: '#fb923c', fontWeight: 800, letterSpacing: 1 }}>SMARTMARK ESTIMATOR</p><h1 style={{ fontSize: 38, margin: '8px 0' }}>Fabric savings calculator</h1><p style={{ color: '#94a3b8', maxWidth: 680 }}>Estimate the measurable impact of better marker efficiency before fabric is purchased.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)', gap: 24, marginTop: 32 }}>
      <section style={{ padding: 24, background: '#111b29', border: '1px solid #26354a', borderRadius: 18, display: 'grid', gap: 18 }}>
        <Field label="Order quantity" value={values.quantity} onChange={set('quantity')} suffix="units" /><Field label="Fabric consumption per garment" value={values.consumption} onChange={set('consumption')} suffix="yd" /><Field label="Fabric cost" value={values.cost} onChange={set('cost')} suffix="$/yd" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><Field label="Current efficiency" value={values.current} onChange={set('current')} suffix="%" /><Field label="SMARTmark efficiency" value={values.optimized} onChange={set('optimized')} suffix="%" /></div>
      </section>
      <section style={{ padding: 28, background: 'linear-gradient(145deg,#7c2d12,#1f2937)', borderRadius: 18 }}><p style={{ color: '#fed7aa', fontWeight: 700 }}>PROJECTED SAVINGS</p><div style={{ fontSize: 52, fontWeight: 900, margin: '10px 0' }}>${result.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div><p style={{ color: '#e2e8f0' }}>estimated material savings for this order</p><div style={{ display: 'grid', gap: 12, marginTop: 28 }}>{[['Current fabric required', result.currentNeed], ['Optimized fabric required', result.optimizedNeed], ['Fabric saved', result.saved]].map(([label, value]) => <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: 14, background: 'rgba(255,255,255,.08)', borderRadius: 10 }}><span>{label}</span><strong>{value.toFixed(1)} yd</strong></div>)}</div><p style={{ color: '#cbd5e1', fontSize: 12, marginTop: 20 }}>Estimate only. Actual results depend on material, marker constraints and production conditions.</p></section>
    </div></div>
}
