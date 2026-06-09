import { useEffect } from 'react'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Pillars from './components/Pillars'
import AISection from './components/AISection'
import Comparison from './components/Comparison'
import Legal from './components/Legal'
import Alpha from './components/Alpha'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      const bar = document.getElementById('scroll-progress')
      if (bar) bar.style.width = scrolled + '%'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative font-inter">
      <Background />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
        <div
          id="scroll-progress"
          className="h-full bg-accent shadow-[0_0_10px_#a78bfa] transition-all duration-100 ease-out"
          style={{ width: '0%' }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Pillars />
        <AISection />
        <Comparison />
        <Legal />
        <Alpha />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
