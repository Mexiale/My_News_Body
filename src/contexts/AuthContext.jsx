import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (currentUser) => {
    if (!currentUser) {
      setProfile(null)
      return
    }
    const { data } = await supabase
      .from('profiles')
      .select('prenom, objectif, niveau, is_alpha_tester')
      .eq('id', currentUser.id)
      .maybeSingle()
    setProfile(data ?? null)
  }, [])

  useEffect(() => {
    let cancelled = false

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return
      const currentUser = session?.user ?? null
      setUser(currentUser)
      await loadProfile(currentUser)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (cancelled) return
      const currentUser = session?.user ?? null
      setUser(currentUser)
      await loadProfile(currentUser)
      setLoading(false)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const signInWithEmail = useCallback(async (email) => {
    return supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAlphaTester: !!profile?.is_alpha_tester,
      signInWithEmail,
      signOut,
    }),
    [user, profile, loading, signInWithEmail, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}
