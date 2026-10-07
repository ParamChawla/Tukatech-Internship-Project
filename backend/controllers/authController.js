import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Workspace from '../models/Workspace.js'
import Activity from '../models/Activity.js'

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

const sendTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
}

const userResponse = (user, workspace) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  company: user.company,
  bio: user.bio,
  avatar: user.avatar,
  workspace: workspace ? {
    _id: workspace._id,
    name: workspace.name,
    inviteCode: workspace.inviteCode,
    memberCount: workspace.members.length
  } : null
})

// @POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password, company, inviteCode } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ message: 'Email already registered' })

  let workspace = null
  let role = 'owner'

  if (inviteCode) {
    // joining existing workspace
    workspace = await Workspace.findOne({ inviteCode: inviteCode.toUpperCase() })
    if (!workspace) return res.status(400).json({ message: 'Invalid invite code' })
    role = 'member'
  }

  const user = await User.create({ name, email, password, company, role })

  if (inviteCode && workspace) {
    // add to existing workspace
    workspace.members.push({ user: user._id, role: 'member' })
    await workspace.save()
    user.workspace = workspace._id
    await user.save()

    await Activity.create({
      workspace: workspace._id,
      user: user._id,
      userName: user.name,
      action: 'joined the workspace',
      type: 'join'
    })
  } else {
    // create new workspace
    const wsName = company || `${name}'s Workspace`
    workspace = await Workspace.create({
      name: wsName,
      owner: user._id,
      members: [{ user: user._id, role: 'owner' }]
    })
    user.workspace = workspace._id
    user.role = 'owner'
    await user.save()
  }

  const token = generateToken(user._id)
  sendTokenCookie(res, token)
  res.status(201).json(userResponse(user, workspace))
}

// @POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid email or password' })

  const isMatch = await user.matchPassword(password)
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' })

  const workspace = user.workspace
    ? await Workspace.findById(user.workspace)
    : null

  const token = generateToken(user._id)
  sendTokenCookie(res, token)
  res.json(userResponse(user, workspace))
}

// @GET /api/auth/logout
export const logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0 })
  res.json({ message: 'Logged out' })
}

// @GET /api/auth/me
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  const workspace = user.workspace
    ? await Workspace.findById(user.workspace)
    : null
  res.json(userResponse(user, workspace))
}