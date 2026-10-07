import express from 'express'
import { protect } from '../middleware/auth.js'
import { listStyles, createStyle, getStyle, updateStyle, requestReview, decideReview } from '../controllers/styleController.js'
const router = express.Router()
router.use(protect)
router.route('/').get(listStyles).post(createStyle)
router.route('/:id').get(getStyle).put(updateStyle)
router.post('/:id/reviews', requestReview)
router.post('/:id/reviews/decision', decideReview)
export default router
