
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Administrator')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const trimmedEmail = email.trim()

    if (!trimmedEmail || !password) {
      setError('Please enter your email and password.')
      return
    }

    const user = {
      name: trimmedEmail.split('@')[0],
      email: trimmedEmail,
      role: role,
    }

    localStorage.setItem('beaconUser', JSON.stringify(user))

    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">

          {/* Login Heading */}
          <div className="login-heading">
            <p>BEACON SYSTEM</p>

            <h1>Welcome Back</h1>

            <span>
              Sign in to access the BEACON system
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="role-section">
              <label>Login as</label>

              <div className="role-options">

                <button
                  type="button"
                  className={
                    role === 'Administrator'
                      ? 'role-card active'
                      : 'role-card'
                  }
                  onClick={() => setRole('Administrator')}
                  aria-pressed={role === 'Administrator'}
                >
                  <strong>Administrator</strong>
                </button>

                <button
                  type="button"
                  className={
                    role === 'Faculty Advisor'
                      ? 'role-card active'
                      : 'role-card'
                  }
                  onClick={() => setRole('Faculty Advisor')}
                  aria-pressed={role === 'Faculty Advisor'}
                >
                  <strong>Faculty Advisor</strong>
                </button>

                <button
                  type="button"
                  className={
                    role === 'Department Coordinator'
                      ? 'role-card active'
                      : 'role-card'
                  }
                  onClick={() =>
                    setRole('Department Coordinator')
                  }
                  aria-pressed={role === 'Department Coordinator'}
                >
                  <strong>Department Coordinator</strong>
                </button>

              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
            >
              LOGIN
              <span aria-hidden="true">→</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
