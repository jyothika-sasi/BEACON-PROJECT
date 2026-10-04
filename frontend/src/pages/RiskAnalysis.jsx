import './RiskAnalysis.css'

function RiskAnalysis() {
  return (
    <div className="risk-analysis-page">

      <div className="page-header">
        <div>
          <h2>Risk Analysis</h2>
          <p>
            Analyze student dropout risk and identify students who may need
            early support.
          </p>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="risk-summary">

        <div className="risk-card high">
          <div className="risk-card-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div>
            <span>High Risk</span>
            <strong>12</strong>
            <small>Students</small>
          </div>
        </div>

        <div className="risk-card medium">
          <div className="risk-card-icon">
            <i className="bi bi-exclamation-circle-fill"></i>
          </div>
          <div>
            <span>Medium Risk</span>
            <strong>24</strong>
            <small>Students</small>
          </div>
        </div>

        <div className="risk-card low">
          <div className="risk-card-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <div>
            <span>Low Risk</span>
            <strong>83</strong>
            <small>Students</small>
          </div>
        </div>

        <div className="risk-card total">
          <div className="risk-card-icon">
            <i className="bi bi-people-fill"></i>
          </div>
          <div>
            <span>Total Students</span>
            <strong>119</strong>
            <small>Analyzed</small>
          </div>
        </div>

      </div>

      {/* Analysis Section */}
      <div className="analysis-panel">

        <div className="analysis-header">
          <div>
            <h3>Student Risk Analysis</h3>
            <p>
              Students are classified based on academic and attendance
              indicators.
            </p>
          </div>

          <select className="risk-filter">
            <option>All Risk Levels</option>
            <option>High Risk</option>
            <option>Medium Risk</option>
            <option>Low Risk</option>
          </select>
        </div>

        <div className="risk-table-wrapper">
          <table className="risk-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Attendance</th>
                <th>Backlogs</th>
                <th>Risk Level</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">AS</div>
                    <div>
                      <strong>Anjali S</strong>
                      <span>CEC001</span>
                    </div>
                  </div>
                </td>

                <td>CSE</td>
                <td>5.8</td>
                <td>62%</td>
                <td>3</td>

                <td>
                  <span className="risk-badge high-badge">
                    High
                  </span>
                </td>

                <td>
                  <button className="view-risk-button">
                    View
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">RM</div>
                    <div>
                      <strong>Rahul M</strong>
                      <span>CEC014</span>
                    </div>
                  </div>
                </td>

                <td>ECE</td>
                <td>6.7</td>
                <td>71%</td>
                <td>2</td>

                <td>
                  <span className="risk-badge medium-badge">
                    Medium
                  </span>
                </td>

                <td>
                  <button className="view-risk-button">
                    View
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="student-cell">
                    <div className="student-avatar">NK</div>
                    <div>
                      <strong>Nikhil K</strong>
                      <span>CEC027</span>
                    </div>
                  </div>
                </td>

                <td>EEE</td>
                <td>8.1</td>
                <td>89%</td>
                <td>0</td>

                <td>
                  <span className="risk-badge low-badge">
                    Low
                  </span>
                </td>

                <td>
                  <button className="view-risk-button">
                    View
                  </button>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  )
}

export default RiskAnalysis