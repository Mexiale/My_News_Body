import { useState, useEffect } from 'react'

const links = [
  { label: 'Comment ça marche', href: '#comment' },
  { label: 'Les 3 Piliers', href: '#piliers' },
  { label: 'Technologie IA', href: '#ia' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 pt-5 px-4">
      <div className="max-w-6xl mx-auto">
        <nav
          className={`rounded-full px-5 py-3.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/60'
              : 'bg-black/50 backdrop-blur-xl border border-white/8'
          }`}
        >
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center border border-white/10 text-white font-bold font-manrope text-sm">
              M
            </div>
            <span className="text-base font-manrope font-bold tracking-tight text-white hidden sm:block">
              My New Body
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="shiny-cta hidden sm:flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              <span>Rejoindre l'Alpha</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 p-5 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-300 hover:text-white py-2 border-b border-white/5 last:border-0 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-2.5 rounded-full bg-accent text-black text-sm font-bold"
            >
              Rejoindre l'Alpha
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
