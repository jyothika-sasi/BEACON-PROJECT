import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const studentsData = [
  {
    id: 'BCN2026001',
    name: 'Rahul Kumar',
    department: 'Computer Science',
    semester: 'S6',
    cgpa: 6.4,
    attendance: 61,
    risk: 82,
    category: 'High',
  },
  {
    id: 'BCN2026042',
    name: 'Anjali Nair',
    department: 'Computer Science',
    semester: 'S6',
    cgpa: 6.9,
    attendance: 67,
    risk: 68,
    category: 'High',
  },
  {
    id: 'BCN2026118',
    name: 'Arjun Raj',
    department: 'Information Technology',
    semester: 'S4',
    cgpa: 7.2,
    attendance: 73,
    risk: 51,
    category: 'Medium',
  },
  {
    id: 'BCN2026077',
    name: 'Meera Joseph',
    department: 'Computer Science',
    semester: 'S4',
    cgpa: 7.5,
    attendance: 78,
    risk: 34,
    category: 'Medium',
  },
  {
    id: 'BCN2026031',
    name: 'Adithya S',
    department: 'Electronics',
    semester: 'S6',
    cgpa: 8.4,
    attendance: 91,
    risk: 18,
    category: 'Low',
  },
  {
    id: 'BCN2026054',
    name: 'Fathima Rahman',
    department: 'Information Technology',
    semester: 'S6',
    cgpa: 8.1,
    attendance: 86,
    risk: 14,
    category: 'Low',
  },
  {
    id: 'BCN2026098',
    name: 'Nikhil P',
    department: 'Electronics',
    semester: 'S4',
    cgpa: 7.0,
    attendance: 70,
    risk: 47,
    category: 'Medium',
  },
  {
    id: 'BCN2026022',
    name: 'Devika Menon',
    department: 'Computer Science',
    semester: 'S6',
    cgpa: 5.9,
    attendance: 58,
    risk: 76,
    category: 'High',
  },
]

function Students() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [semesterFilter, setSemesterFilter] = useState('All')

  /*
   * Get students added from the Add Student page.
   *
   * The risk fields are normalized here so that both
   * old and newly added student objects work correctly.
   */
  const storedStudents = (
    JSON.parse(localStorage.getItem('beaconStudents')) || []
  ).map((student) => ({
    ...student,
    risk: student.risk ?? student.riskScore,
    category: student.category ?? student.riskCategory,
  }))

  const allStudents = [
    ...studentsData,
    ...storedStudents,
  ]

  const filteredStudents = useMemo(() => {
    return allStudents.filter((student) => {
      const search = searchTerm.toLowerCase().trim()

      const matchesSearch =
        student.name.toLowerCase().includes(search) ||
        student.id.toLowerCase().includes(search)

      const matchesRisk =
        riskFilter === 'All' ||
        student.category === riskFilter

      const matchesDepartment =
        departmentFilter === 'All' ||
        student.department === departmentFilter

      const matchesSemester =
        semesterFilter === 'All' ||
        student.semester === semesterFilter

      return (
        matchesSearch &&
        matchesRisk &&
        matchesDepartment &&
        matchesSemester
      )
    })
  }, [
    searchTerm,
    riskFilter,
    departmentFilter,
    semesterFilter,
    storedStudents.length,
  ])

  const getRiskClass = (category) => {
    if (category === 'High') return 'risk-high'
    if (category === 'Medium') return 'risk-medium'
    return 'risk-low'
  }

  const clearFilters = () => {
    setSearchTerm('')
    setRiskFilter('All')
    setDepartmentFilter('All')
    setSemesterFilter('All')
  }

  return (
    <div className="page-container">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>
          <p className="page-eyebrow">
            STUDENT MANAGEMENT
          </p>

          <h2>Students</h2>

          <p>
            Search and monitor student risk levels,
            academic performance, and attendance.
          </p>
        </div>

        <div className="page-header-actions">

          <div className="page-header-stat">
            <span>Students shown</span>
            <strong>{filteredStudents.length}</strong>
          </div>

          <button
            type="button"
            className="add-student-button"
            onClick={() => navigate('/students/add')}
          >
            <i className="bi bi-person-plus-fill"></i>
            <span>Add Student</span>
          </button>

        </div>

      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <section className="filter-card">

        <div className="filter-row">

          {/* Search */}
          <div className="search-box">

            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>

          {/* Risk Filter */}
          <div className="filter-control">

            <label>Risk Level</label>

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(event.target.value)
              }
            >
              <option value="All">
                All Risk Levels
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          {/* Department Filter */}
          <div className="filter-control">

            <label>Department</label>

            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(event.target.value)
              }
            >
              <option value="All">
                All Departments
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

          {/* Semester Filter */}
          <div className="filter-control">

            <label>Semester</label>

            <select
              value={semesterFilter}
              onChange={(event) =>
                setSemesterFilter(event.target.value)
              }
            >
              <option value="All">
                All Semesters
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

          {/* Clear Filters */}
          <button
            type="button"
            className="clear-filter-button"
            onClick={clearFilters}
            title="Clear filters"
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>

        </div>

      </section>

      {/* =========================
          STUDENT TABLE
      ========================= */}

      <section className="students-page-card">

        <div className="students-page-card-header">

          <div>
            <h3>Student Risk Register</h3>

            <p>
              Review predicted dropout risk and key academic indicators.
            </p>
          </div>

          <div className="table-count">
            {filteredStudents.length} student
            {filteredStudents.length !== 1 ? 's' : ''}
          </div>

        </div>

        <div className="students-page-table-wrapper">

          <table className="students-page-table">

            <thead>

              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Attendance</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    {/* Student */}
                    <td>

                      <div className="student-page-cell">

                        <div className="student-page-avatar">

                          {student.name
                            .split(' ')
                            .map((word) => word[0])
                            .join('')
                            .substring(0, 2)}

                        </div>

                        <div>

                          <strong>
                            {student.name}
                          </strong>

                          <span>
                            {student.id}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Department */}
                    <td>
                      {student.department}
                    </td>

                    {/* Semester */}
                    <td>

                      <span className="semester-badge">
                        {student.semester}
                      </span>

                    </td>

                    {/* CGPA */}
                    <td>

                      <strong className="academic-value">
                        {student.cgpa}
                      </strong>

                    </td>

                    {/* Attendance */}
                    <td>

                      <div className="attendance-value">

                        <span>
                          {student.attendance}%
                        </span>

                        <div className="attendance-bar">

                          <div
                            style={{
                              width: `${student.attendance}%`,
                            }}
                          ></div>

                        </div>

                      </div>

                    </td>

                    {/* Risk Score */}
                    <td>

                      <strong className="student-risk-score">
                        {student.risk}%
                      </strong>

                    </td>

                    {/* Risk Level */}
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

                    {/* View */}
                    <td>

                      <button
                        type="button"
                        className="student-view-button"
                        onClick={() =>
                          navigate(
                            `/students/${student.id}`
                          )
                        }
                        title="View student"
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-students"
                  >

                    <div>

                      <i className="bi bi-search"></i>

                      <strong>
                        No students found
                      </strong>

                      <span>
                        Try changing your search or filters.
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  )
}

export default Students