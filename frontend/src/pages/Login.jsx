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

  if (!email || !password) {
    setError('Please enter your email and password.')
    return
  }

  const user = {
    name: email.split('@')[0],
    email: email,
    role: role,
  }

  localStorage.setItem('beaconUser', JSON.stringify(user))

  if (role === 'Administrator') {
    navigate('/dashboard')
  } else if (role === 'Faculty Advisor') {
    navigate('/dashboard')
  } else if (role === 'Department Coordinator') {
    navigate('/dashboard')
  }
}

  return (
    <div className="login-page">

      {/* Left side - College image */}
      <div className="login-image">
        <div className="login-image-overlay">
          <p>COLLEGE OF ENGINEERING CHENGANNUR</p>

          <h1>BEACON</h1>

          <h2>
            AI-Powered Early Warning System
            <br />
            for Student Dropout Prediction
          </h2>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="login-container">

        <div className="login-box">

          <div className="login-heading">
            <p>WELCOME BACK</p>

            <h1>Login</h1>

            <span>
              Sign in to access the BEACON system
            </span>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role */}
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
                >
                  <strong>Department Coordinator</strong>

                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="login-submit"
            >
              LOGIN
              <span>→</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login