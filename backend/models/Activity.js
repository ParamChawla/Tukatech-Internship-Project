import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String },
  action: { type: String, required: true },
  target: { type: String },
  type: { type: String, enum: ['upload', 'delete', 'comment', 'invite', 'join', 'style', 'review'], default: 'upload' }
}, { timestamps: true })

const Activity = mongoose.model('Activity', activitySchema)
export default Activity
