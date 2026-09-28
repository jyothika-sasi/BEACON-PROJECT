import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './StudentDetails.css'

function StudentDetails() {
  const { studentId } = useParams()

  const [showIntervention, setShowIntervention] = useState(false)

  // Default dummy students
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

  // Students added through the Add Student form
  const storedStudents =
    JSON.parse(localStorage.getItem('beaconStudents')) || []

  // Normalize the data so both dummy and added students
  // use the same field names.
  const normalizedStoredStudents = storedStudents.map((student) => ({
    ...student,
    riskScore: student.riskScore ?? student.risk,
    riskLevel: student.riskCategory ?? student.category,
  }))

  // Combine default students and newly added students
  const allStudents = [
    ...defaultStudents,
    ...normalizedStoredStudents,
  ]

  // Find the student selected from the URL
  const student = allStudents.find(
    (item) => item.id === studentId
  )

  // If the ID is invalid, show a proper message
  // instead of displaying Rahul's profile.
  if (!student) {
    return (
      <div className="student-details-page">
        <div className="student-page-header">
          <div>
            <Link to="/students" className="back-link">
              <i className="bi bi-arrow-left"></i>
              Back to Students
            </Link>

            <div className="student-title-row">
              <div>
                <div className="page-eyebrow">
                  STUDENT PROFILE
                </div>

                <h1>Student Not Found</h1>

                <p>
                  No student was found with ID: {studentId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Temporary SHAP-style explanation data
  const riskFactors = [
    {
      name: 'Attendance',
      value: `${student.attendance}%`,
      impact: student.attendance < 70 ? 0.31 : 0.12,
      type: 'risk',
      description:
        'Low attendance is strongly associated with increased dropout risk.',
    },
    {
      name: 'Backlogs',
      value: `${student.backlogs}`,
      impact: student.backlogs > 0 ? 0.24 : 0.04,
      type: 'risk',
      description:
        'Multiple pending courses increase the predicted risk.',
    },
    {
      name: 'CGPA',
      value: `${student.cgpa}`,
      impact: student.cgpa < 6.5 ? 0.19 : 0.06,
      type: 'risk',
      description:
        'The current CGPA is below the preferred academic range.',
    },
    {
      name: 'Recent Attendance Trend',
      value: student.attendance >= 75 ? '+6%' : '+2%',
      impact: -0.12,
      type: 'protective',
      description:
        'Improving attendance is contributing positively to the prediction.',
    },
    {
      name: 'Recent Academic Activity',
      value: 'Active',
      impact: -0.08,
      type: 'protective',
      description:
        'Recent academic activity is acting as a protective factor.',
    },
  ]

  const riskFactorsOnly = riskFactors.filter(
    (factor) => factor.type === 'risk'
  )

  const protectiveFactors = riskFactors.filter(
    (factor) => factor.type === 'protective'
  )

  const getRiskClass = () => {
    if (student.riskScore >= 60) return 'high'
    if (student.riskScore >= 30) return 'medium'
    return 'low'
  }

  const riskClass = getRiskClass()

  // Generate initials automatically
  const initials = student.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)

  return (
    <div className="student-details-page">

      {/* Page Header */}
      <div className="student-page-header">

        <div>

          <Link to="/students" className="back-link">
            <i className="bi bi-arrow-left"></i>
            Back to Students
          </Link>

          <div className="student-title-row">

            <div className="student-avatar-large">
              {initials}
            </div>

            <div>

              <div className="page-eyebrow">
                STUDENT PROFILE
              </div>

              <h1>{student.name}</h1>

              <p>
                {student.id} · {student.department}
              </p>

            </div>

          </div>

        </div>

        <button
          className="intervention-button"
          onClick={() => setShowIntervention(true)}
        >
          <i className="bi bi-plus-circle"></i>
          Record Intervention
        </button>

      </div>

      {/* Main Grid */}
      <div className="student-details-grid">

        {/* Left Column */}
        <div className="student-main-column">

          {/* Risk Card */}
          <section className="details-card risk-card">

            <div className="card-heading">

              <div>

                <div className="card-eyebrow">
                  DROPOUT RISK
                </div>

                <h2>
                  Current Risk Assessment
                </h2>

              </div>

              <span className={`risk-badge ${riskClass}`}>
                {student.riskLevel} Risk
              </span>

            </div>

            <div className="risk-assessment">

              <div className="risk-score-circle">

                <div className="risk-score-number">
                  {student.riskScore}%
                </div>

                <div className="risk-score-label">
                  Risk Score
                </div>

              </div>

              <div className="risk-assessment-text">

                <h3>
                  {student.riskLevel === 'High'
                    ? 'Immediate attention recommended'
                    : student.riskLevel === 'Medium'
                      ? 'Continued monitoring recommended'
                      : 'Student currently appears stable'}
                </h3>

                <p>
                  The model currently estimates a{' '}
                  <strong>{student.riskScore}%</strong> dropout risk
                  for this student.
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
                        left: `${student.riskScore}%`,
                      }}
                    ></div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* Academic Information */}
          <section className="details-card">

            <div className="card-heading">

              <div>

                <div className="card-eyebrow">
                  ACADEMIC INFORMATION
                </div>

                <h2>
                  Student Performance
                </h2>

              </div>

            </div>

            <div className="academic-stats">

              <div className="academic-stat">

                <div className="stat-icon blue">
                  <i className="bi bi-mortarboard"></i>
                </div>

                <div>
                  <span>CGPA</span>
                  <strong>{student.cgpa}</strong>
                </div>

              </div>

              <div className="academic-stat">

                <div className="stat-icon teal">
                  <i className="bi bi-calendar-check"></i>
                </div>

                <div>
                  <span>Attendance</span>
                  <strong>{student.attendance}%</strong>
                </div>

              </div>

              <div className="academic-stat">

                <div className="stat-icon red">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>

                <div>
                  <span>Backlogs</span>
                  <strong>{student.backlogs}</strong>
                </div>

              </div>

            </div>

          </section>

          {/* SHAP Explanation */}
          <section className="details-card">

            <div className="card-heading shap-heading">

              <div>

                <div className="card-eyebrow">
                  MODEL EXPLANATION
                </div>

                <h2>
                  Why is this student at risk?
                </h2>

                <p className="card-description">
                  The following factors explain the main contributors
                  to the current risk prediction.
                </p>

              </div>

              <div className="shap-label">
                <i className="bi bi-stars"></i>
                SHAP Explanation
              </div>

            </div>

            {/* Risk Increasing Factors */}
            <div className="factor-section">

              <h3 className="factor-title risk-title">

                <i className="bi bi-arrow-up-circle"></i>

                Risk-increasing factors

              </h3>

              {riskFactorsOnly.map((factor) => (

                <div
                  className="factor-row"
                  key={factor.name}
                >

                  <div className="factor-info">

                    <div className="factor-name">
                      {factor.name}
                    </div>

                    <div className="factor-description">
                      {factor.description}
                    </div>

                  </div>

                  <div className="factor-value">
                    {factor.value}
                  </div>

                  <div className="factor-bar-container">

                    <div
                      className="factor-bar risk-factor-bar"
                      style={{
                        width: `${Math.abs(factor.impact) * 250}%`,
                      }}
                    ></div>

                  </div>

                  <div className="factor-impact risk-impact">
                    +{factor.impact.toFixed(2)}
                  </div>

                </div>

              ))}

            </div>

            {/* Protective Factors */}
            <div className="factor-section protective-section">

              <h3 className="factor-title protective-title">

                <i className="bi bi-shield-check"></i>

                Protective factors

              </h3>

              {protectiveFactors.map((factor) => (

                <div
                  className="factor-row"
                  key={factor.name}
                >

                  <div className="factor-info">

                    <div className="factor-name">
                      {factor.name}
                    </div>

                    <div className="factor-description">
                      {factor.description}
                    </div>

                  </div>

                  <div className="factor-value">
                    {factor.value}
                  </div>

                  <div className="factor-bar-container">

                    <div
                      className="factor-bar protective-factor-bar"
                      style={{
                        width: `${Math.abs(factor.impact) * 250}%`,
                      }}
                    ></div>

                  </div>

                  <div className="factor-impact protective-impact">
                    {factor.impact.toFixed(2)}
                  </div>

                </div>

              ))}

            </div>

            <div className="shap-note">

              <i className="bi bi-info-circle"></i>

              <span>
                SHAP values indicate how individual features contribute
                to the model prediction. Positive values increase
                predicted risk, while negative values act as protective
                factors.
              </span>

            </div>

          </section>

        </div>

        {/* Right Column */}
        <aside className="student-side-column">

          {/* Student Information */}
          <section className="details-card">

            <div className="card-heading">

              <div>

                <div className="card-eyebrow">
                  PROFILE
                </div>

                <h2>
                  Student Information
                </h2>

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
                <strong>{student.semester}</strong>
              </div>

              <div className="profile-detail">
                <span>Batch</span>
                <strong>{student.batch}</strong>
              </div>

              <div className="profile-detail">
                <span>Email</span>
                <strong>{student.email}</strong>
              </div>

              <div className="profile-detail">
                <span>Phone</span>
                <strong>{student.phone}</strong>
              </div>

            </div>

          </section>

          {/* Recommended Action */}
          <section className="details-card action-card">

            <div className="action-icon">
              <i className="bi bi-person-check"></i>
            </div>

            <h2>
              Recommended Action
            </h2>

            <p>
              Consider contacting the student to discuss attendance,
              academic performance and possible support requirements.
            </p>

            <button
              className="action-button"
              onClick={() => setShowIntervention(true)}
            >
              Record Intervention
              <i className="bi bi-arrow-right"></i>
            </button>

          </section>

        </aside>

      </div>

      {/* Intervention Modal */}
      {showIntervention && (

        <div
          className="modal-backdrop-custom"
          onClick={() => setShowIntervention(false)}
        >

          <div
            className="intervention-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="modal-header-custom">

              <div>

                <div className="card-eyebrow">
                  INTERVENTION
                </div>

                <h2>
                  Record Student Intervention
                </h2>

              </div>

              <button
                className="close-modal"
                onClick={() => setShowIntervention(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <div className="modal-body-custom">

              <label>
                Intervention Type
              </label>

              <select>
                <option>Academic Counselling</option>
                <option>Attendance Follow-up</option>
                <option>Parent/Guardian Contact</option>
                <option>Mentoring</option>
                <option>Financial Support Referral</option>
                <option>Other</option>
              </select>

              <label>
                Notes
              </label>

              <textarea
                rows="5"
                placeholder="Enter details about the intervention..."
              ></textarea>

              <div className="modal-actions">

                <button
                  className="cancel-button"
                  onClick={() => setShowIntervention(false)}
                >
                  Cancel
                </button>

                <button
                  className="save-button"
                  onClick={() => setShowIntervention(false)}
                >
                  <i className="bi bi-check-lg"></i>
                  Save Intervention
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default StudentDetails