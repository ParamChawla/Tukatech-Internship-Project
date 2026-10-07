import mongoose from 'mongoose'
import crypto from 'crypto'

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['owner', 'admin', 'designer', 'pattern_maker', 'merchandiser', 'qa', 'production_manager', 'client', 'member'], default: 'member' },
      joinedAt: { type: Date, default: Date.now }
    }
  ],
  inviteCode: {
    type: String,
    default: () => crypto.randomBytes(6).toString('hex').toUpperCase()
  },
  logo: { type: String, default: '' },
  description: { type: String, default: '' }
}, { timestamps: true })

const Workspace = mongoose.model('Workspace', workspaceSchema)
export default Workspace
