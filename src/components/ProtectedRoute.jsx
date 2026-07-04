import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, profile, loading, isAlphaTester, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl px-8 py-6 text-zinc-400 text-sm animate-pulse">
          Chargement…
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/alpha" replace />

  if (profile && !isAlphaTester) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-10 max-w-md text-center border border-accent/20">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-xl font-bold font-manrope text-white mb-3">
            Votre accès Alpha est en attente
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Votre compte existe mais votre place alpha n'est pas encore confirmée. Vous recevrez
            un email dès qu'elle sera activée (10 places seulement).
          </p>
          <button
            onClick={signOut}
            className="text-xs text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    )
  }

  return children
}
