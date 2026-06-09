const NAV_PRODUCT = [
  { label: 'Comment ça marche', href: '#comment' },
  { label: 'Les 3 Piliers', href: '#piliers' },
  { label: 'Technologie IA', href: '#ia' },
  { label: 'Phase Alpha', href: '#alpha' },
]

const NAV_LEGAL = [
  { label: 'Cadre légal & Sécurité', href: '#legal' },
  { label: 'Politique de confidentialité', href: '#legal' },
  { label: "Droit à l'oubli", href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10 mb-16">
        {/* Brand */}
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold font-manrope text-sm border border-white/10">
              M
            </div>
            <span className="text-lg font-bold font-manrope tracking-tight text-white">My New Body</span>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-5">
            Un coach bien-être IA bienveillant qui écoute votre corps chaque matin et recalcule votre programme — Physique, Nutrition & Mental.
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <span className="text-base">🇨🇮</span>
            <span>Abidjan, Côte d'Ivoire</span>
          </div>
        </div>

        {/* Product links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Produit</h4>
          <ul className="space-y-3 text-zinc-500 text-sm">
            {NAV_PRODUCT.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-accent transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Légal & Privacy</h4>
          <ul className="space-y-3 text-zinc-500 text-sm">
            {NAV_LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-accent transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-5 glass-card rounded-xl px-3 py-2 border border-accent/15 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-physical animate-pulse" />
            <span className="text-[10px] text-zinc-500 font-mono">ARTCI Conforme</span>
          </div>
        </div>
      </div>

      {/* Big watermark */}
      <div className="relative w-full overflow-hidden opacity-[0.04] select-none pointer-events-none flex justify-center mb-8">
        <h1
          className="text-[15vw] font-black font-manrope leading-none text-transparent tracking-tighter whitespace-nowrap"
          style={{ WebkitTextStroke: '1px #fff' }}
        >
          MY NEW BODY
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-wider border-t border-zinc-900 pt-6">
        <p>© 2026 My New Body · Mexiale Studio</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
