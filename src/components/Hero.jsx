import { useState, useEffect } from 'react'

/* ── Animated check-in mock ── */
const METRICS = [
  { label: 'Fatigue', value: 7, color: 'bg-accent' },
  { label: 'Stress', value: 5, color: 'bg-accent-nutrition' },
  { label: 'Humeur', value: 8, color: 'bg-accent-physical' },
]

const PROGRAM = [
  { icon: '💪', pillar: 'PHYSIQUE', duration: '25 min', detail: 'Yoga doux + étirements épaule', color: 'text-accent-physical', bg: 'bg-accent-physical/10', border: 'border-accent-physical/20' },
  { icon: '🥗', pillar: 'NUTRITION', duration: 'Déjeuner', detail: 'Salade de quinoa aux légumes', color: 'text-accent-nutrition', bg: 'bg-accent-nutrition/10', border: 'border-accent-nutrition/20' },
  { icon: '🧘', pillar: 'MENTAL', duration: '5 min', detail: 'Cohérence cardiaque 4-7-8', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
]

function CheckInPhase() {
  return (
    <div className="glass-card rounded-2xl p-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-zinc-500 font-mono">Lundi 9 juin 2026</p>
          <h4 className="text-sm font-bold text-white font-manrope">Check-in du matin ☀️</h4>
        </div>
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute h-2 w-2 rounded-full bg-accent-physical opacity-75" />
          <span className="relative rounded-full h-2 w-2 bg-accent-physical" />
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {METRICS.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{m.label}</span>
              <span className="text-white font-semibold">{m.value}/10</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.color} rounded-full transition-all duration-1000`}
                style={{ width: `${m.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="bg-white/5 rounded-lg p-2.5">
          <p className="text-zinc-500">Douleur</p>
          <p className="text-white mt-0.5 font-medium">Épaule droite</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5">
          <p className="text-zinc-500">Temps dispo</p>
          <p className="text-white mt-0.5 font-medium">30 min</p>
        </div>
      </div>

      <div className="w-full py-2.5 rounded-xl bg-accent/20 border border-accent/30 text-accent text-xs font-bold text-center tracking-wide">
        Générer mon programme →
      </div>
    </div>
  )
}

function LoadingPhase() {
  const [progress, setProgress] = useState(12)

  useEffect(() => {
    const id = setInterval(() => setProgress(p => Math.min(p + 7, 96)), 180)
    return () => clearInterval(id)
  }, [])

  const steps = [
    { done: progress > 30, label: 'Profil énergétique analysé' },
    { done: progress > 60, label: 'Contre-indications vérifiées' },
    { done: progress > 90, label: 'Programme personnalisé généré' },
  ]

  return (
    <div className="glass-card rounded-2xl p-6 w-full flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-accent animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
        </svg>
      </div>
      <p className="text-sm font-bold text-white mb-1">Votre coach IA analyse…</p>
      <p className="text-xs text-zinc-500 mb-5">System prompt en cours d'orchestration</p>

      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-physical rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full space-y-2 text-left">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${s.done ? 'bg-accent-physical/20 border-accent-physical/40 text-accent-physical' : 'bg-white/5 border-white/10 text-zinc-600'}`}>
              {s.done ? '✓' : '·'}
            </span>
            <span className={s.done ? 'text-zinc-300' : 'text-zinc-600'}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgramPhase() {
  return (
    <div className="glass-card rounded-2xl p-5 w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs">✨</div>
        <div>
          <h4 className="text-sm font-bold text-white font-manrope">Votre programme du jour</h4>
          <p className="text-[10px] text-zinc-500 font-mono">Généré par l'IA · Adapté à votre état</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {PROGRAM.map((item) => (
          <div
            key={item.pillar}
            className={`flex items-start gap-3 p-3 rounded-xl ${item.bg} border ${item.border}`}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold tracking-widest ${item.color}`}>{item.pillar}</span>
                <span className="text-[10px] text-zinc-500">{item.duration}</span>
              </div>
              <p className="text-xs text-zinc-300 mt-0.5 truncate">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-600 border-t border-white/5 pt-3">
        <span className="font-mono">JSON → UI · 0.8s</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-physical inline-block" />
          Guardrails actifs
        </span>
      </div>
    </div>
  )
}

const PHASES = [
  { id: 'checkin', duration: 5000, component: <CheckInPhase /> },
  { id: 'loading', duration: 3000, component: <LoadingPhase /> },
  { id: 'program', duration: 5500, component: <ProgramPhase /> },
]

function CheckInMock() {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setPhaseIdx((i) => (i + 1) % PHASES.length)
        setVisible(true)
      }, 350)
    }, PHASES[phaseIdx].duration)
    return () => clearTimeout(t)
  }, [phaseIdx])

  return (
    <div className="relative w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-6 bg-accent/8 rounded-3xl blur-3xl pointer-events-none" />
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {PHASES[phaseIdx].component}
      </div>

      {/* Phase dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {PHASES.map((_, i) => (
          <span
            key={i}
            className={`block h-1 rounded-full transition-all duration-300 ${
              i === phaseIdx ? 'w-6 bg-accent' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Hero ── */
const STATS = [
  { value: '3', label: 'Piliers', sub: 'Corps · Nutrition · Mental' },
  { value: '2 min', label: 'Check-in', sub: 'Chaque matin' },
  { value: '0€', label: 'Phase Alpha', sub: 'Accès gratuit' },
]

export default function Hero() {
  return (
    <main id="accueil" className="relative pt-32 pb-16 lg:pt-48 lg:pb-28 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">

        {/* Left — text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-7 cursor-pointer group hover:bg-white/10 transition-colors animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-physical opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-physical" />
            </span>
            <span className="text-xs font-medium text-green-100/90 tracking-wide font-manrope">
              Phase Alpha · Rejoignez les 10 premiers testeurs
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-semibold text-slate-100 tracking-tighter font-manrope mb-6 drop-shadow-2xl text-balance">
            Votre bien-être global,{' '}
            <br className="hidden lg:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-purple-300 to-accent-nutrition">
              recalculé chaque matin.
            </span>
          </h1>

          <p className="text-lg text-zinc-300/80 max-w-xl mb-10 font-light leading-relaxed text-balance">
            Un coach IA bienveillant qui écoute votre corps, croise trois piliers — physique, nutrition et mental — et génère votre programme personnalisé en temps réel.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 w-full max-w-md mb-10 border-t border-b border-white/5 py-5">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-accent font-manrope">{s.value}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{s.label}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5 hidden sm:block">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto group px-8 py-3.5 bg-accent hover:bg-accent-dark text-black rounded-full font-bold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(167,139,250,0.6)] flex items-center justify-center gap-2.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 8v4l3 3"/>
              </svg>
              Rejoindre l'Alpha
            </a>
            <a
              href="#comment"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-zinc-700 bg-black/40 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2.5 font-medium"
            >
              Comment ça marche
            </a>
          </div>
        </div>

        {/* Right — animated mock */}
        <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
          <CheckInMock />
        </div>

      </div>

      {/* Partners strip */}
      <div className="mt-20 border-y border-white/5 bg-black/20 backdrop-blur-sm py-10 relative -mx-4 md:-mx-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase shrink-0">
            Technologies utilisées
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 hover:opacity-80 transition-all duration-700">
            {['Claude AI', 'GPT-4o', 'Make.com', 'Supabase', 'Tally Forms'].map((t) => (
              <span key={t} className="text-white font-manrope font-semibold text-base">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
