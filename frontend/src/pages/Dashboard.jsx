import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const students = [
    {
      id: 'BCN2026001',
      name: 'Rahul Kumar',
      department: 'Computer Science',
      semester: 'S6',
      risk: 82,
      category: 'High',
    },
    {
      id: 'BCN2026042',
      name: 'Anjali Nair',
      department: 'Computer Science',
      semester: 'S6',
      risk: 68,
      category: 'High',
    },
    {
      id: 'BCN2026118',
      name: 'Arjun Raj',
      department: 'Information Technology',
      semester: 'S4',
      risk: 51,
      category: 'Medium',
    },
    {
      id: 'BCN2026077',
      name: 'Meera Joseph',
      department: 'Computer Science',
      semester: 'S4',
      risk: 34,
      category: 'Medium',
    },
    {
      id: 'BCN2026031',
      name: 'Adithya S',
      department: 'Electronics',
      semester: 'S6',
      risk: 18,
      category: 'Low',
    },
  ]

  const getRiskClass = (category) => {
    if (category === 'High') return 'risk-high'
    if (category === 'Medium') return 'risk-medium'
    return 'risk-low'
  }

  return (
    <div className="dashboard-content">

      {/* Welcome Section */}
      <div className="welcome-section">

        <div>

          <p className="welcome-label">
            FACULTY DASHBOARD
          </p>

          <h2>
            Good morning, Dr. Jyothika
          </h2>

          <p className="welcome-description">
            Monitor student risk levels and identify students
            who may need timely intervention.
          </p>

        </div>

        <div className="date-display">
          <i className="bi bi-calendar3"></i>
          <span>Academic Year 2026–27</span>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-icon students-icon">
            <i className="bi bi-people-fill"></i>
          </div>

          <div className="summary-content">
            <span>Total Students</span>
            <h3>248</h3>
            <small>Students monitored</small>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon high-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>

          <div className="summary-content">
            <span>High Risk</span>
            <h3>18</h3>
            <small>Requires attention</small>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon medium-icon">
            <i className="bi bi-dash-circle-fill"></i>
          </div>

          <div className="summary-content">
            <span>Medium Risk</span>
            <h3>42</h3>
            <small>Needs monitoring</small>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon low-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>

          <div className="summary-content">
            <span>Low Risk</span>
            <h3>188</h3>
            <small>Currently stable</small>
          </div>

        </div>

      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">

        {/* Risk Overview */}
        <section className="dashboard-card risk-overview-card">

          <div className="card-header">

            <div>
              <h3>Risk Overview</h3>
              <p>Current student risk distribution</p>
            </div>

            <button
              className="view-button"
              onClick={() => navigate('/students')}
            >
              View details
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

          <div className="risk-chart">

            <div className="risk-bar">

              <div
                className="risk-bar-high"
                style={{ width: '7%' }}
              ></div>

              <div
                className="risk-bar-medium"
                style={{ width: '17%' }}
              ></div>

              <div
                className="risk-bar-low"
                style={{ width: '76%' }}
              ></div>

            </div>

            <div className="risk-legend">

              <div>
                <span className="legend-dot high-dot"></span>
                <span>High</span>
                <strong>18</strong>
              </div>

              <div>
                <span className="legend-dot medium-dot"></span>
                <span>Medium</span>
                <strong>42</strong>
              </div>

              <div>
                <span className="legend-dot low-dot"></span>
                <span>Low</span>
                <strong>188</strong>
              </div>

            </div>

          </div>

        </section>

        {/* Alert Card */}
        <section className="dashboard-card alert-card">

          <div className="alert-card-icon">
            <i className="bi bi-bell-fill"></i>
          </div>

          <div className="alert-card-content">

            <span>ATTENTION REQUIRED</span>

            <h3>
              18 students are at high risk
            </h3>

            <p>
              Review their profiles and consider
              recording an intervention.
            </p>

            <button
              className="alert-action"
              onClick={() => navigate('/alerts')}
            >
              Review alerts
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

        </section>

      </div>

      {/* Students Table */}
      <section className="dashboard-card students-card">

        <div className="card-header">

          <div>
            <h3>Students Requiring Attention</h3>

            <p>
              Students with the highest predicted dropout risk
            </p>
          </div>

          <button
            className="view-button"
            onClick={() => navigate('/students')}
          >
            View all students
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

        <div className="table-responsive">

          <table className="student-table">

            <thead>

              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student.id}>

                  <td>

                    <div className="student-cell">

                      <div className="student-avatar">
                        {student.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .substring(0, 2)}
                      </div>

                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.id}</span>
                      </div>

                    </div>

                  </td>

                  <td>
                    {student.department}
                  </td>

                  <td>
                    {student.semester}
                  </td>

                  <td>

                    <strong className="risk-score">
                      {student.risk}%
                    </strong>

                  </td>

                  <td>

                    <span
                      className={`risk-badge ${getRiskClass(
                        student.category
                      )}`}
                    >
                      <span className="risk-badge-dot"></span>
                      {student.category}
                    </span>

                  </td>

                  <td>

                    <button
                      className="action-button"
                      onClick={() =>
                        navigate(`/students/${student.id}`)
                      }
                      title={`View ${student.name}`}
                    >
                      <i className="bi bi-arrow-right"></i>
                    </button>

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

export default Dashboard