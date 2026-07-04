import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '../components/Background'
import AppHeader from '../components/AppHeader'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const todayISO = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const formatDateFr = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

function PillarCard({ color, emoji, title, children }) {
  const borders = {
    physical: 'border-accent-physical/25 pillar-physical',
    nutrition: 'border-accent-nutrition/25 pillar-nutrition',
    mental: 'border-accent/25 pillar-mental',
  }
  const titles = {
    physical: 'text-accent-physical',
    nutrition: 'text-accent-nutrition',
    mental: 'text-accent',
  }
  return (
    <div className={`glass-card rounded-3xl p-6 border ${borders[color]}`}>
      <h2 className={`text-sm font-bold uppercase tracking-wider mb-4 ${titles[color]}`}>
        <span className="mr-2">{emoji}</span>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [program, setProgram] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [retrying, setRetrying] = useState(false)
  const [retryError, setRetryError] = useState('')
  const [todayCheckIn, setTodayCheckIn] = useState(null)

  const today = todayISO()

  const loadData = async () => {
    const [{ data: prog }, { data: checkIns }, { data: checkInToday }] = await Promise.all([
      supabase
        .from('daily_programs')
        .select('*')
        .eq('user_id', user.id)
        .eq('program_date', today)
        .maybeSingle(),
      supabase
        .from('check_ins')
        .select('checkin_date, sommeil, energie, stress, douleurs, humeur')
        .eq('user_id', user.id)
        .order('checkin_date', { ascending: false })
        .limit(7),
      supabase
        .from('check_ins')
        .select('id')
        .eq('user_id', user.id)
        .eq('checkin_date', today)
        .maybeSingle(),
    ])
    setProgram(prog ?? null)
    setHistory(checkIns ?? [])
    setTodayCheckIn(checkInToday ?? null)
    setLoading(false)
  }

  useEffect(() => {
    if (user) loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Check-in fait mais programme manquant (échec IA précédent) → relance
  const retryGeneration = async () => {
    setRetrying(true)
    setRetryError('')
    const { data, error } = await supabase.functions.invoke('generate-daily-program', {
      body: { checkin_date: today },
    })
    setRetrying(false)
    if (error || data?.error) {
      setRetryError(data?.error || 'Le coach IA est momentanément indisponible.')
      return
    }
    setProgram(data.program)
  }

  return (
    <div className="relative font-inter min-h-screen">
      <Background />
      <div className="relative z-10">
        <AppHeader />

        <main className="max-w-3xl mx-auto px-4 pt-32 pb-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-manrope text-white">
              Bonjour{profile?.prenom ? ` ${profile.prenom}` : ''} 👋
            </h1>
            <p className="text-zinc-500 text-sm mt-1 capitalize">{formatDateFr(today)}</p>
          </div>

          {loading ? (
            <div className="glass-card rounded-3xl p-12 text-center text-zinc-400 text-sm animate-pulse">
              Chargement de ton bilan…
            </div>
          ) : !todayCheckIn ? (
            <div className="glass-card rounded-3xl p-10 text-center border border-accent/20 mb-10">
              <div className="text-4xl mb-4">🌅</div>
              <h2 className="text-xl font-bold font-manrope text-white mb-3">
                Ton check-in du jour t'attend
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                2 minutes pour écouter ton corps — ton programme sera recalculé en fonction.
              </p>
              <Link
                to="/check-in"
                className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-dark text-black font-bold rounded-xl transition-colors text-sm"
              >
                Faire mon check-in →
              </Link>
            </div>
          ) : !program ? (
            <div className="glass-card rounded-3xl p-10 text-center border border-accent/20 mb-10">
              <div className="text-4xl mb-4">🧠</div>
              <h2 className="text-xl font-bold font-manrope text-white mb-3">
                Ton programme n'a pas encore été généré
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                Ton check-in est enregistré. Relance la génération de ton programme du jour.
              </p>
              {retryError && <p className="text-sm text-red-400 mb-4">{retryError}</p>}
              <button
                onClick={retryGeneration}
                disabled={retrying}
                className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-dark disabled:opacity-60 text-black font-bold rounded-xl transition-colors text-sm"
              >
                {retrying ? 'Génération en cours…' : 'Générer mon programme →'}
              </button>
            </div>
          ) : (
            <>
              {program.alerte && (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-5 mb-8">
                  <p className="text-sm font-bold text-red-300 mb-1">⚠️ Ton coach te recommande</p>
                  <p className="text-sm text-red-200/90 leading-relaxed">{program.alerte}</p>
                  <p className="text-xs text-red-300/70 mt-2 font-mono">
                    Urgence médicale en Côte d'Ivoire : SAMU 185
                  </p>
                </div>
              )}

              {program.resume && (
                <div className="glass-card rounded-3xl p-6 mb-6 border border-white/8">
                  <p className="text-zinc-300 text-sm leading-relaxed">{program.resume}</p>
                </div>
              )}

              <div className="space-y-6 mb-12">
                <PillarCard color="physical" emoji="💪" title={`Physique — ${program.physique?.titre ?? ''}`}>
                  <p className="text-xs text-zinc-500 mb-3">
                    ⏱️ {program.physique?.duree_minutes} min
                  </p>
                  <ul className="space-y-2 mb-4">
                    {(program.physique?.exercices ?? []).map((ex, i) => (
                      <li key={i} className="text-sm text-zinc-300 flex gap-2.5">
                        <span className="text-accent-physical shrink-0">•</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                  {program.physique?.conseil && (
                    <p className="text-xs text-zinc-500 italic border-t border-white/5 pt-3">
                      💡 {program.physique.conseil}
                    </p>
                  )}
                </PillarCard>

                <PillarCard color="nutrition" emoji="🥗" title={`Nutrition — ${program.nutrition?.titre ?? ''}`}>
                  <div className="space-y-3 text-sm text-zinc-300">
                    <p><span className="text-accent-nutrition font-bold">Matin :</span> {program.nutrition?.matin}</p>
                    <p><span className="text-accent-nutrition font-bold">Midi :</span> {program.nutrition?.midi}</p>
                    <p><span className="text-accent-nutrition font-bold">Soir :</span> {program.nutrition?.soir}</p>
                  </div>
                  {program.nutrition?.hydratation && (
                    <p className="text-xs text-zinc-500 italic border-t border-white/5 pt-3 mt-4">
                      💧 {program.nutrition.hydratation}
                    </p>
                  )}
                </PillarCard>

                <PillarCard color="mental" emoji="🧘" title={`Mental — ${program.mental?.titre ?? ''}`}>
                  <p className="text-xs text-zinc-500 mb-3">
                    ⏱️ {program.mental?.duree_minutes} min
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {program.mental?.pratique}
                  </p>
                  {program.mental?.affirmation && (
                    <blockquote className="text-sm text-accent italic border-l-2 border-accent/40 pl-4">
                      “{program.mental.affirmation}”
                    </blockquote>
                  )}
                </PillarCard>
              </div>
            </>
          )}

          {history.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
                Tes 7 derniers check-ins
              </h2>
              <div className="space-y-2">
                {history.map((c) => (
                  <div
                    key={c.checkin_date}
                    className="glass-card rounded-xl px-4 py-3 flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-400 capitalize">{formatDateFr(c.checkin_date)}</span>
                    <span className="font-mono text-zinc-500">
                      😴{c.sommeil} ⚡{c.energie} 🌪️{c.stress} 🦴{c.douleurs} 🌤️{c.humeur}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
