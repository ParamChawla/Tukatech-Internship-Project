import express from 'express'
import ProductionOrder from '../models/ProductionOrder.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
router.use(protect)
router.get('/', async (req, res) => res.json(await ProductionOrder.find({ workspace: req.user.workspace }).sort({ updatedAt: -1 })))
router.post('/', async (req, res) => { if (!['owner', 'admin', 'production_manager'].includes(req.user.role)) return res.status(403).json({ message: 'Only production managers can create orders' }); const order = await ProductionOrder.create({ ...req.body, workspace: req.user.workspace }); res.status(201).json(order) })
router.put('/:id', async (req, res) => { if (!['owner', 'admin', 'production_manager'].includes(req.user.role)) return res.status(403).json({ message: 'Only production managers can update orders' }); const order = await ProductionOrder.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, req.body, { new: true, runValidators: true }); if (!order) return res.status(404).json({ message: 'Order not found' }); res.json(order) })
export default router
