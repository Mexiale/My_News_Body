import { Link } from 'react-router-dom'

export default function LegalLayout({ title, subtitle, lastUpdate, children }) {
  return (
    <div className="min-h-screen bg-noir text-white">
      <header className="border-b border-white/5 py-5 px-4 md:px-6 sticky top-0 z-20 bg-noir/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center border border-white/10 text-white font-bold font-manrope text-sm">
              M
            </div>
            <span className="text-base font-manrope font-bold tracking-tight text-white hidden sm:block">
              My New Body
            </span>
          </Link>
          <Link to="/" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-3">Cadre Légal</p>
          <h1 className="text-3xl md:text-5xl font-manrope font-semibold tracking-tight mb-4">{title}</h1>
          {subtitle && <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">{subtitle}</p>}
          {lastUpdate && (
            <p className="mt-5 text-xs text-zinc-500 font-mono">
              Dernière mise à jour : <span className="text-zinc-400">{lastUpdate}</span>
            </p>
          )}
        </div>

        <article className="legal-prose">
          {children}
        </article>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-500">
          <p>
            © 2026 My New Body ·{' '}
            <a href="https://mexwebsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Mexiale
            </a>{' '}
            · Abidjan, Côte d'Ivoire
          </p>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/droit-oubli" className="hover:text-white transition-colors">Droit à l'oubli</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
