import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewerName: { type: String, required: true },
  decision: { type: String, enum: ['pending', 'approved', 'changes_requested'], default: 'pending' },
  note: { type: String, default: '' },
  decidedAt: { type: Date, default: null }
}, { timestamps: true })

const styleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  styleNumber: { type: String, required: true, trim: true },
  season: { type: String, default: '' },
  brand: { type: String, default: '' },
  category: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'pattern', 'fit_review', 'approved', 'production'], default: 'draft' },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date, default: null },
  tags: [{ type: String, trim: true, lowercase: true }],
  reviews: [reviewSchema]
}, { timestamps: true })

styleSchema.index({ workspace: 1, styleNumber: 1 }, { unique: true })
styleSchema.index({ workspace: 1, status: 1, updatedAt: -1 })

export default mongoose.model('Style', styleSchema)
