const ACTIVITIES_PHYSICAL = ['Yoga doux', 'Stretching ciblé', 'Renforcement musculaire', 'Marche active', 'Pilates', 'Natation douce']
const FOODS = ['Smoothie protéiné', 'Salade de quinoa', 'Bowl légumes rôtis', 'Omelette épinards', 'Avocat & œufs']
const MENTAL_EX = ['Cohérence cardiaque', 'Méditation guidée', 'Journaling 5 min', 'Exercice 4-7-8', 'Body scan']

export default function Pillars() {
  return (
    <section id="piliers" className="py-24 px-4 md:px-6 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3">L'Approche Holistique</p>
          <h2 className="text-3xl md:text-5xl font-manrope font-semibold tracking-tight">
            Les <span className="text-accent">3 Piliers</span> de votre bien-être
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl text-balance">
            L'IA ne sépare pas les disciplines — elle les croise pour s'adapter à votre énergie réelle du jour.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[300px]">

          {/* PHYSIQUE */}
          <div className="glass-card pillar-physical rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-physical/8 rounded-full blur-3xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-accent-physical/15 border border-accent-physical/25 flex items-center justify-center text-accent-physical">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-accent-physical mb-1">PILIER 01</p>
              <h3 className="text-xl font-bold font-manrope text-white mb-2">Physique</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Activités douces, fonctionnelles ou dynamiques adaptées à vos douleurs et votre niveau d'énergie du jour.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ACTIVITIES_PHYSICAL.slice(0, 3).map((a) => (
                <span key={a} className="text-[10px] px-2 py-1 rounded-full bg-accent-physical/10 border border-accent-physical/20 text-accent-physical">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* NUTRITION */}
          <div className="glass-card pillar-nutrition rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-nutrition/8 rounded-full blur-3xl pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-accent-nutrition/15 border border-accent-nutrition/25 flex items-center justify-center text-accent-nutrition">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"/>
                <path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-accent-nutrition mb-1">PILIER 02</p>
              <h3 className="text-xl font-bold font-manrope text-white mb-2">Nutrition</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Suggestions de repas basées sur vos besoins réels, votre humeur et la prévention — sans restriction culpabilisante.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {FOODS.slice(0, 3).map((f) => (
                <span key={f} className="text-[10px] px-2 py-1 rounded-full bg-accent-nutrition/10 border border-accent-nutrition/20 text-accent-nutrition">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* MENTAL — tall (row-span-2) */}
          <div className="glass-card pillar-mental md:row-span-2 rounded-3xl p-7 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
            </div>
            <p className="text-[10px] font-bold tracking-widest text-accent mb-1">PILIER 03</p>
            <h3 className="text-2xl font-bold font-manrope text-white mb-3">Mental</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Exercices de respiration (cohérence cardiaque), routines de sommeil et techniques de gestion du stress adaptées à votre journée.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {MENTAL_EX.map((e) => (
                <span key={e} className="text-[10px] px-2 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                  {e}
                </span>
              ))}
            </div>

            {/* Live indicator card */}
            <div className="mt-auto border border-zinc-800 bg-black/50 rounded-xl p-4 font-mono text-xs">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-500">Exercice actif</span>
                <span className="text-accent">COHÉRENCE 4-7-8</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-zinc-500">Stress détecté</span>
                <span className="text-accent-nutrition">MODÉRÉ · 5/10</span>
              </div>
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="bg-accent h-full w-[72%] animate-pulse-slow" />
              </div>
              <p className="text-zinc-600 text-[10px] mt-2">Respiration · Cycle 3 sur 5</p>
            </div>
          </div>

          {/* Wide bottom card */}
          <div className="glass-card md:col-span-2 rounded-3xl p-7 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-nutrition/5 pointer-events-none" />
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
              🔄
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold font-manrope text-white mb-2">L'IA croise les 3 piliers en temps réel</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Si vous signalez une forte fatigue, l'IA réduit l'intensité physique, adapte vos portions nutritionnelles et priorise un exercice de relaxation mentale.
                <span className="text-accent"> Chaque variable influence les autres.</span>
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-2 min-w-[130px]">
              {['Physique ↕ Mental', 'Nutrition ↕ Humeur', 'Fatigue ↕ Intensité'].map((r) => (
                <div key={r} className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {r}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
