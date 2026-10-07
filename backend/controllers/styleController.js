import Style from '../models/Style.js'
import File from '../models/File.js'
import Activity from '../models/Activity.js'
import Notification from '../models/Notification.js'

const canManage = role => ['owner', 'admin', 'designer', 'pattern_maker', 'merchandiser', 'qa', 'production_manager'].includes(role)
const log = (req, action, target, type = 'style') => Activity.create({ workspace: req.user.workspace, user: req.user._id, userName: req.user.name, action, target, type }).catch(() => {})

export const listStyles = async (req, res) => {
  const { status, season, search, assignedTo } = req.query
  const query = { workspace: req.user.workspace }
  if (status) query.status = status
  if (season) query.season = season
  if (assignedTo) query.assignedTo = assignedTo
  if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { styleNumber: { $regex: search, $options: 'i' } }, { tags: { $regex: search, $options: 'i' } }]
  const styles = await Style.find(query).populate('assignedTo', 'name email').sort({ updatedAt: -1 })
  res.json(styles)
}

export const createStyle = async (req, res) => {
  if (!canManage(req.user.role)) return res.status(403).json({ message: 'Your role cannot create styles' })
  const body = req.body
  const style = await Style.create({ ...body, workspace: req.user.workspace, createdBy: req.user._id, tags: body.tags || [] })
  await log(req, 'created style', `${style.styleNumber} · ${style.name}`)
  res.status(201).json(style)
}

export const getStyle = async (req, res) => {
  const style = await Style.findOne({ _id: req.params.id, workspace: req.user.workspace }).populate('assignedTo', 'name email').populate('reviews.reviewer', 'name email')
  if (!style) return res.status(404).json({ message: 'Style not found' })
  const files = await File.find({ style: style._id, workspace: req.user.workspace }).sort({ createdAt: -1 })
  res.json({ style, files })
}

export const updateStyle = async (req, res) => {
  if (!canManage(req.user.role)) return res.status(403).json({ message: 'Your role cannot update styles' })
  const allowed = ['name', 'season', 'brand', 'category', 'description', 'status', 'assignedTo', 'dueDate', 'tags']
  const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)))
  const style = await Style.findOneAndUpdate({ _id: req.params.id, workspace: req.user.workspace }, changes, { new: true, runValidators: true }).populate('assignedTo', 'name email')
  if (!style) return res.status(404).json({ message: 'Style not found' })
  if (changes.assignedTo && changes.assignedTo !== req.user._id.toString()) await Notification.create({ workspace: req.user.workspace, recipient: changes.assignedTo, type: 'assignment', title: 'Style assigned to you', message: `${style.styleNumber} · ${style.name}`, link: `/styles/${style._id}` })
  await log(req, 'updated style', `${style.styleNumber} · ${style.name}`)
  res.json(style)
}

export const requestReview = async (req, res) => {
  const { reviewerId } = req.body
  const style = await Style.findOne({ _id: req.params.id, workspace: req.user.workspace })
  if (!style) return res.status(404).json({ message: 'Style not found' })
  if (!reviewerId) return res.status(400).json({ message: 'Reviewer is required' })
  const existing = style.reviews.find(review => review.reviewer.toString() === reviewerId)
  if (!existing) style.reviews.push({ reviewer: reviewerId, reviewerName: req.body.reviewerName || 'Team member' })
  style.status = 'fit_review'
  await style.save()
  await Notification.create({ workspace: req.user.workspace, recipient: reviewerId, type: 'review', title: 'Review requested', message: `${style.styleNumber} · ${style.name} is ready for your review`, link: `/styles/${style._id}` })
  await log(req, 'requested review for', `${style.styleNumber} · ${style.name}`, 'review')
  res.json(style)
}

export const decideReview = async (req, res) => {
  const { decision, note } = req.body
  if (!['approved', 'changes_requested'].includes(decision)) return res.status(400).json({ message: 'Valid review decision is required' })
  const style = await Style.findOne({ _id: req.params.id, workspace: req.user.workspace })
  if (!style) return res.status(404).json({ message: 'Style not found' })
  const review = style.reviews.find(item => item.reviewer.toString() === req.user._id.toString())
  if (!review) return res.status(403).json({ message: 'You are not assigned to review this style' })
  review.decision = decision; review.note = note || ''; review.decidedAt = new Date()
  style.status = decision === 'approved' ? 'approved' : 'pattern'
  await style.save()
  await log(req, decision === 'approved' ? 'approved style' : 'requested changes for', `${style.styleNumber} · ${style.name}`, 'review')
  res.json(style)
}
