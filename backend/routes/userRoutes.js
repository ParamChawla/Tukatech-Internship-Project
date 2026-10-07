import express from 'express'
import User from '../models/User.js'
import Workspace from '../models/Workspace.js'
import Activity from '../models/Activity.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Update profile
router.put('/update', protect, async (req, res) => {
  const { name, company, bio } = req.body
  const user = await User.findByIdAndUpdate(
    req.user._id, { name, company, bio }, { new: true }
  ).select('-password')
  res.json(user)
})

// Get team members in same workspace
router.get('/team', protect, async (req, res) => {
  if (!req.user.workspace) return res.json([])
  const workspace = await Workspace.findById(req.user.workspace)
    .populate('members.user', 'name email role createdAt')
  if (!workspace) return res.json([])
  res.json(workspace.members)
})

// Get workspace info + invite code
router.get('/workspace', protect, async (req, res) => {
  if (!req.user.workspace) return res.status(404).json({ message: 'No workspace' })
  const workspace = await Workspace.findById(req.user.workspace)
    .populate('owner', 'name email')
  res.json(workspace)
})

// Regenerate invite code
router.post('/workspace/regenerate-code', protect, async (req, res) => {
  const workspace = await Workspace.findById(req.user.workspace)
  if (!workspace) return res.status(404).json({ message: 'Workspace not found' })
  if (workspace.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Only owner can regenerate code' })

  const crypto = await import('crypto')
  workspace.inviteCode = crypto.default.randomBytes(6).toString('hex').toUpperCase()
  await workspace.save()
  res.json({ inviteCode: workspace.inviteCode })
})

// Remove member
router.delete('/team/:userId', protect, async (req, res) => {
  const workspace = await Workspace.findById(req.user.workspace)
  if (!workspace) return res.status(404).json({ message: 'Workspace not found' })
  if (workspace.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Only owner can remove members' })

  workspace.members = workspace.members.filter(
    m => m.user.toString() !== req.params.userId
  )
  await workspace.save()

  await User.findByIdAndUpdate(req.params.userId, { workspace: null })
  res.json({ message: 'Member removed' })
})

router.put('/team/:userId/role', protect, async (req, res) => {
  const allowedRoles = ['admin', 'designer', 'pattern_maker', 'merchandiser', 'qa', 'production_manager', 'client', 'member']
  const workspace = await Workspace.findById(req.user.workspace)
  if (!workspace) return res.status(404).json({ message: 'Workspace not found' })
  if (workspace.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Only owner can update roles' })
  if (!allowedRoles.includes(req.body.role)) return res.status(400).json({ message: 'Invalid role' })
  const member = workspace.members.find(m => m.user.toString() === req.params.userId)
  if (!member) return res.status(404).json({ message: 'Member not found' })
  member.role = req.body.role
  await workspace.save()
  await User.findByIdAndUpdate(req.params.userId, { role: req.body.role })
  res.json({ message: 'Role updated', role: req.body.role })
})

// Get activity feed
router.get('/activity', protect, async (req, res) => {
  if (!req.user.workspace) return res.json([])
  const activities = await Activity.find({ workspace: req.user.workspace })
    .sort({ createdAt: -1 })
    .limit(20)
  res.json(activities)
})
// Change password (authenticated user)
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: 'Both fields required' })
  if (newPassword.length < 6)
    return res.status(400).json({ message: 'New password must be at least 6 characters' })

  const user = await User.findById(req.user._id)
  const isMatch = await user.matchPassword(currentPassword)
  if (!isMatch)
    return res.status(401).json({ message: 'Current password is incorrect' })

  user.password = newPassword
  await user.save()
  res.json({ message: 'Password updated successfully' })
})

export default router
