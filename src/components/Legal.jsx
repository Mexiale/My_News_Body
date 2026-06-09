const POINTS = [
  {
    num: '01',
    icon: '⚖️',
    title: 'Conformité ARTCI',
    desc: "Soumis à la Loi n°2013-450 de Côte d'Ivoire. Une Autorisation Préalable sera obtenue auprès de l'ARTCI avant le lancement officiel.",
    color: 'text-accent',
    border: 'border-accent/20',
    bg: 'bg-accent/8',
  },
  {
    num: '02',
    icon: '🔒',
    title: 'Privacy by Design',
    desc: "La protection des données est intégrée dès la conception. Chiffrement de bout en bout, hébergement conforme et pseudonymisation systématique.",
    color: 'text-accent-physical',
    border: 'border-accent-physical/20',
    bg: 'bg-accent-physical/8',
  },
  {
    num: '03',
    icon: '🪪',
    title: 'Pseudonymisation',
    desc: "L'identité de l'utilisateur est strictement séparée de ses données de santé en base de données. Deux entités distinctes, sans lien direct.",
    color: 'text-accent-nutrition',
    border: 'border-accent-nutrition/20',
    bg: 'bg-accent-nutrition/8',
  },
  {
    num: '04',
    icon: '🗑️',
    title: "Droit à l'oubli",
    desc: "Suppression complète et irréversible de toutes vos données en un seul clic. Aucune rétention après la demande de suppression.",
    color: 'text-accent',
    border: 'border-accent/20',
    bg: 'bg-accent/8',
  },
  {
    num: '05',
    icon: '🏥',
    title: 'Frontière Médicale',
    desc: "L'IA est bridée par des guardrails stricts. Elle ne pose jamais de diagnostic et redirige immédiatement vers le SAMU 185 si nécessaire.",
    color: 'text-accent-physical',
    border: 'border-accent-physical/20',
    bg: 'bg-accent-physical/8',
  },
  {
    num: '06',
    icon: '👤',
    title: 'Correspondant CPD',
    desc: "Un Correspondant à la Protection des Données (CPD) sera nommé avant le lancement, conformément aux obligations de la loi ivoirienne.",
    color: 'text-accent-nutrition',
    border: 'border-accent-nutrition/20',
    bg: 'bg-accent-nutrition/8',
  },
]

export default function Legal() {
  return (
    <section id="legal" className="py-24 px-4 md:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">Cadre Légal & Sécurité</p>
            <h2 className="text-3xl md:text-5xl font-manrope font-semibold tracking-tight">
              Votre vie privée,{' '}
              <span className="text-accent">notre priorité</span>
            </h2>
          </div>
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3 max-w-xs">
            <span className="text-2xl shrink-0">🇨🇮</span>
            <div>
              <p className="text-xs font-bold text-white">Loi n°2013-450</p>
              <p className="text-[10px] text-zinc-500">Protection des données personnelles, Côte d'Ivoire</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POINTS.map((p) => (
            <div key={p.num} className={`glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border ${p.border} hover:shadow-lg`}>
              <span className="absolute -top-2 -right-1 text-7xl font-black font-manrope text-white/3 select-none leading-none">{p.num}</span>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className={`text-base font-bold font-manrope mb-2 ${p.color}`}>{p.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-10 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 border border-accent/15">
          <div className="text-3xl shrink-0">🛡️</div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white mb-1">Engagement de transparence totale</h4>
            <p className="text-sm text-zinc-400">
              My New Body ne vend, ne partage et ne monétise jamais vos données de santé. Le modèle économique repose sur l'abonnement, pas sur vos données.
            </p>
          </div>
          <div className="shrink-0 text-xs font-bold text-accent border border-accent/30 px-4 py-2 rounded-full whitespace-nowrap">
            Zéro revente de données
          </div>
        </div>

      </div>
    </section>
  )
}
