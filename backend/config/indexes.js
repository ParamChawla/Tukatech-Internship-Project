import User from '../models/User.js'
import File from '../models/File.js'
import Activity from '../models/Activity.js'

export const createIndexes = async () => {
  try {
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true })
    await User.collection.createIndex({ workspace: 1 })

    // File indexes
    await File.collection.createIndex({ uploadedBy: 1 })
    await File.collection.createIndex({ workspace: 1 })
    await File.collection.createIndex({ collectionName: 1 })
    await File.collection.createIndex({ createdAt: -1 })
    await File.collection.createIndex({ name: 'text' })

    // Activity indexes
    await Activity.collection.createIndex({ workspace: 1, createdAt: -1 })

    console.log('MongoDB indexes created')
  } catch (err) {
    console.error('Index creation error:', err.message)
  }
}