import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import TrustedBy from '../components/TrustedBy'
import Pricing from '../components/Pricing'
import NewsletterSignup from '../components/NewsletterSignup'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <Pricing />
      <NewsletterSignup />
      <Footer />
    </div>
  )
}

export default Home