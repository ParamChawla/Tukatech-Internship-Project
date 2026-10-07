import cloudinary from '../config/cloudinary.js'
import File from '../models/File.js'
import Activity from '../models/Activity.js'
import streamifier from 'streamifier'

const getWorkspaceFile = (id, user) => File.findOne({ _id: id, workspace: user.workspace })

const uploadToCloudinary = (buffer, folder, originalname) => {
  return new Promise((resolve, reject) => {
    const cleanName = originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '')
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'raw', public_id: cleanName, use_filename: true, unique_filename: true, access_mode: 'public' },
      (error, result) => { if (result) resolve(result); else reject(error) }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })
}

export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const { collection, styleId, tags, parentFile, versionNote } = req.body
  const result = await uploadToCloudinary(req.file.buffer, 'tukatech', req.file.originalname)

  const file = await File.create({
    name: req.file.originalname,
    originalName: req.file.originalname,
    url: result.secure_url,
    publicId: result.public_id,
    fileType: req.file.mimetype,
    size: req.file.size,
    format: req.file.originalname.split('.').pop(),
    collectionName: collection || 'General',
    style: styleId || null,
    tags: tags ? String(tags).split(',').map(tag => tag.trim().toLowerCase()).filter(Boolean) : [],
    parentFile: parentFile || null,
    version: parentFile ? ((await File.findById(parentFile).select('version'))?.version || 0) + 1 : 1,
    versionNote: versionNote || '',
    uploadedBy: req.user._id,
    workspace: req.user.workspace
  })

  // log activity
  if (req.user.workspace) {
    await Activity.create({
      workspace: req.user.workspace,
      user: req.user._id,
      userName: req.user.name,
      action: `uploaded`,
      target: req.file.originalname,
      type: 'upload'
    })
  }

  res.status(201).json(file)
}

export const getMyFiles = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 50
  const skip = (page - 1) * limit
  const sortBy = ['createdAt', 'name', 'size'].includes(req.query.sort) ? req.query.sort : 'createdAt'
  const order = req.query.order === 'asc' ? 1 : -1

  const query = req.user.workspace
    ? { workspace: req.user.workspace }
    : { uploadedBy: req.user._id }

  const [files, total] = await Promise.all([
    File.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'name email'),
    File.countDocuments(query)
  ])

  res.json({
    files,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total
    }
  })
}

export const deleteFile = async (req, res) => {
  const file = await getWorkspaceFile(req.params.id, req.user)
  if (!file) return res.status(404).json({ message: 'File not found' })
  if (file.uploadedBy.toString() !== req.user._id.toString() && !['owner', 'admin'].includes(req.user.role))
    return res.status(403).json({ message: 'Not authorized' })

  await cloudinary.uploader.destroy(file.publicId, { resource_type: 'raw' })
  await file.deleteOne()

  if (req.user.workspace) {
    await Activity.create({
      workspace: req.user.workspace,
      user: req.user._id,
      userName: req.user.name,
      action: 'deleted',
      target: file.name,
      type: 'delete'
    })
  }

  res.json({ message: 'File deleted' })
}

export const addComment = async (req, res) => {
  const file = await getWorkspaceFile(req.params.id, req.user)
  if (!file) return res.status(404).json({ message: 'File not found' })

  if (!req.body.text?.trim()) return res.status(400).json({ message: 'Comment text is required' })
  file.comments.push({
    text: req.body.text,
    postedBy: req.user._id,
    postedByName: req.user.name,
  })
  await file.save()

  if (req.user.workspace) {
    await Activity.create({
      workspace: req.user.workspace,
      user: req.user._id,
      userName: req.user.name,
      action: 'commented on',
      target: file.name,
      type: 'comment'
    })
  }

  res.json(file)
}

export const downloadFile = async (req, res) => {
  const file = await getWorkspaceFile(req.params.id, req.user)
  if (!file) return res.status(404).json({ message: 'File not found' })
  const response = await fetch(file.url)
  const buffer = await response.arrayBuffer()
  res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`)
  res.setHeader('Content-Type', file.fileType)
  res.send(Buffer.from(buffer))
}
