import { useState } from 'react'
import { supabase } from '../lib/supabase'

const OBJECTIFS = ['Perdre du poids', 'Prendre de la masse', 'Réduire le stress', 'Mieux manger', 'Améliorer mon sommeil', 'Équilibre global']
const NIVEAUX = ['Débutant(e)', 'Intermédiaire', 'Confirmé(e)']

export default function Contact() {
  const [form, setForm] = useState({ prenom: '', email: '', objectif: '', niveau: '', website: '' })
  const [sent, setSent] = useState(false)
  const [sentMessage, setSentMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.objectif || !form.niveau) {
      setError('Choisis ton objectif principal et ton niveau d’activité.')
      return
    }

    setSubmitting(true)
    const { data, error: fnError } = await supabase.functions.invoke('submit-alpha-application', {
      body: {
        prenom: form.prenom.trim(),
        email: form.email.trim().toLowerCase(),
        objectif: form.objectif,
        niveau: form.niveau,
        website: form.website, // honeypot — reste vide pour les humains
      },
    })
    setSubmitting(false)

    if (fnError || data?.error) {
      setError(data?.error || 'Impossible d’envoyer ta candidature. Réessaie dans un instant.')
      return
    }

    setSentMessage(data?.message || '')
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="py-24 px-4 md:px-6 bg-zinc-900/20 border-t border-white/5">
      <div className="max-w-2xl mx-auto">

        {sent ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-accent/20">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-2xl font-bold font-manrope text-white mb-3">
              Bienvenue dans l'aventure !
            </h2>
            <p className="text-zinc-400 text-sm">
              {sentMessage || 'Votre demande a été enregistrée. Vous recevrez un email dès que votre place alpha est confirmée.'}
            </p>
            <p className="text-accent text-xs mt-4 font-mono">
              my.new.body · Abidjan 🇨🇮
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 md:p-10 border border-white/8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-manrope text-white mb-2">Rejoindre la liste Alpha</h2>
              <p className="text-zinc-500 text-sm">10 places disponibles · Inscription gratuite</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-wider">Prénom</label>
                  <input
                    type="text"
                    required
                    value={form.prenom}
                    onChange={set('prenom')}
                    placeholder="Votre prénom"
                    className="w-full bg-black/50 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    placeholder="vous@email.com"
                    className="w-full bg-black/50 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Honeypot anti-bot : invisible pour les humains */}
              <input
                type="text"
                value={form.website}
                onChange={set('website')}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: 'none' }}
                aria-hidden="true"
              />

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-wider">Objectif principal</label>
                <div className="flex flex-wrap gap-2">
                  {OBJECTIFS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, objectif: o }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        form.objectif === o
                          ? 'bg-accent/20 border-accent/50 text-accent'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/25'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-wider">Niveau d'activité</label>
                <div className="flex gap-3">
                  {NIVEAUX.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, niveau: n }))}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        form.niveau === n
                          ? 'bg-accent-physical/20 border-accent-physical/50 text-accent-physical'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/25'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-accent hover:bg-accent-dark disabled:opacity-60 text-black font-bold rounded-xl transition-colors text-sm tracking-wide mt-2"
              >
                {submitting ? 'Envoi en cours…' : 'Activer mon accès Alpha →'}
              </button>

              <p className="text-center text-xs text-zinc-600">
                Vos données restent confidentielles et ne sont jamais partagées.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
