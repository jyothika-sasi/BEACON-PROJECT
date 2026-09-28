import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Interventions.css'

function Interventions() {
  const [showForm, setShowForm] = useState(false)

  const interventions = [
    {
      id: 1,
      studentId: 'BCN2026001',
      student: 'Rahul Kumar',
      type: 'Academic Counselling',
      date: '21 Sep 2026',
      faculty: 'Dr. Jyothika',
      status: 'In Progress',
      followUp: '28 Sep 2026',
    },
    {
      id: 2,
      studentId: 'BCN2026017',
      student: 'Anjali Nair',
      type: 'Parent Meeting',
      date: '20 Sep 2026',
      faculty: 'Dr. Jyothika',
      status: 'Completed',
      followUp: '—',
    },
    {
      id: 3,
      studentId: 'BCN2026042',
      student: 'Arjun Menon',
      type: 'Attendance Counselling',
      date: '19 Sep 2026',
      faculty: 'Dr. Rahul',
      status: 'Scheduled',
      followUp: '25 Sep 2026',
    },
    {
      id: 4,
      studentId: 'BCN2026078',
      student: 'Meera Thomas',
      type: 'Academic Support',
      date: '18 Sep 2026',
      faculty: 'Dr. Jyothika',
      status: 'Completed',
      followUp: '—',
    },
    {
      id: 5,
      studentId: 'BCN2026093',
      student: 'Vishnu Raj',
      type: 'Counselling Session',
      date: '17 Sep 2026',
      faculty: 'Dr. Rahul',
      status: 'In Progress',
      followUp: '24 Sep 2026',
    },
  ]

  return (
    <div className="interventions-page">

      {/* Header */}
      <div className="interventions-header">

        <div>
          <div className="page-eyebrow">
            STUDENT SUPPORT
          </div>

          <h1>Interventions</h1>

          <p>
            Track academic support and follow-up actions for students.
          </p>
        </div>

        <button
          className="add-intervention-button"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-lg"></i>
          Record Intervention
        </button>

      </div>

      {/* Statistics */}
      <div className="intervention-stats">

        <div className="intervention-stat-card">
          <div className="intervention-stat-icon total">
            <i className="bi bi-clipboard-check"></i>
          </div>

          <div>
            <span>Total Interventions</span>
            <strong>32</strong>
          </div>
        </div>

        <div className="intervention-stat-card">
          <div className="intervention-stat-icon progress">
            <i className="bi bi-arrow-repeat"></i>
          </div>

          <div>
            <span>In Progress</span>
            <strong>8</strong>
          </div>
        </div>

        <div className="intervention-stat-card">
          <div className="intervention-stat-icon scheduled">
            <i className="bi bi-calendar-event"></i>
          </div>

          <div>
            <span>Scheduled</span>
            <strong>5</strong>
          </div>
        </div>

        <div className="intervention-stat-card">
          <div className="intervention-stat-icon completed">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <span>Completed</span>
            <strong>19</strong>
          </div>
        </div>

      </div>

      {/* New intervention form */}
      {showForm && (
        <section className="intervention-form-card">

          <div className="form-header">
            <div>
              <h2>Record New Intervention</h2>
              <p>
                Add a support action for a student.
              </p>
            </div>

            <button
              className="close-form-button"
              onClick={() => setShowForm(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="intervention-form">

            <div className="form-group">
              <label>Student</label>

              <select defaultValue="">
                <option value="" disabled>
                  Select student
                </option>
                <option value="BCN2026001">
                  Rahul Kumar — BCN2026001
                </option>
                <option value="BCN2026017">
                  Anjali Nair — BCN2026017
                </option>
                <option value="BCN2026042">
                  Arjun Menon — BCN2026042
                </option>
                <option value="BCN2026078">
                  Meera Thomas — BCN2026078
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Intervention Type</label>

              <select defaultValue="">
                <option value="" disabled>
                  Select type
                </option>
                <option>Academic Counselling</option>
                <option>Attendance Counselling</option>
                <option>Parent Meeting</option>
                <option>Academic Support</option>
                <option>Counselling Session</option>
              </select>
            </div>

            <div className="form-group">
              <label>Follow-up Date</label>

              <input type="date" />
            </div>

            <div className="form-group form-full">
              <label>Notes</label>

              <textarea
                rows="4"
                placeholder="Enter intervention notes..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="save-intervention-button"
                onClick={() => {
                  setShowForm(false)
                  alert('Intervention recorded successfully.')
                }}
              >
                <i className="bi bi-check-lg"></i>
                Save Intervention
              </button>
            </div>

          </div>

        </section>
      )}

      {/* Intervention table */}
      <section className="interventions-card">

        <div className="interventions-card-header">

          <div>
            <h2>Recent Interventions</h2>

            <p>
              Monitor support actions and their follow-up status.
            </p>
          </div>

          <select className="status-filter" defaultValue="all">
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

        </div>

        <div className="interventions-table-wrapper">

          <table className="interventions-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Intervention</th>
                <th>Date</th>
                <th>Faculty</th>
                <th>Status</th>
                <th>Follow-up</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {interventions.map((item) => (

                <tr key={item.id}>

                  <td>
                    <div className="intervention-student">

                      <div className="intervention-avatar">
                        {item.student
                          .split(' ')
                          .map((word) => word[0])
                          .join('')}
                      </div>

                      <div>
                        <strong>{item.student}</strong>

                        <span>
                          {item.studentId}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span className="intervention-type">
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <span className="intervention-date">
                      {item.date}
                    </span>
                  </td>

                  <td>
                    <span className="faculty-name">
                      {item.faculty}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`intervention-status ${item.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span className="follow-up-date">
                      {item.followUp}
                    </span>
                  </td>

                  <td>
                    <Link
                      to={`/students/${item.studentId}`}
                      className="intervention-view-button"
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

export default Interventions