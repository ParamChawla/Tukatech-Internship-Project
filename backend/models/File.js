import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  fileType: { type: String, required: true },
  size: { type: Number, required: true },
  format: { type: String },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', default: null },
  collectionName: { type: String, default: 'General' },
  tags: [{ type: String, trim: true, lowercase: true }],
  style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style', default: null },
  version: { type: Number, default: 1 },
  parentFile: { type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null },
  versionNote: { type: String, default: '' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      text: { type: String, required: true },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      postedByName: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true })

fileSchema.index({ workspace: 1, collectionName: 1, createdAt: -1 })
fileSchema.index({ workspace: 1, style: 1, createdAt: -1 })

const File = mongoose.model('File', fileSchema)
export default File
