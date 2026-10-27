import { useEffect, useState } from 'react'
import Login from './Login'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let isMounted = true

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (isMounted) {
        setSession(currentSession)
        setCheckingSession(false)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession)
      },
    )

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setSession(null)
  }

  if (checkingSession) {
    return (
      <main className="loading-state">
        <div className="loading-orb" aria-hidden="true" />
        <p>Comprobando tu sesión…</p>
      </main>
    )
  }

  if (!supabase) {
    return (
      <main className="config-state">
        <div className="config-card">
          <span className="status-badge">Configuración pendiente</span>
          <h1>Conecta Supabase para comenzar</h1>
          <p>
            Copia <code>.env.example</code> como <code>.env</code> y completa las
            variables públicas del proyecto Supabase.
          </p>
        </div>
      </main>
    )
  }

  if (!session) {
    return <Login onLogin={setSession} />
  }

  return (
    <main className="welcome-layout">
      <div className="welcome-card">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">SESIÓN ACTIVA</p>
        <h1>Qué bueno verte.</h1>
        <p className="welcome-copy">
          Has iniciado sesión con <strong>{session.user.email}</strong>.
        </p>
        <button className="secondary-button" type="button" onClick={handleLogout}>
          Cerrar sesión <span aria-hidden="true">↗</span>
        </button>
      </div>
    </main>
  )
}

export default App
