import express from 'express'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
router.use(protect)
router.get('/', async (req, res) => res.json(await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(30)))
router.put('/:id/read', async (req, res) => { const item = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { read: true }, { new: true }); if (!item) return res.status(404).json({ message: 'Notification not found' }); res.json(item) })
router.put('/read-all', async (req, res) => { await Notification.updateMany({ recipient: req.user._id, read: false }, { read: true }); res.json({ message: 'Notifications marked read' }) })
export default router
