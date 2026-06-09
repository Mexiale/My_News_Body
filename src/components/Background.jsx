import { useEffect } from 'react'

function generateBoxShadows(n) {
  return Array.from({ length: n }, () =>
    `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #ffffff`
  ).join(', ')
}

export default function Background() {
  useEffect(() => {
    const sm = document.getElementById('stars-sm')
    const md = document.getElementById('stars-md')
    const lg = document.getElementById('stars-lg')
    if (sm) sm.style.boxShadow = generateBoxShadows(350)
    if (md) md.style.boxShadow = generateBoxShadows(100)
    if (lg) lg.style.boxShadow = generateBoxShadows(40)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0d0520_0%,_#030712_100%)]" />

      {/* Stars */}
      <div id="stars-sm" className="stars-sm absolute inset-0" />
      <div id="stars-md" className="stars-md absolute inset-0" />
      <div id="stars-lg" className="stars-lg absolute inset-0" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 z-[1]" />

      {/* Color glows */}
      <div className="absolute top-[-8%] left-[15%] w-[560px] h-[560px] bg-accent/10 rounded-full blur-[130px] mix-blend-screen" />
      <div className="absolute bottom-[15%] right-[5%] w-[420px] h-[420px] bg-accent-nutrition/10 rounded-full blur-[110px] mix-blend-screen" />
      <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-accent-physical/8 rounded-full blur-[100px] mix-blend-screen" />
    </div>
  )
}
