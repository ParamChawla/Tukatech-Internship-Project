import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Collections from './pages/Collections'
import Settings from './pages/Settings'
import Team from './pages/Team'
import Software from './pages/Software'
import TUKAcad from './pages/software/TUKAcad'
import TUKA3D from './pages/software/TUKA3D'
import TUKAcloudPage from './pages/software/TUKAcloud'
import SMARTmark from './pages/software/SMARTmark'
import TUKAstudio from './pages/software/TUKAstudio'
import TUKAPM from './pages/software/TUKAPM'
import Hardware from './pages/Hardware'
import TUKAjet from './pages/hardware/TUKAjet'
import TUKAspread from './pages/hardware/TUKAspread'
import TUKAcut from './pages/hardware/TUKAcut'
import TUKAcutLaser from './pages/hardware/TUKAcutLaser'
import TUKAcutRotary from './pages/hardware/TUKAcutRotary'
import TUKAINA from './pages/hardware/TUKAINA'
import About from './pages/About'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import Pricing from './pages/Pricing'
import SmartFactories from './pages/SmartFactories'
import useAuthStore from './store/authStore'
import NotFound from './pages/NotFound'
import Testimonials from './pages/Testimonials'
import AIChatWidget from './components/AIChatWidget'
import Styles from './pages/Styles'
import FactoryDashboard from './pages/FactoryDashboard'
import FabricCalculator from './pages/FabricCalculator'
import SolutionFinder from './pages/SolutionFinder'

const ComingSoon = ({ title }) => (
  <div style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', paddingTop: '80px' }}>
    <div style={{ fontSize: '48px' }}>🚧</div>
    <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 800 }}>{title}</h1>
    <p style={{ color: '#6b7280' }}>Coming soon</p>
  </div>
)

function App() {
  const { checkAuth, loading } = useAuthStore()
  useEffect(() => { checkAuth() }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#ea580c', fontSize: '24px', fontWeight: 700 }}>TUKATECH</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/software" element={<><Navbar /><Software /></>} />
        <Route path="/software/tukacad" element={<><Navbar /><TUKAcad /></>} />
        <Route path="/software/tuka3d" element={<><Navbar /><TUKA3D /></>} />
        <Route path="/software/tukacloud" element={<><Navbar /><TUKAcloudPage /></>} />
        <Route path="/software/smartmark" element={<><Navbar /><SMARTmark /></>} />
        <Route path="/software/tukastudio" element={<><Navbar /><TUKAstudio /></>} />
        <Route path="/software/tuka-apm" element={<><Navbar /><TUKAPM /></>} />
        <Route path="/software/tuka3d-de" element={<><Navbar /><ComingSoon title="TUKA3D Designer Edition" /></>} />

        {/* Hardware */}
        <Route path="/hardware" element={<><Navbar /><Hardware /></>} />
        <Route path="/hardware/tukajet" element={<><Navbar /><TUKAjet /></>} />
        <Route path="/hardware/tukaspread" element={<><Navbar /><TUKAspread /></>} />
        <Route path="/hardware/tukacut" element={<><Navbar /><TUKAcut /></>} />
        <Route path="/hardware/tukacut-laser" element={<><Navbar /><TUKAcutLaser /></>} />
        <Route path="/hardware/tukacut-rotary" element={<><Navbar /><TUKAcutRotary /></>} />
        <Route path="/hardware/tukaina" element={<><Navbar /><TUKAINA /></>} />

        {/* Other pages */}
        <Route path="/smart-factories" element={<><Navbar /><SmartFactories /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/pricing" element={<><Navbar /><Pricing /></>} />
        <Route path="/resources" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/training" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/education" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/tukatips" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/tukacenters" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/blog" element={<><Navbar /><Resources /></>} />
        <Route path="/resources/careers" element={<><Navbar /><Resources /></>} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/styles" element={<Styles />} />
        <Route path="/factory-dashboard" element={<FactoryDashboard />} />
        <Route path="/fabric-savings" element={<><Navbar /><FabricCalculator /></>} />
        <Route path="/solution-finder" element={<><Navbar /><SolutionFinder /></>} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about/testimonials" element={<><Navbar /><Testimonials /></>} />
      </Routes>
      <AIChatWidget />
    </BrowserRouter>
  )
}

export default App
