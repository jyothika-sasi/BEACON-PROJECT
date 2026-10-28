
import { Link, useParams } from 'react-router-dom'
import './StudentDetails.css'

function StudentDetails() {
  const { studentId } = useParams()

  const defaultStudents = [
    {
      id: 'BCN2026001',
      name: 'Rahul Kumar',
      department: 'Computer Science & Engineering',
      semester: 'S6',
      batch: '2023-2027',
      email: 'rahul.kumar@beacon.edu',
      phone: '+91 98765 43210',
      cgpa: 5.8,
      attendance: 68,
      backlogs: 3,
      riskScore: 78,
      riskLevel: 'High',
    },
    {
      id: 'BCN2026042',
      name: 'Anjali Nair',
      department: 'Computer Science & Engineering',
      semester: 'S6',
      batch: '2023-2027',
      email: 'anjali.nair@beacon.edu',
      phone: '+91 98765 43211',
      cgpa: 6.9,
      attendance: 67,
      backlogs: 2,
      riskScore: 68,
      riskLevel: 'High',
    },
    {
      id: 'BCN2026118',
      name: 'Arjun Raj',
      department: 'Information Technology',
      semester: 'S4',
      batch: '2024-2028',
      email: 'arjun.raj@beacon.edu',
      phone: '+91 98765 43212',
      cgpa: 7.2,
      attendance: 73,
      backlogs: 1,
      riskScore: 51,
      riskLevel: 'Medium',
    },
    {
      id: 'BCN2026077',
      name: 'Meera Joseph',
      department: 'Computer Science & Engineering',
      semester: 'S4',
      batch: '2024-2028',
      email: 'meera.joseph@beacon.edu',
      phone: '+91 98765 43213',
      cgpa: 7.5,
      attendance: 78,
      backlogs: 1,
      riskScore: 34,
      riskLevel: 'Medium',
    },
    {
      id: 'BCN2026031',
      name: 'Adithya S',
      department: 'Electronics',
      semester: 'S6',
      batch: '2023-2027',
      email: 'adithya.s@beacon.edu',
      phone: '+91 98765 43214',
      cgpa: 8.4,
      attendance: 91,
      backlogs: 0,
      riskScore: 18,
      riskLevel: 'Low',
    },
  ]

  let storedStudents = []

  try {
    storedStudents = JSON.parse(
      localStorage.getItem('beaconStudents') || '[]'
    )
    if (!Array.isArray(storedStudents)) storedStudents = []
  } catch {
    storedStudents = []
  }

  const normalizedStoredStudents = storedStudents.map((student) => ({
    ...student,
    riskScore: student.riskScore ?? student.risk,
    riskLevel:
      student.riskLevel ?? student.riskCategory ?? student.category,
  }))

  // Stored students take precedence over demo students with the same ID.
  const allStudents = [
    ...defaultStudents.filter(
      (demo) =>
        !normalizedStoredStudents.some(
          (saved) => String(saved.id) === String(demo.id)
        )
    ),
    ...normalizedStoredStudents,
  ]

  const student = allStudents.find(
    (item) => String(item.id) === String(studentId)
  )

  if (!student) {
    return (
      <div className="student-details-page">
        <div className="student-page-header">
          <Link to="/students" className="back-link">
            <i className="bi bi-arrow-left"></i> Back to Students
          </Link>
          <div className="page-eyebrow">STUDENT PROFILE</div>
          <h1>Student Not Found</h1>
          <p>No student was found with ID: {studentId}</p>
        </div>
      </div>
    )
  }

  const score = Number(student.riskScore ?? 0)
  const cgpa = Number(student.cgpa ?? 0)
  const attendance = Number(student.attendance ?? 0)
  const backlogs = Number(student.backlogs ?? 0)

  const riskClass =
    score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low'

  const riskFactors = [
    {
      name: 'Attendance',
      value: `${attendance}%`,
      impact: attendance < 70 ? 0.31 : attendance < 80 ? 0.12 : 0.04,
      description:
        attendance < 70
          ? 'Low attendance is a factor to review.'
          : 'Attendance is relatively higher.',
      type: attendance < 80 ? 'risk' : 'protective',
    },
    {
      name: 'Backlogs',
      value: backlogs,
      impact: backlogs > 2 ? 0.24 : backlogs > 0 ? 0.12 : -0.04,
      description:
        backlogs > 0
          ? 'Pending courses may require academic review.'
          : 'No pending backlogs are recorded.',
      type: backlogs > 0 ? 'risk' : 'protective',
    },
    {
      name: 'CGPA',
      value: cgpa.toFixed(1),
      impact: cgpa < 6.5 ? 0.19 : cgpa < 7.5 ? 0.08 : -0.06,
      description:
        cgpa < 6.5
          ? 'Academic performance may require review.'
          : 'The recorded CGPA is relatively higher.',
      type: cgpa < 7.5 ? 'risk' : 'protective',
    },
  ]

  const riskFactorsOnly = riskFactors.filter(
    (factor) => factor.type === 'risk'
  )

  const protectiveFactors = riskFactors.filter(
    (factor) => factor.type === 'protective'
  )

  const initials = student.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)

  const renderFactor = (factor) => (
    <div className="factor-row" key={factor.name}>
      <div className="factor-info">
        <div className="factor-name">{factor.name}</div>
        <div className="factor-description">{factor.description}</div>
      </div>

      <div className="factor-value">{factor.value}</div>

      <div className="factor-bar-container">
        <div
          className={`factor-bar ${
            factor.type === 'risk'
              ? 'risk-factor-bar'
              : 'protective-factor-bar'
          }`}
          style={{
            width: `${Math.min(100, Math.abs(factor.impact) * 250)}%`,
          }}
        />
      </div>

      <div
        className={`factor-impact ${
          factor.type === 'risk'
            ? 'risk-impact'
            : 'protective-impact'
        }`}
      >
        {factor.impact > 0 ? '+' : ''}
        {factor.impact.toFixed(2)}
      </div>
    </div>
  )

  return (
    <div className="student-details-page">
      {/* Header */}
      <div className="student-page-header">
        <Link to="/students" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Students
        </Link>

        <div className="student-title-row">
          <div className="student-avatar-large">{initials}</div>

          <div>
            <div className="page-eyebrow">STUDENT PROFILE</div>
            <h1>{student.name}</h1>
            <p>
              {student.id} · {student.department}
            </p>
          </div>
        </div>
      </div>

      <div className="student-details-grid">
        <div className="student-main-column">
          {/* Risk assessment */}
          <section className="details-card risk-card">
            <div className="card-heading">
              <div>
                <div className="card-eyebrow">DROPOUT RISK</div>
                <h2>Current Risk Assessment</h2>
              </div>

              <span className={`risk-badge ${riskClass}`}>
                {riskClass.charAt(0).toUpperCase() + riskClass.slice(1)} Risk
              </span>
            </div>

            <div className="risk-assessment">
              <div className="risk-score-circle">
                <div className="risk-score-number">{score}%</div>
                <div className="risk-score-label">Risk Score</div>
              </div>

              <div className="risk-assessment-text">
                <h3>
                  {riskClass === 'high'
                    ? 'High dropout risk identified'
                    : riskClass === 'medium'
                      ? 'Continued monitoring recommended'
                      : 'Student currently appears stable'}
                </h3>

                <p>
                  Recorded risk score: <strong>{score}%</strong>
                </p>

                <div className="risk-scale">
                  <div className="scale-labels">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>

                  <div className="risk-scale-bar">
                    <div className="low-zone"></div>
                    <div className="medium-zone"></div>
                    <div className="high-zone"></div>

                    <div
                      className="risk-marker"
                      style={{
                        left: `${Math.min(100, Math.max(0, score))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Academic information */}
          <section className="details-card">
            <div className="card-heading">
              <div>
                <div className="card-eyebrow">ACADEMIC INFORMATION</div>
                <h2>Student Performance</h2>
              </div>
            </div>

            <div className="academic-stats">
              <div className="academic-stat">
                <div className="stat-icon blue">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <div>
                  <span>CGPA</span>
                  <strong>{student.cgpa ?? 'N/A'}</strong>
                </div>
              </div>

              <div className="academic-stat">
                <div className="stat-icon teal">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div>
                  <span>Attendance</span>
                  <strong>
                    {student.attendance ?? 'N/A'}
                    {student.attendance != null ? '%' : ''}
                  </strong>
                </div>
              </div>

              <div className="academic-stat">
                <div className="stat-icon red">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <div>
                  <span>Backlogs</span>
                  <strong>{student.backlogs ?? 'N/A'}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* Risk explanation */}
          <section className="details-card">
            <div className="card-heading shap-heading">
              <div>
                <div className="card-eyebrow">MODEL EXPLANATION</div>
                <h2>Why is this student at risk?</h2>
                <p className="card-description">
                  Main academic indicators associated with this student's
                  demo risk profile.
                </p>
              </div>

              <div className="shap-label">
                <i className="bi bi-stars"></i> SHAP Explanation
              </div>
            </div>

            <div className="demo-explanation-notice">
              <i className="bi bi-info-circle"></i>
              <span>
               
              </span>
            </div>

            {riskFactorsOnly.length > 0 && (
              <div className="factor-section">
                <h3 className="factor-title risk-title">
                  <i className="bi bi-arrow-up-circle"></i>
                  Risk factors
                </h3>

                {riskFactorsOnly.map(renderFactor)}
              </div>
            )}

            {protectiveFactors.length > 0 && (
              <div className="factor-section protective-section">
                <h3 className="factor-title protective-title">
                  <i className="bi bi-shield-check"></i>
                  Protective factors
                </h3>

                {protectiveFactors.map(renderFactor)}
              </div>
            )}

            <div className="shap-note">

              <span>
     
              </span>
            </div>
          </section>
        </div>

        {/* Student information */}
        <aside className="student-side-column">
          <section className="details-card">
            <div className="card-heading">
              <div>
                <div className="card-eyebrow">PROFILE</div>
                <h2>Student Information</h2>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail">
                <span>Student ID</span>
                <strong>{student.id}</strong>
              </div>

              <div className="profile-detail">
                <span>Department</span>
                <strong>{student.department}</strong>
              </div>

              <div className="profile-detail">
                <span>Semester</span>
                <strong>{student.semester || 'N/A'}</strong>
              </div>

              <div className="profile-detail">
                <span>Batch</span>
                <strong>{student.batch || 'N/A'}</strong>
              </div>

              <div className="profile-detail">
                <span>Email</span>
                <strong>{student.email || 'N/A'}</strong>
              </div>

              <div className="profile-detail">
                <span>Phone</span>
                <strong>{student.phone || 'N/A'}</strong>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default StudentDetails
