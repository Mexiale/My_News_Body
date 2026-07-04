import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../components/Background'
import AppHeader from '../components/AppHeader'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const todayISO = () => {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const SLIDERS = [
  { key: 'sommeil', label: 'Sommeil', emoji: '😴', low: 'Très mauvais', high: 'Excellent', color: 'accent' },
  { key: 'energie', label: 'Énergie', emoji: '⚡', low: 'Épuisée', high: 'En pleine forme', color: 'accent-physical' },
  { key: 'stress', label: 'Stress', emoji: '🌪️', low: 'Très calme', high: 'Très stressée', color: 'accent-nutrition' },
  { key: 'douleurs', label: 'Douleurs / courbatures', emoji: '🦴', low: 'Aucune', high: 'Intenses', color: 'accent' },
  { key: 'humeur', label: 'Humeur', emoji: '🌤️', low: 'Morose', high: 'Rayonnante', color: 'accent-physical' },
]

const NUTRITION_HIER = [
  { value: 'leger', label: 'Léger' },
  { value: 'equilibre', label: 'Équilibré' },
  { value: 'copieux', label: 'Copieux' },
  { value: 'irregulier', label: 'Irrégulier' },
]

export default function CheckIn() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [scores, setScores] = useState({ sommeil: 3, energie: 3, stress: 3, douleurs: 1, humeur: 3 })
  const [nutritionHier, setNutritionHier] = useState('equilibre')
  const [notes, setNotes] = useState('')
  const [phase, setPhase] = useState('form') // form | generating | error
  const [error, setError] = useState('')

  // Si le check-in du jour existe déjà, aller directement au bilan
  useEffect(() => {
    if (!user) return
    supabase
      .from('check_ins')
      .select('id')
      .eq('user_id', user.id)
      .eq('checkin_date', todayISO())
      .maybeSingle()
      .then(({ data }) => {
        if (data) navigate('/dashboard', { replace: true })
      })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setPhase('generating')

    const checkinDate = todayISO()
    const { error: insertError } = await supabase.from('check_ins').insert({
      user_id: user.id,
      checkin_date: checkinDate,
      ...scores,
      nutrition_hier: nutritionHier,
      notes: notes.trim() || null,
    })

    // 23505 : check-in déjà fait aujourd'hui → on génère/récupère quand même le programme
    if (insertError && insertError.code !== '23505') {
      setPhase('error')
      setError("Impossible d'enregistrer ton check-in. Réessaie.")
      return
    }

    const { data, error: fnError } = await supabase.functions.invoke('generate-daily-program', {
      body: { checkin_date: checkinDate },
    })

    if (fnError || data?.error) {
      setPhase('error')
      setError(data?.error || 'Le coach IA est momentanément indisponible. Ton check-in est bien enregistré — réessaie depuis ton bilan.')
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="relative font-inter min-h-screen">
      <Background />
      <div className="relative z-10">
        <AppHeader />

        <main className="max-w-2xl mx-auto px-4 pt-32 pb-24">
          {phase === 'generating' ? (
            <div className="glass-card rounded-3xl p-12 text-center border border-accent/20">
              <div className="text-4xl mb-5 animate-pulse">🧠</div>
              <h1 className="text-xl font-bold font-manrope text-white mb-3">
                Ton coach analyse ton check-in…
              </h1>
              <p className="text-zinc-400 text-sm">
                Génération de ton programme personnalisé du jour (Physique · Nutrition · Mental).
              </p>
              <div className="mt-6 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-accent-physical via-accent-nutrition to-accent rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold font-manrope text-white mb-2">
                  Check-in du matin
                </h1>
                <p className="text-zinc-500 text-sm">
                  Écoute ton corps. Ton programme du jour sera calibré sur tes réponses.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {SLIDERS.map((s) => (
                  <div key={s.key} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-white">
                        <span className="mr-2">{s.emoji}</span>
                        {s.label}
                      </label>
                      <span className="text-accent font-mono font-bold">{scores[s.key]}/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={scores[s.key]}
                      onChange={(e) =>
                        setScores((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))
                      }
                      className="w-full accent-[#a78bfa]"
                    />
                    <div className="flex justify-between text-[11px] text-zinc-600 mt-1">
                      <span>{s.low}</span>
                      <span>{s.high}</span>
                    </div>
                  </div>
                ))}

                <div className="glass-card rounded-2xl p-5">
                  <label className="block text-sm font-bold text-white mb-3">
                    🍽️ Ton alimentation hier
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {NUTRITION_HIER.map((n) => (
                      <button
                        key={n.value}
                        type="button"
                        onClick={() => setNutritionHier(n.value)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                          nutritionHier === n.value
                            ? 'bg-accent-nutrition/20 border-accent-nutrition/50 text-accent-nutrition'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/25'
                        }`}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5">
                  <label className="block text-sm font-bold text-white mb-3">
                    📝 Quelque chose à signaler ? <span className="text-zinc-600 font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 1000))}
                    rows={3}
                    placeholder="Douleur particulière, événement, envie du jour…"
                    className="w-full bg-black/50 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-accent-dark text-black font-bold rounded-xl transition-colors text-sm tracking-wide"
                >
                  Générer mon programme du jour →
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
