import express from 'express'
import Newsletter from '../models/Newsletter.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })
  try {
    await Newsletter.create({ email })
    res.status(201).json({ message: 'Subscribed successfully' })
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Already subscribed' })
    res.status(500).json({ message: 'Server error' })
  }
})

export default router