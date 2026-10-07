import express from 'express'
import { protect } from '../middleware/auth.js'
import { seedDemo } from '../controllers/demoController.js'
const router = express.Router()
router.post('/seed', protect, seedDemo)
export default router
