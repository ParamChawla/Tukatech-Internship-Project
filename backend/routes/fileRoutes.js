import express from 'express'
import multer from 'multer'
import { uploadFile, getMyFiles, deleteFile, addComment, downloadFile } from '../controllers/fileController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/dxf', 'application/octet-stream']
    cb(null, allowed.includes(file.mimetype) || /\.(tuka|mkr|dxf)$/i.test(file.originalname))
  }
})

router.post('/upload', protect, upload.single('file'), uploadFile)
router.get('/my', protect, getMyFiles)
router.get('/download/:id', protect, downloadFile)
router.delete('/:id', protect, deleteFile)
router.post('/:id/comment', protect, addComment)

export default router
