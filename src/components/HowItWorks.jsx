const STEPS = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12h6M9 16h4"/>
      </svg>
    ),
    title: 'Check-in Matinal',
    desc: 'Évaluez votre fatigue, stress, humeur et douleurs en 2 minutes via un formulaire adaptatif. Ces données sont la fondation de votre programme du jour.',
    color: 'text-accent-physical',
    bg: 'bg-accent-physical/10',
    border: 'border-accent-physical/20',
    glow: 'bg-accent-physical/5',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
      </svg>
    ),
    title: 'Orchestration IA',
    desc: "Un system prompt médically safe envoie vos données au LLM. L'IA croise vos 3 piliers, vérifie les contre-indications et génère une réponse JSON structurée.",
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    glow: 'bg-accent/5',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <path d="M14 17.5h7M17.5 14v7"/>
      </svg>
    ),
    title: 'Programme du Jour',
    desc: 'Le JSON est transformé instantanément en 3 cartes visuelles épurées : activité physique adaptée, suggestion repas et exercice de gestion mentale.',
    color: 'text-accent-nutrition',
    bg: 'bg-accent-nutrition/10',
    border: 'border-accent-nutrition/20',
    glow: 'bg-accent-nutrition/5',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
      </svg>
    ),
    title: 'Évolution Continue',
    desc: "L'IA affine ses recommandations grâce à votre feedback quotidien. Plus vous utilisez la plateforme, plus elle vous connaît et s'adapte à votre rythme de vie.",
    color: 'text-accent-physical',
    bg: 'bg-accent-physical/10',
    border: 'border-accent-physical/20',
    glow: 'bg-accent-physical/5',
  },
]

export default function HowItWorks() {
  return (
    <section id="comment" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">Fonctionnement</p>
            <h2 className="text-3xl md:text-5xl font-manrope font-semibold tracking-tight text-balance">
              Comment votre coach{' '}
              <span className="text-accent">IA travaille</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-balance lg:text-right text-sm">
            Un cycle continu de 4 étapes, recalculé chaque matin selon votre état réel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`glass-card rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden group transition-all duration-400`}
              style={{ '--pillar-glow': step.glow }}
            >
              {/* Number watermark */}
              <span className="absolute -top-3 -right-1 text-8xl font-black font-manrope text-white/3 select-none leading-none">
                {step.num}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center ${step.color} shrink-0`}>
                {step.icon}
              </div>

              {/* Connector dot */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold font-manrope text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
