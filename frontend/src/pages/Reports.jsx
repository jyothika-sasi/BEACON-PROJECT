
import { Fragment, useState } from 'react'
import './Reports.css'

function Reports() {
  const [department, setDepartment] = useState('all')
  const [riskLevel, setRiskLevel] = useState('all')
  const [semester, setSemester] = useState('all')
  const [expandedStudent, setExpandedStudent] = useState(null)

  // Demo data. Replace with real model predictions and SHAP values later.
  const students = [
    {
      id: 'BCN2026001',
      name: 'Rahul Kumar',
      department: 'Computer Science & Engineering',
      semester: 'S6',
      risk: 78,
      category: 'High',
      attendance: 68,
      cgpa: 5.8,
      factors: [
        { name: 'Attendance', value: '68%', impact: -0.39 },
        { name: 'CGPA', value: '5.8', impact: -0.24 },
      ],
    },
    {
      id: 'BCN2026017',
      name: 'Anjali Nair',
      department: 'Computer Science & Engineering',
      semester: 'S6',
      risk: 72,
      category: 'High',
      attendance: 64,
      cgpa: 6.1,
      factors: [
        { name: 'Attendance', value: '64%', impact: -0.35 },
        { name: 'CGPA', value: '6.1', impact: -0.21 },
      ],
    },
    {
      id: 'BCN2026042',
      name: 'Arjun Menon',
      department: 'Information Technology',
      semester: 'S5',
      risk: 69,
      category: 'High',
      attendance: 61,
      cgpa: 5.9,
      factors: [
        { name: 'Attendance', value: '61%', impact: -0.42 },
        { name: 'CGPA', value: '5.9', impact: -0.25 },
      ],
    },
    {
      id: 'BCN2026078',
      name: 'Meera Thomas',
      department: 'Electronics & Communication',
      semester: 'S6',
      risk: 64,
      category: 'High',
      attendance: 66,
      cgpa: 6.3,
      factors: [
        { name: 'Attendance', value: '66%', impact: -0.31 },
        { name: 'CGPA', value: '6.3', impact: -0.18 },
      ],
    },
    {
      id: 'BCN2026093',
      name: 'Vishnu Raj',
      department: 'Computer Science & Engineering',
      semester: 'S5',
      risk: 54,
      category: 'Medium',
      attendance: 74,
      cgpa: 6.7,
      factors: [
        { name: 'Attendance', value: '74%', impact: -0.22 },
        { name: 'CGPA', value: '6.7', impact: -0.12 },
      ],
    },
    {
      id: 'BCN2026118',
      name: 'Fathima Basheer',
      department: 'Information Technology',
      semester: 'S4',
      risk: 42,
      category: 'Medium',
      attendance: 78,
      cgpa: 7.1,
      factors: [
        { name: 'Attendance', value: '78%', impact: -0.14 },
        { name: 'CGPA', value: '7.1', impact: -0.08 },
      ],
    },
    {
      id: 'BCN2026134',
      name: 'Adarsh S',
      department: 'Computer Science & Engineering',
      semester: 'S4',
      risk: 24,
      category: 'Low',
      attendance: 88,
      cgpa: 8.1,
      factors: [
        { name: 'Attendance', value: '88%', impact: 0.19 },
        { name: 'CGPA', value: '8.1', impact: 0.16 },
      ],
    },
    {
      id: 'BCN2026152',
      name: 'Neha Joseph',
      department: 'Electronics & Communication',
      semester: 'S5',
      risk: 18,
      category: 'Low',
      attendance: 91,
      cgpa: 8.4,
      factors: [
        { name: 'Attendance', value: '91%', impact: 0.23 },
        { name: 'CGPA', value: '8.4', impact: 0.19 },
      ],
    },
  ]

  const filteredStudents = students.filter((student) => {
    return (
      (department === 'all' || student.department === department) &&
      (riskLevel === 'all' || student.category === riskLevel) &&
      (semester === 'all' || student.semester === semester)
    )
  })

  const highRisk = students.filter((s) => s.category === 'High').length
  const mediumRisk = students.filter((s) => s.category === 'Medium').length
  const lowRisk = students.filter((s) => s.category === 'Low').length

  const toggleExplanation = (id) => {
    setExpandedStudent((current) => (current === id ? null : id))
  }

  const exportCSV = () => {
    const headers = [
      'Student ID',
      'Name',
      'Department',
      'Semester',
      'Risk Score',
      'Risk Category',
      'Attendance',
      'CGPA',
    ]

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`

    const rows = filteredStudents.map((student) => [
      student.id,
      student.name,
      student.department,
      student.semester,
      `${student.risk}%`,
      student.category,
      `${student.attendance}%`,
      student.cgpa,
    ])

    const csv = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) => row.map(escapeCSV).join(',')),
    ].join('\n')

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'beacon-risk-report.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <div className="page-eyebrow">ANALYTICS & REPORTING</div>
          <h1>Reports</h1>
          <p>Review student risk scores and prediction factors.</p>
        </div>

        <button className="export-report-button" onClick={exportCSV}>
          <i className="bi bi-download" /> Export CSV
        </button>
      </div>

      <div className="report-overview">
        <div className="overview-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
          <small>Demo dataset</small>
        </div>

        <div className="overview-card high">
          <span>High Risk</span>
          <strong>{highRisk}</strong>
          <small>60% and above</small>
        </div>

        <div className="overview-card medium">
          <span>Medium Risk</span>
          <strong>{mediumRisk}</strong>
          <small>30%–59%</small>
        </div>

        <div className="overview-card low">
          <span>Low Risk</span>
          <strong>{lowRisk}</strong>
          <small>Below 30%</small>
        </div>
      </div>

      <section className="report-card">
        <div className="report-card-header">
          <div>
            <h2>Risk Distribution</h2>
            <p>Students grouped by predicted risk category.</p>
          </div>
        </div>

        <div className="distribution-container">
          <div
            className="distribution-bar"
            role="img"
            aria-label={`${highRisk} high risk, ${mediumRisk} medium risk, ${lowRisk} low risk students`}
          >
            <div
              className="distribution-high"
              style={{ width: `${(highRisk / students.length) * 100}%` }}
            />
            <div
              className="distribution-medium"
              style={{ width: `${(mediumRisk / students.length) * 100}%` }}
            />
            <div
              className="distribution-low"
              style={{ width: `${(lowRisk / students.length) * 100}%` }}
            />
          </div>

          <div className="distribution-legend">
            <div>
              <span className="legend-dot high-dot" />
              High Risk <strong>{highRisk}</strong>
            </div>
            <div>
              <span className="legend-dot medium-dot" />
              Medium Risk <strong>{mediumRisk}</strong>
            </div>
            <div>
              <span className="legend-dot low-dot" />
              Low Risk <strong>{lowRisk}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="report-card">
        <div className="report-card-header report-table-header">
          <div>
            <h2>Student Risk Report</h2>
            <p>View each student's risk score and main indicators.</p>
          </div>
          <span className="result-count">
            {filteredStudents.length} students
          </span>
        </div>

        <div className="report-filters">
          <div className="report-filter-group">
            <label htmlFor="report-department">Department</label>
            <select
              id="report-department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value)
                setExpandedStudent(null)
              }}
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Engineering">
                Computer Science & Engineering
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Electronics & Communication">
                Electronics & Communication
              </option>
            </select>
          </div>

          <div className="report-filter-group">
            <label htmlFor="report-risk">Risk Category</label>
            <select
              id="report-risk"
              value={riskLevel}
              onChange={(e) => {
                setRiskLevel(e.target.value)
                setExpandedStudent(null)
              }}
            >
              <option value="all">All Categories</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="report-filter-group">
            <label htmlFor="report-semester">Semester</label>
            <select
              id="report-semester"
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value)
                setExpandedStudent(null)
              }}
            >
              <option value="all">All Semesters</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
            </select>
          </div>
        </div>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Risk Score</th>
                <th>Category</th>
                <th>Attendance</th>
                <th>CGPA</th>
                <th>Factors</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => {
                const isExpanded = expandedStudent === student.id

                return (
                  <Fragment key={student.id}>
                    <tr>
                      <td>
                        <div className="report-student">
                          <div className="report-avatar">
                            {student.name
                              .split(' ')
                              .map((word) => word[0])
                              .join('')}
                          </div>
                          <div>
                            <strong>{student.name}</strong>
                            <span>{student.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="report-department">
                          {student.department}
                        </span>
                      </td>
                      <td>{student.semester}</td>
                      <td>
                        <strong
                          className={`report-risk-score ${student.category.toLowerCase()}`}
                        >
                          {student.risk}%
                        </strong>
                      </td>
                      <td>
                        <span
                          className={`report-risk-badge ${student.category.toLowerCase()}`}
                        >
                          {student.category}
                        </span>
                      </td>
                      <td>{student.attendance}%</td>
                      <td>{student.cgpa}</td>
                      <td>
                        <button
                          type="button"
                          className="explanation-toggle"
                          onClick={() => toggleExplanation(student.id)}
                          aria-expanded={isExpanded}
                        >
                          <i
                            className={`bi ${
                              isExpanded ? 'bi-chevron-up' : 'bi-bar-chart'
                            }`}
                          />
                          {isExpanded ? 'Hide' : 'Why?'}
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="explanation-row">
                        <td colSpan={8}>
                          <div className="explanation-panel">
                            <div className="explanation-heading">
                              <div className="explanation-icon">
                                <i className="bi bi-graph-up" />
                              </div>
                              <div>
                                <h3>Prediction factors</h3>
                                <p>
                                  {student.name} · {student.category} risk ·{' '}
                                  {student.risk}% score
                                </p>
                              </div>
                            </div>

                            <div className="demo-explanation-notice">
                              Demo factors only — actual SHAP values are not
                              connected yet.
                            </div>

                            <div className="explanation-factors">
                              {student.factors.map((factor) => (
                                <div
                                  className="explanation-factor"
                                  key={factor.name}
                                >
                                  <div className="factor-main">
                                    <div
                                      className={`factor-indicator ${
                                        factor.impact < 0
                                          ? 'negative'
                                          : 'positive'
                                      }`}
                                    >
                                      <i
                                        className={`bi ${
                                          factor.impact < 0
                                            ? 'bi-arrow-down-right'
                                            : 'bi-arrow-up-right'
                                        }`}
                                      />
                                    </div>

                                    <div className="factor-details">
                                      <strong>{factor.name}</strong>
                                      <span>
                                        Value: {factor.value}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="factor-impact">
                                    <div className="factor-track">
                                      <div
                                        className={`factor-bar ${
                                          factor.impact < 0
                                            ? 'negative'
                                            : 'positive'
                                        }`}
                                        style={{
                                          width: `${Math.min(
                                            Math.abs(factor.impact) * 100,
                                            100
                                          )}%`,
                                        }}
                                      />
                                    </div>
                                    <strong>
                                      {factor.impact > 0 ? '+' : ''}
                                      {factor.impact.toFixed(2)}
                                    </strong>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="explanation-legend">
                              <span>
                                <i className="legend-dot high-dot" />
                                Negative contribution
                              </span>
                              <span>
                                <i className="legend-dot low-dot" />
                                Positive contribution
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="empty-report">
              <i className="bi bi-search" />
              <h3>No students found</h3>
              <p>Try changing the selected filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Reports
