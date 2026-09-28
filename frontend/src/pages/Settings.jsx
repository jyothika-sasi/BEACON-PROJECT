import { useState } from 'react'
import './Settings.css'

function Settings() {
  const [lowLimit, setLowLimit] = useState(30)
  const [mediumLimit, setMediumLimit] = useState(60)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="settings-page">

      {/* Header */}
      <div className="settings-header">

        <div>
          <div className="page-eyebrow">
            SYSTEM CONFIGURATION
          </div>

          <h1>Settings</h1>

          <p>
            Configure how Beacon categorizes student dropout risk.
          </p>
        </div>

      </div>

      {/* Success message */}
      {saved && (
        <div className="settings-success">
          <i className="bi bi-check-circle-fill"></i>

          <div>
            <strong>Settings saved successfully</strong>

            <span>
              The risk thresholds have been updated.
            </span>
          </div>
        </div>
      )}

      {/* Risk threshold card */}
      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-heading-icon">
            <i className="bi bi-sliders"></i>
          </div>

          <div>
            <h2>Risk Threshold Configuration</h2>

            <p>
              Define the probability ranges used for Low, Medium and
              High risk categories.
            </p>
          </div>

        </div>

        <div className="threshold-content">

          {/* Low Risk */}
          <div className="threshold-row">

            <div className="threshold-info">

              <div className="threshold-color low"></div>

              <div>
                <strong>Low Risk</strong>

                <span>
                  Students with relatively low predicted dropout risk.
                </span>
              </div>

            </div>

            <div className="threshold-value">
              <span>0%</span>

              <span className="threshold-separator">to</span>

              <div className="percentage-input">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={lowLimit}
                  onChange={(event) =>
                    setLowLimit(Number(event.target.value))
                  }
                />
                <span>%</span>
              </div>

            </div>

          </div>

          {/* Medium Risk */}
          <div className="threshold-row">

            <div className="threshold-info">

              <div className="threshold-color medium"></div>

              <div>
                <strong>Medium Risk</strong>

                <span>
                  Students requiring monitoring and possible intervention.
                </span>
              </div>

            </div>

            <div className="threshold-value">

              <span>{lowLimit}%</span>

              <span className="threshold-separator">to</span>

              <div className="percentage-input">
                <input
                  type="number"
                  min={lowLimit + 1}
                  max="99"
                  value={mediumLimit}
                  onChange={(event) =>
                    setMediumLimit(Number(event.target.value))
                  }
                />
                <span>%</span>
              </div>

            </div>

          </div>

          {/* High Risk */}
          <div className="threshold-row">

            <div className="threshold-info">

              <div className="threshold-color high"></div>

              <div>
                <strong>High Risk</strong>

                <span>
                  Students requiring timely faculty attention.
                </span>
              </div>

            </div>

            <div className="threshold-value">

              <span>{mediumLimit}%</span>

              <span className="threshold-separator">to</span>

              <div className="percentage-display">
                100%
              </div>

            </div>

          </div>

        </div>

        {/* Visual preview */}
        <div className="threshold-preview">

          <div className="preview-header">

            <div>
              <h3>Risk Range Preview</h3>

              <p>
                Current threshold configuration
              </p>
            </div>

          </div>

          <div className="preview-bar">

            <div
              className="preview-low"
              style={{
                width: `${lowLimit}%`,
              }}
            ></div>

            <div
              className="preview-medium"
              style={{
                width: `${mediumLimit - lowLimit}%`,
              }}
            ></div>

            <div
              className="preview-high"
              style={{
                width: `${100 - mediumLimit}%`,
              }}
            ></div>

          </div>

          <div className="preview-labels">

            <span>
              <i className="preview-dot low-dot"></i>
              Low: 0–{lowLimit}%
            </span>

            <span>
              <i className="preview-dot medium-dot"></i>
              Medium: {lowLimit}–{mediumLimit}%
            </span>

            <span>
              <i className="preview-dot high-dot"></i>
              High: {mediumLimit}–100%
            </span>

          </div>

        </div>

        {/* Actions */}
        <div className="settings-actions">

          <button
            className="reset-button"
            onClick={() => {
              setLowLimit(30)
              setMediumLimit(60)
            }}
          >
            Reset to Default
          </button>

          <button
            className="save-settings-button"
            onClick={handleSave}
          >
            <i className="bi bi-check-lg"></i>
            Save Changes
          </button>

        </div>

      </section>

      {/* Information */}
      <section className="settings-info-card">

        <div className="info-icon">
          <i className="bi bi-info-circle"></i>
        </div>

        <div>
          <strong>How risk thresholds work</strong>

          <p>
            Beacon uses the model's predicted dropout probability to
            assign each student to a risk category. Lower probability
            indicates lower predicted risk, while higher probability
            indicates higher predicted risk.
          </p>
        </div>

      </section>

    </div>
  )
}

export default Settings