import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  interest: String,
  message: String,
}, { timestamps: true })

const Contact = mongoose.model('Contact', contactSchema)

router.post('/', async (req, res) => {
  const { name, email, company, interest, message } = req.body
  if (!name || !email || !message)
    return res.status(400).json({ message: 'Name, email and message are required' })
  const contact = await Contact.create({ name, email, company, interest, message })
  res.status(201).json({ message: 'Message received', id: contact._id })
})

export default router