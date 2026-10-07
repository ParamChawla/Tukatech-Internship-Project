import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['owner', 'admin', 'designer', 'pattern_maker', 'merchandiser', 'qa', 'production_manager', 'client', 'member'], default: 'member' },
  company: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', default: null },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true })

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
