import Style from '../models/Style.js'
import ProductionOrder from '../models/ProductionOrder.js'
import Activity from '../models/Activity.js'

export const seedDemo = async (req, res) => {
  if (!['owner', 'admin'].includes(req.user.role)) return res.status(403).json({ message: 'Only workspace owners can load demo data' })
  const workspace = req.user.workspace
  const existing = await Style.countDocuments({ workspace })
  if (existing) return res.status(409).json({ message: 'Demo data is already loaded. Your current styles were not changed.' })
  const styles = await Style.insertMany([
    { name: 'Luna Utility Jacket', styleNumber: 'FW26-104', season: 'Fall/Winter 2026', brand: 'Northstar', category: 'Outerwear', status: 'fit_review', workspace, createdBy: req.user._id, tags: ['utility', 'woven'] },
    { name: 'Motion Training Legging', styleNumber: 'SP26-221', season: 'Spring 2026', brand: 'Northstar', category: 'Activewear', status: 'pattern', workspace, createdBy: req.user._id, tags: ['activewear', 'knit'] },
    { name: 'Harbor Overshirt', styleNumber: 'SU26-018', season: 'Summer 2026', brand: 'Northstar', category: 'Shirting', status: 'approved', workspace, createdBy: req.user._id, tags: ['woven', 'menswear'] },
    { name: 'Studio Tote', styleNumber: 'AC26-033', season: 'Core 2026', brand: 'Northstar', category: 'Accessories', status: 'draft', workspace, createdBy: req.user._id, tags: ['accessories'] }
  ])
  await ProductionOrder.insertMany([
    { orderNumber: 'PO-18401', style: styles[2]._id, styleName: styles[2].name, line: 'Line 04', target: 900, actual: 684, wip: 86, defects: 9, status: 'running', workspace },
    { orderNumber: 'PO-18402', style: styles[1]._id, styleName: styles[1].name, line: 'Line 02', target: 1200, actual: 432, wip: 141, defects: 14, status: 'running', workspace },
    { orderNumber: 'PO-18403', style: styles[0]._id, styleName: styles[0].name, line: 'Line 06', target: 640, actual: 640, wip: 0, defects: 4, status: 'completed', workspace }
  ])
  await Activity.create({ workspace, user: req.user._id, userName: req.user.name, action: 'loaded the demo workspace', target: '4 styles and 3 production orders', type: 'style' })
  res.status(201).json({ message: 'Demo workspace loaded', styles: styles.length, orders: 3 })
}
