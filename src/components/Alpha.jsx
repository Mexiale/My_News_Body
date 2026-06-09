const WORKFLOW = [
  {
    step: '1',
    tool: 'Tally Forms',
    desc: 'Check-in quotidien via un formulaire gratuit et élégant',
    icon: '📋',
    color: 'text-accent-physical',
    bg: 'bg-accent-physical/10',
    border: 'border-accent-physical/20',
  },
  {
    step: '2',
    tool: 'Make.com',
    desc: "Récupère les réponses et orchestre l'appel API en temps réel",
    icon: '⚙️',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    step: '3',
    tool: 'API Claude / GPT-4o',
    desc: 'Génère le programme personnalisé via le system prompt sécurisé',
    icon: '🤖',
    color: 'text-accent-nutrition',
    bg: 'bg-accent-nutrition/10',
    border: 'border-accent-nutrition/20',
  },
  {
    step: '4',
    tool: 'WhatsApp / Email',
    desc: 'Programme mis en forme et livré automatiquement chaque matin',
    icon: '📲',
    color: 'text-accent-physical',
    bg: 'bg-accent-physical/10',
    border: 'border-accent-physical/20',
  },
]

const PERKS = [
  '7 jours de test guidé',
  'Accès 100% gratuit',
  'Feedback direct avec la fondatrice',
  'Compte premium offert au lancement',
  'Communauté privée WhatsApp',
]

export default function Alpha() {
  return (
    <section id="alpha" className="py-24 px-4 md:px-6 border-t border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/5 blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/25 bg-accent/8 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-bold text-accent tracking-wide">Phase Alpha — 7 jours · 5 à 10 testeurs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-manrope mb-4">
            Le MVP <span className="text-accent">No-Code</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-balance">
            Avant le développement complet, une phase de test de 7 jours valide l'expérience utilisateur avec un groupe restreint de testeurs de confiance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Workflow */}
          <div>
            <h3 className="text-lg font-bold font-manrope text-white mb-6">Workflow automatisé</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-accent-physical/40 via-accent/40 to-accent-physical/10" />

              <div className="space-y-4">
                {WORKFLOW.map((w) => (
                  <div key={w.step} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-xl ${w.bg} border ${w.border} flex items-center justify-center text-lg shrink-0 relative z-10`}>
                      {w.icon}
                    </div>
                    <div className={`glass-card flex-1 rounded-xl p-4 border ${w.border}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${w.color}`}>{w.tool}</span>
                        <span className="text-[10px] text-zinc-600 font-mono">étape {w.step}</span>
                      </div>
                      <p className="text-xs text-zinc-400">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perks card */}
          <div className="glass-card rounded-3xl p-8 border border-accent/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold font-manrope text-white mb-2">Ce que vous obtenez</h3>
            <p className="text-zinc-500 text-sm mb-6">En rejoignant la phase alpha.</p>

            <ul className="space-y-3 mb-8">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-[10px] shrink-0">
                    ✓
                  </span>
                  <span className="text-zinc-300">{p}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="block w-full py-3.5 rounded-xl bg-accent hover:bg-accent-dark text-black text-sm font-bold text-center transition-colors"
            >
              Je rejoins la liste alpha →
            </a>

            <p className="text-center text-xs text-zinc-600 mt-3">
              Places limitées à 10 testeurs · Abidjan & diaspora
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
