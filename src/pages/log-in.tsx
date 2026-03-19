import { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, setAuthSession } from '../lib/api'

export default function Login() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const validatePassword = (value: string) => {
    const hasLetter = /[a-zA-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasPunctuation = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
    if (!hasLetter || !hasNumber || !hasPunctuation) {
      return 'Password must contain a letter, a number, and punctuation'
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setFormError('')

    if (activeTab === 'signup' && !name.trim()) {
      setFormError('Please enter your name')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      setPasswordError(passwordValidation)
      return
    }

    if (activeTab === 'signup' && password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setIsSubmitting(true)

    try {
      const authResponse =
        activeTab === 'login'
          ? await loginUser({ email, password })
          : await registerUser({ name: name.trim(), email, password })

      setAuthSession(authResponse.token, authResponse.user)
      navigate('/home')
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to sign in right now')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app-container">
      <div className="form-card">
        <div className="header">
          <h1>Welcome back</h1>
          <p>Continue your learning journey</p>
        </div>

        <div className="tab-slider">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('login')
              setFormError('')
            }}
            type="button"
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === 'signup' ? 'tab-active' : ''}`}
            onClick={() => {
              setActiveTab('signup')
              setFormError('')
            }}
            type="button"
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form" noValidate>
          {activeTab === 'signup' && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              placeholder="you@example.com"
              className={emailError ? 'input-error' : ''}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError('')
                }}
                placeholder="Password"
                className={passwordError ? 'input-error' : ''}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {activeTab === 'signup' && (
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value)
                    if (passwordError) setPasswordError('')
                  }}
                  placeholder="Confirm password"
                  className={passwordError ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          {passwordError && <span className="error-message">{passwordError}</span>}
          {formError && <span className="error-message">{formError}</span>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : activeTab === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <p className="forgot-password">Use sign up to create your first account on the new backend.</p>
      </div>
    </div>
  )
}
