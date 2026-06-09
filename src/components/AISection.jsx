const SYSTEM_PROMPT_PREVIEW = `Tu es un coach bien-être bienveillant.
Reçois les données du check-in utilisateur
et génère un programme JSON structuré.

RÈGLES ABSOLUES:
→ Ne jamais poser de diagnostic médical
→ En cas de symptôme grave → alerte SAMU 185
→ Réponse uniquement en JSON valide
→ Adapter l'intensité à la fatigue déclarée`

const JSON_OUTPUT = `{
  "date": "2026-06-09",
  "physique": {
    "activite": "Yoga doux",
    "duree_min": 25,
    "intensite": "faible",
    "focus": "épaule droite"
  },
  "nutrition": {
    "repas": "Salade quinoa",
    "hydratation": "2.5L",
    "eviter": ["caféine", "sucre raffiné"]
  },
  "mental": {
    "exercice": "Cohérence 4-7-8",
    "duree_min": 5,
    "moment": "avant 14h"
  },
  "alerte": null
}`

const GUARDRAILS = [
  { icon: '🚫', label: 'Zéro diagnostic médical', desc: "L'IA ne pose aucun diagnostic. Elle oriente uniquement vers des pratiques de bien-être." },
  { icon: '🚨', label: 'Protocole SAMU 185', desc: "Si des symptômes graves sont détectés, l'IA bloque le programme et redirige vers le SAMU 185." },
  { icon: '🔒', label: 'JSON uniquement', desc: 'La sortie de l\'IA est strictement structurée. Aucun texte libre ne peut contenir des affirmations médicales.' },
  { icon: '⚙️', label: 'Intensité bridée', desc: "Si la fatigue dépasse 8/10, l'IA interdit automatiquement les activités à haute intensité." },
]

export default function AISection() {
  return (
    <section id="ia" className="py-24 px-4 md:px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">Architecture Technique</p>
          <h2 className="text-3xl md:text-5xl font-manrope font-semibold tracking-tight">
            L'intelligence qui vous{' '}
            <span className="text-accent">comprend vraiment</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl text-balance">
            Un system prompt médically safe orchestre un grand modèle de langage pour transformer vos données en programme visuel instantané.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* System Prompt */}
          <div className="glass-card rounded-3xl p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold font-manrope text-white">System Prompt</h3>
                <p className="text-xs text-zinc-500">Contraintes de sécurité intégrées</p>
              </div>
            </div>
            <div className="flex-1 bg-black/60 rounded-xl border border-white/5 p-4 font-mono text-xs text-zinc-400 leading-relaxed whitespace-pre-line">
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-nutrition/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-physical/60" />
              </div>
              {SYSTEM_PROMPT_PREVIEW}
            </div>
          </div>

          {/* JSON Output */}
          <div className="glass-card rounded-3xl p-7 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-nutrition/15 border border-accent-nutrition/25 flex items-center justify-center text-accent-nutrition">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold font-manrope text-white">Sortie JSON</h3>
                  <p className="text-xs text-zinc-500">Transformée en cartes visuelles</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-accent-physical/15 text-accent-physical border border-accent-physical/25 px-2 py-1 rounded-full">
                0.8s
              </span>
            </div>
            <div className="flex-1 bg-black/60 rounded-xl border border-white/5 p-4 font-mono text-xs text-zinc-400 leading-relaxed whitespace-pre overflow-auto">
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-nutrition/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-physical/60" />
              </div>
              <span className="text-accent-physical">{'{'}</span>
              {JSON_OUTPUT.replace('{', '').replace(/\}$/, '')}
              <span className="text-accent-physical">{'}'}</span>
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div>
          <h3 className="text-lg font-bold font-manrope text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center text-xs">🛡️</span>
            Garde-fous (Guardrails)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUARDRAILS.map((g) => (
              <div key={g.label} className="glass-card rounded-2xl p-5 hover:border-red-500/20 transition-all">
                <div className="text-2xl mb-3">{g.icon}</div>
                <h4 className="text-sm font-bold text-white mb-1.5">{g.label}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
