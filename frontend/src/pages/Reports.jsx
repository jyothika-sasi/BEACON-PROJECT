import { useState } from 'react'
import './Reports.css'

function Reports() {
  const [department, setDepartment] = useState('all')
  const [riskLevel, setRiskLevel] = useState('all')
  const [semester, setSemester] = useState('all')

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
    },
  ]

  const filteredStudents = students.filter((student) => {
    const departmentMatch =
      department === 'all' || student.department === department

    const riskMatch =
      riskLevel === 'all' || student.category === riskLevel

    const semesterMatch =
      semester === 'all' || student.semester === semester

    return departmentMatch && riskMatch && semesterMatch
  })

  const highRisk = students.filter(
    (student) => student.category === 'High'
  ).length

  const mediumRisk = students.filter(
    (student) => student.category === 'Medium'
  ).length

  const lowRisk = students.filter(
    (student) => student.category === 'Low'
  ).length

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

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'beacon-risk-report.csv'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <div className="reports-page">

      {/* Header */}
      <div className="reports-header">

        <div>
          <div className="page-eyebrow">
            ANALYTICS & REPORTING
          </div>

          <h1>Reports</h1>

          <p>
            Generate student risk reports and review risk distribution.
          </p>
        </div>

        <button
          className="export-report-button"
          onClick={exportCSV}
        >
          <i className="bi bi-download"></i>
          Export CSV
        </button>

      </div>

      {/* Overview */}
      <div className="report-overview">

        <div className="overview-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
          <small>Current dataset</small>
        </div>

        <div className="overview-card high">
          <span>High Risk</span>
          <strong>{highRisk}</strong>
          <small>60% and above</small>
        </div>

        <div className="overview-card medium">
          <span>Medium Risk</span>
          <strong>{mediumRisk}</strong>
          <small>30% – 59%</small>
        </div>

        <div className="overview-card low">
          <span>Low Risk</span>
          <strong>{lowRisk}</strong>
          <small>Below 30%</small>
        </div>

      </div>

      {/* Distribution */}
      <section className="report-card">

        <div className="report-card-header">

          <div>
            <h2>Risk Distribution</h2>
            <p>
              Distribution of students across the configured risk categories.
            </p>
          </div>

        </div>

        <div className="distribution-container">

          <div className="distribution-bar">

            <div
              className="distribution-high"
              style={{
                width: `${(highRisk / students.length) * 100}%`,
              }}
            ></div>

            <div
              className="distribution-medium"
              style={{
                width: `${(mediumRisk / students.length) * 100}%`,
              }}
            ></div>

            <div
              className="distribution-low"
              style={{
                width: `${(lowRisk / students.length) * 100}%`,
              }}
            ></div>

          </div>

          <div className="distribution-legend">

            <div>
              <span className="legend-dot high-dot"></span>
              High Risk
              <strong>{highRisk}</strong>
            </div>

            <div>
              <span className="legend-dot medium-dot"></span>
              Medium Risk
              <strong>{mediumRisk}</strong>
            </div>

            <div>
              <span className="legend-dot low-dot"></span>
              Low Risk
              <strong>{lowRisk}</strong>
            </div>

          </div>

        </div>

      </section>

      {/* Filters and report table */}
      <section className="report-card">

        <div className="report-card-header report-table-header">

          <div>
            <h2>Student Risk Report</h2>

            <p>
              Filter the report before exporting it.
            </p>
          </div>

          <span className="result-count">
            {filteredStudents.length} students
          </span>

        </div>

        <div className="report-filters">

          <div className="report-filter-group">
            <label>Department</label>

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
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
            <label>Risk Category</label>

            <select
              value={riskLevel}
              onChange={(event) =>
                setRiskLevel(event.target.value)
              }
            >
              <option value="all">All Categories</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="report-filter-group">
            <label>Semester</label>

            <select
              value={semester}
              onChange={(event) =>
                setSemester(event.target.value)
              }
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
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.id}>

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

                  <td>
                    {student.semester}
                  </td>

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

                  <td>
                    {student.attendance}%
                  </td>

                  <td>
                    {student.cgpa}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredStudents.length === 0 && (
            <div className="empty-report">
              <i className="bi bi-search"></i>
              <h3>No students found</h3>
              <p>
                Try changing the selected report filters.
              </p>
            </div>
          )}

        </div>

      </section>

    </div>
  )
}

export default Reports