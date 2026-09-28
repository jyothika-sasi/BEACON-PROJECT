import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="login-brand">
          <div className="login-brand-icon">
            <i className="bi bi-shield-check"></i>
          </div>

          <div>
            <h1>Beacon</h1>
            <span>Student Early Warning System</span>
          </div>
        </div>

        <div className="login-message">

          <p className="login-eyebrow">
            EARLY INTERVENTION • BETTER OUTCOMES
          </p>

          <h2>
            Identify risk early.
            <br />
            Support students sooner.
          </h2>

          <p>
            Beacon helps faculty identify students who may be
            at risk of dropping out and supports timely,
            data-driven intervention.
          </p>

        </div>

        <div className="login-footer">
          © 2026 Beacon · Academic Support System
        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <div className="login-card-header">

            <div className="mobile-login-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to access your Beacon dashboard.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <div className="input-wrapper">

                <i className="bi bi-envelope"></i>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <i className="bi bi-lock"></i>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />

              </div>

            </div>

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

                <span>Remember me</span>

              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="login-button"
            >
              Sign in
              <i className="bi bi-arrow-right"></i>
            </button>

          </form>

          <div className="login-security">

            <i className="bi bi-shield-lock"></i>

            <span>
              Secure access for authorized faculty and administrators
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login