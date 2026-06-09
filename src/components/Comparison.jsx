const ROWS = [
  { criteria: 'Disponibilité', mnb: '24h/7j', coach: 'Sur RDV', app: 'Toujours' },
  { criteria: 'Personnalisation', mnb: '100% adaptatif', coach: 'Élevée', app: 'Faible' },
  { criteria: 'Piliers couverts', mnb: '3 (Corps · Nutr · Mental)', coach: '1 à 2 max', app: '1 seul' },
  { criteria: 'Adaptation quotidienne', mnb: 'En temps réel', coach: 'Non', app: 'Non' },
  { criteria: 'Coût phase alpha', mnb: '0€ — Gratuit', coach: '50-200€/séance', app: '0-15€/mois' },
]

export default function Comparison() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative bg-zinc-900/15 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold font-manrope text-center mb-3">
          Pourquoi choisir <span className="text-accent">My New Body</span> ?
        </h3>
        <p className="text-zinc-500 text-center text-sm mb-12">Comparaison honnête avec les alternatives existantes.</p>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-4 bg-white/5 p-5 border-b border-white/8 text-xs font-bold tracking-wider text-zinc-400 uppercase">
            <div className="col-span-1">Critères</div>
            <div className="col-span-1 text-center text-accent">My New Body</div>
            <div className="col-span-1 text-center hidden sm:block">Coach traditionnel</div>
            <div className="col-span-1 text-center hidden sm:block">App générique</div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.criteria}
              className={`grid grid-cols-4 px-5 py-4 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${
                i % 2 === 0 ? '' : 'bg-white/[0.02]'
              }`}
            >
              <div className="font-medium text-white text-sm">{row.criteria}</div>
              <div className="text-center text-accent font-bold text-sm">{row.mnb}</div>
              <div className="text-center text-zinc-500 text-sm hidden sm:block">{row.coach}</div>
              <div className="text-center text-zinc-500 text-sm hidden sm:block">{row.app}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-5 font-mono">
          * Données estimées · Phase Alpha 2026 — My New Body, Abidjan CI
        </p>
      </div>
    </section>
  )
}
