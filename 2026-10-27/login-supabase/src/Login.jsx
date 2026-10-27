import { useState } from 'react'
import { supabase } from './supabaseClient'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage(null)
    setLoading(true)

    const response = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (response.error) {
      setMessage({ type: 'error', text: response.error.message })
      return
    }

    if (response.data.session) {
      onLogin(response.data.session)
      return
    }

    setMessage({
      type: 'success',
      text: 'Cuenta creada. Revisa tu correo para confirmar la dirección.',
    })
  }

  const toggleMode = () => {
    setIsSignUp((currentMode) => !currentMode)
    setMessage(null)
  }

  return (
    <main className="auth-layout">
      <section className="intro-panel" aria-label="Información del proyecto">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">PRÁCTICA  ·  27 OCT 2026</p>
        <h1>Tu espacio, <em>protegido.</em></h1>
        <p className="intro-copy">
          Un acceso sencillo construido con React, Vite y la autenticación de
          Supabase.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon" aria-hidden="true">✓</span>
            <span>Sesiones persistentes y seguras</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon" aria-hidden="true">✓</span>
            <span>Registro con confirmación de email</span>
          </div>
        </div>
      </section>

      <section className="form-panel" aria-labelledby="auth-title">
        <div className="form-card">
          <div className="form-heading">
            <p className="eyebrow">BIENVENIDA</p>
            <h2 id="auth-title">{isSignUp ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
            <p>
              {isSignUp
                ? 'Comienza con tu correo y una contraseña segura.'
                : 'Ingresa tus datos para continuar.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div className="field-group">
              <div className="label-row">
                <label htmlFor="password">Contraseña</label>
                <span className="field-hint">Mínimo 6 caracteres</span>
              </div>
              <input
                id="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {message && (
              <p className={`form-message ${message.type}`} role="status">
                {message.text}
              </p>
            )}

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Procesando…' : isSignUp ? 'Crear cuenta' : 'Entrar'}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="mode-switch">
            <span>{isSignUp ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}</span>
            <button type="button" onClick={toggleMode}>
              {isSignUp ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </div>

          <p className="legal-copy">
            Al continuar aceptas el uso de este proyecto académico para practicar
            autenticación con Supabase.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
