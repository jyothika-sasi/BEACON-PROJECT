import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">

      {/* College Background */}
      <div className="landing-background"></div>

      {/* Dark overlay */}
      <div className="landing-overlay"></div>

      {/* Content */}
      <div className="landing-content">

        <p className="college-name">
          COLLEGE OF ENGINEERING CHENGANNUR
        </p>

        <div className="divider"></div>

        <h1>BEACON</h1>

        <h2>
          AI-Powered Early Warning System
          <br />
          for Student Dropout Prediction
        </h2>

        <p className="landing-description">
          Identify students at risk early through intelligent
          prediction, risk analysis and timely alerts.
        </p>

        <button
          className="login-button"
          onClick={() => navigate('/login')}
        >
          LOGIN
          <span>→</span>
        </button>

      </div>

    </div>
  )
}

export default Landing