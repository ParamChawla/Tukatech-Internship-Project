import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['review', 'comment', 'assignment', 'system'], default: 'system' },
  link: { type: String, default: '' },
  read: { type: Boolean, default: false }
}, { timestamps: true })

notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 })
export default mongoose.model('Notification', notificationSchema)
