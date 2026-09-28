import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddStudent.css'

function AddStudent() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    department: '',
    semester: '',
    batch: '',
    cgpa: '',
    attendance: '',
    backlogs: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const calculateRisk = () => {
    const attendance = Number(formData.attendance)
    const cgpa = Number(formData.cgpa)
    const backlogs = Number(formData.backlogs)

    let score = 0

    if (attendance < 60) {
      score += 40
    } else if (attendance < 75) {
      score += 25
    } else {
      score += 10
    }

    if (cgpa < 6) {
      score += 35
    } else if (cgpa < 7) {
      score += 25
    } else if (cgpa < 8) {
      score += 15
    } else {
      score += 5
    }

    if (backlogs >= 3) {
      score += 25
    } else if (backlogs === 2) {
      score += 15
    } else if (backlogs === 1) {
      score += 8
    }

    score = Math.min(score, 100)

    let category = 'Low'

    if (score >= 60) {
      category = 'High'
    } else if (score >= 30) {
      category = 'Medium'
    }

    return {
      riskScore: score,
      riskCategory: category,
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !formData.name ||
      !formData.id ||
      !formData.department ||
      !formData.semester ||
      !formData.cgpa ||
      !formData.attendance
    ) {
      alert('Please fill in all required fields.')
      return
    }

    const existingStudents =
      JSON.parse(localStorage.getItem('beaconStudents')) || []

    const duplicateStudent = existingStudents.some(
      (student) =>
        student.id.toLowerCase() === formData.id.toLowerCase()
    )

    if (duplicateStudent) {
      alert('A student with this ID already exists.')
      return
    }

    const { riskScore, riskCategory } = calculateRisk()

    const newStudent = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      semester: formData.semester,
      batch: formData.batch,
      cgpa: Number(formData.cgpa),
      attendance: Number(formData.attendance),
      backlogs: Number(formData.backlogs || 0),
      riskScore,
      riskCategory,
    }

    localStorage.setItem(
      'beaconStudents',
      JSON.stringify([
        ...existingStudents,
        newStudent,
      ])
    )

    alert('Student added successfully!')

    navigate('/students')
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <p className="page-eyebrow">
            STUDENT MANAGEMENT
          </p>

          <h2>Add Student</h2>

          <p>
            Add a new student profile to the Beacon system.
          </p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/students')}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Students
        </button>
      </div>

      <form
        className="add-student-card"
        onSubmit={handleSubmit}
      >

        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Student Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter student name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                Student ID <span>*</span>
              </label>

              <input
                type="text"
                name="id"
                placeholder="e.g. BCN2026001"
                value={formData.id}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        <div className="form-section">
          <h3>Academic Information</h3>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Department <span>*</span>
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">
                  Select department
                </option>

                <option value="Computer Science">
                  Computer Science
                </option>

                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>

                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Semester <span>*</span>
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">
                  Select semester
                </option>

                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
                <option value="S7">S7</option>
                <option value="S8">S8</option>
              </select>
            </div>

            <div className="form-group">
              <label>Batch</label>

              <input
                type="text"
                name="batch"
                placeholder="e.g. 2023-2027"
                value={formData.batch}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                CGPA <span>*</span>
              </label>

              <input
                type="number"
                name="cgpa"
                placeholder="e.g. 7.5"
                min="0"
                max="10"
                step="0.1"
                value={formData.cgpa}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                Attendance % <span>*</span>
              </label>

              <input
                type="number"
                name="attendance"
                placeholder="e.g. 78"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Number of Backlogs</label>

              <input
                type="number"
                name="backlogs"
                placeholder="e.g. 2"
                min="0"
                value={formData.backlogs}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        <div className="form-info-box">
          <i className="bi bi-info-circle"></i>

          <div>
            <strong>Prototype Risk Calculation</strong>

            <p>
              The current prototype calculates a temporary risk
              score using attendance, CGPA, and backlogs.
              This will later be replaced by the Beacon ML model.
            </p>
          </div>
        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/students')}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-student-button"
          >
            <i className="bi bi-person-plus-fill"></i>
            Add Student
          </button>

        </div>

      </form>

    </div>
  )
}

export default AddStudent