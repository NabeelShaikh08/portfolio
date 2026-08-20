import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Backdrop from './components/Backdrop'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { usePointerTracking } from './hooks/usePointerTracking'

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  const reducedMotion = useReducedMotion()

  // Momentum scrolling is itself motion, so it is opted out of alongside the
  // field. The hook still tracks progress either way.
  useSmoothScroll(!reducedMotion)
  usePointerTracking()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((dark) => !dark)

  return (
    <div className="grain relative min-h-screen">
      <Backdrop dark={isDark} />
      <ScrollProgress />
      <Cursor />

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="relative z-[2]">
        <Hero isDark={isDark} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
