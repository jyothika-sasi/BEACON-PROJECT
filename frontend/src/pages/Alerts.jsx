import { Link } from 'react-router-dom'
import './Alerts.css'

function Alerts() {
  const alerts = [
    {
      id: 1,
      studentId: 'BCN2026001',
      name: 'Rahul Kumar',
      department: 'Computer Science & Engineering',
      risk: 78,
      reason: 'Low attendance and 3 academic backlogs',
      time: 'Today, 10:32 AM',
      status: 'New',
    },
    {
      id: 2,
      studentId: 'BCN2026017',
      name: 'Anjali Nair',
      department: 'Computer Science & Engineering',
      risk: 72,
      reason: 'Declining academic performance',
      time: 'Today, 09:48 AM',
      status: 'New',
    },
    {
      id: 3,
      studentId: 'BCN2026042',
      name: 'Arjun Menon',
      department: 'Information Technology',
      risk: 69,
      reason: 'Attendance below 65%',
      time: 'Yesterday, 04:15 PM',
      status: 'Review',
    },
    {
      id: 4,
      studentId: 'BCN2026078',
      name: 'Meera Thomas',
      department: 'Electronics & Communication',
      risk: 64,
      reason: 'Multiple failed courses',
      time: 'Yesterday, 02:27 PM',
      status: 'Review',
    },
    {
      id: 5,
      studentId: 'BCN2026093',
      name: 'Vishnu Raj',
      department: 'Computer Science & Engineering',
      risk: 61,
      reason: 'Reduced attendance trend',
      time: '18 Sep 2026, 11:20 AM',
      status: 'Review',
    },
  ]

  return (
    <div className="alerts-page">

      {/* Header */}
      <div className="alerts-header">

        <div>
          <div className="page-eyebrow">STUDENT MONITORING</div>

          <h1>Alerts</h1>

          <p>
            Review students who may require timely academic intervention.
          </p>
        </div>

        <div className="alert-summary">
          <div className="summary-icon">
            <i className="bi bi-bell"></i>
          </div>

          <div>
            <strong>18</strong>
            <span>High-risk students</span>
          </div>
        </div>

      </div>

      {/* Summary cards */}
      <div className="alert-summary-grid">

        <div className="alert-summary-card high">
          <div className="alert-card-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>

          <div>
            <span>High Risk</span>
            <strong>18</strong>
            <small>Require attention</small>
          </div>
        </div>

        <div className="alert-summary-card new">
          <div className="alert-card-icon">
            <i className="bi bi-bell"></i>
          </div>

          <div>
            <span>New Alerts</span>
            <strong>12</strong>
            <small>Not reviewed yet</small>
          </div>
        </div>

        <div className="alert-summary-card review">
          <div className="alert-card-icon">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <span>Under Review</span>
            <strong>6</strong>
            <small>Faculty follow-up</small>
          </div>
        </div>

      </div>

      {/* Alerts table */}
      <section className="alerts-card">

        <div className="alerts-card-header">

          <div>
            <h2>Recent Risk Alerts</h2>

            <p>
              Students with elevated predicted dropout risk.
            </p>
          </div>

          <div className="alert-filter">

            <select defaultValue="all">
              <option value="all">All Alerts</option>
              <option value="new">New</option>
              <option value="review">Under Review</option>
            </select>

          </div>

        </div>

        <div className="alerts-table-wrapper">

          <table className="alerts-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Risk Score</th>
                <th>Reason</th>
                <th>Detected</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {alerts.map((alert) => (

                <tr key={alert.id}>

                  <td>
                    <div className="alert-student">

                      <div className="alert-avatar">
                        {alert.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')}
                      </div>

                      <div>
                        <strong>{alert.name}</strong>
                        <span>
                          {alert.studentId} · {alert.department}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <div className="risk-score-cell">

                      <div className="risk-score-top">
                        <strong>{alert.risk}%</strong>

                        <span className="high-risk-label">
                          High
                        </span>
                      </div>

                      <div className="mini-risk-bar">
                        <div
                          style={{
                            width: `${alert.risk}%`,
                          }}
                        ></div>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="reason-text">
                      {alert.reason}
                    </span>
                  </td>

                  <td>
                    <span className="detected-time">
                      {alert.time}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`alert-status ${alert.status.toLowerCase()}`}
                    >
                      {alert.status}
                    </span>
                  </td>

                  <td>

                    <Link
                      to={`/students/${alert.studentId}`}
                      className="view-alert-button"
                    >
                      View
                      <i className="bi bi-arrow-right"></i>
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  )
}

export default Alerts