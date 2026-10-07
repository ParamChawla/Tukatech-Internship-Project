import mongoose from 'mongoose'

const productionOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style', default: null },
  styleName: { type: String, required: true },
  line: { type: String, required: true },
  target: { type: Number, required: true, min: 0 },
  actual: { type: Number, default: 0, min: 0 },
  wip: { type: Number, default: 0, min: 0 },
  defects: { type: Number, default: 0, min: 0 },
  status: { type: String, enum: ['planned', 'running', 'on_hold', 'completed'], default: 'planned' },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true }
}, { timestamps: true })

productionOrderSchema.index({ workspace: 1, status: 1, updatedAt: -1 })
export default mongoose.model('ProductionOrder', productionOrderSchema)
