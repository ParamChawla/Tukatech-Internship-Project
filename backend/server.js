import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import { createIndexes } from './config/indexes.js'
import authRoutes from './routes/authRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import styleRoutes from './routes/styleRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import productionRoutes from './routes/productionRoutes.js'
import demoRoutes from './routes/demoRoutes.js'

dotenv.config()
connectDB().then(createIndexes).catch(err => { console.error('Database startup error:', err.message); process.exit(1) })

const app = express()

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}))

// Compression
app.use(compression())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many auth attempts, please try again later.' }
})

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { message: 'Too many AI requests, slow down.' }
})

app.use(globalLimiter)
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/users', userRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/ai', aiLimiter, aiRoutes)
app.use('/api/styles', styleRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/production-orders', productionRoutes)
app.use('/api/demo', demoRoutes)

// Health check endpoint
app.get('/health', (req, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime()
}))

app.get('/', (req, res) => res.json({ message: 'Tukatech API running' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`))
