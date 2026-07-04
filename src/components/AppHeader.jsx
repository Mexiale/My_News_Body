import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AppHeader() {
  const { user, profile, signOut } = useAuth()

  return (
    <header className="fixed top-0 w-full z-50 pt-5 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="rounded-full px-5 py-3 flex items-center justify-between bg-black/70 backdrop-blur-2xl border border-white/10">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center border border-white/10 text-white font-bold font-manrope text-sm">
              M
            </div>
            <span className="text-base font-manrope font-bold tracking-tight text-white hidden sm:block">
              My New Body
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Mon bilan
                </Link>
                <Link
                  to="/check-in"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Check-in
                </Link>
                <button
                  onClick={signOut}
                  className="text-xs text-zinc-500 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-colors"
                  title={profile?.prenom ? `Connectée : ${profile.prenom}` : undefined}
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
