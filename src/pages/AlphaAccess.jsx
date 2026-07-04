import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Background from '../components/Background'
import { useAuth } from '../contexts/AuthContext'

export default function AlphaAccess() {
  const { user, loading, signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: authError } = await signInWithEmail(email.trim().toLowerCase())
    setSubmitting(false)
    if (authError) {
      setError(
        authError.message?.includes('rate')
          ? 'Trop de tentatives. Patiente quelques minutes avant de réessayer.'
          : "Impossible d'envoyer le lien. Vérifie ton adresse email."
      )
      return
    }
    setSent(true)
  }

  return (
    <div className="relative font-inter min-h-screen">
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <Link to="/" className="flex items-center gap-2.5 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center border border-white/10 text-white font-bold font-manrope">
            M
          </div>
          <span className="text-lg font-manrope font-bold tracking-tight text-white">
            My New Body
          </span>
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-10 w-full max-w-md border border-white/8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📬</div>
              <h1 className="text-xl font-bold font-manrope text-white mb-3">
                Vérifie ta boîte mail
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Un lien de connexion a été envoyé à <span className="text-accent">{email}</span>.
                Clique dessus pour accéder à ton espace testeur.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-xs text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
              >
                Utiliser une autre adresse
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold font-manrope text-white mb-2">Espace testeur</h1>
                <p className="text-zinc-500 text-sm">
                  Connexion sans mot de passe — un lien magique est envoyé par email.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@email.com"
                    className="w-full bg-black/50 border border-white/10 focus:border-accent rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-accent hover:bg-accent-dark disabled:opacity-60 text-black font-bold rounded-xl transition-colors text-sm tracking-wide"
                >
                  {submitting ? 'Envoi…' : 'Recevoir mon lien de connexion →'}
                </button>

                <p className="text-center text-xs text-zinc-600">
                  Pas encore candidat(e) ?{' '}
                  <Link to="/#contact" className="text-accent hover:underline">
                    Rejoindre la liste Alpha
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
