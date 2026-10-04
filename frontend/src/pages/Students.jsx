import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const studentsData = [
  {
    id: 'BCN2026001',
    name: 'Rahul Kumar',
    department: 'CSE',
    semester: 'S6',
    batch: '2023-2027',
    className: 'A',
    cgpa: 6.4,
    attendance: 61,
    risk: 82,
    category: 'High',
  },
  {
    id: 'BCN2026042',
    name: 'Anjali Nair',
    department: 'CSE',
    semester: 'S6',
    batch: '2023-2027',
    className: 'B',
    cgpa: 6.9,
    attendance: 67,
    risk: 68,
    category: 'High',
  },
  {
    id: 'BCN2026118',
    name: 'Arjun Raj',
    department: 'ECE',
    semester: 'S4',
    batch: '2024-2028',
    className: 'A',
    cgpa: 7.2,
    attendance: 73,
    risk: 51,
    category: 'Medium',
  },
  {
    id: 'BCN2026077',
    name: 'Meera Joseph',
    department: 'CSE',
    semester: 'S4',
    batch: '2024-2028',
    className: 'A',
    cgpa: 7.5,
    attendance: 78,
    risk: 34,
    category: 'Medium',
  },
  {
    id: 'BCN2026031',
    name: 'Adithya S',
    department: 'EEE',
    semester: 'S6',
    batch: '2023-2027',
    className: 'A',
    cgpa: 8.4,
    attendance: 91,
    risk: 18,
    category: 'Low',
  },
  {
    id: 'BCN2026054',
    name: 'Fathima Rahman',
    department: 'ECE',
    semester: 'S6',
    batch: '2023-2027',
    className: 'B',
    cgpa: 8.1,
    attendance: 86,
    risk: 14,
    category: 'Low',
  },
  {
    id: 'BCN2026098',
    name: 'Nikhil P',
    department: 'AI & ML',
    semester: 'S4',
    batch: '2024-2028',
    className: 'A',
    cgpa: 7.0,
    attendance: 70,
    risk: 47,
    category: 'Medium',
  },
  {
    id: 'BCN2026022',
    name: 'Devika Menon',
    department: 'CSE',
    semester: 'S6',
    batch: '2023-2027',
    className: 'A',
    cgpa: 5.9,
    attendance: 58,
    risk: 76,
    category: 'High',
  },
]

/*
 * ============================================================
 * DEMO FACULTY ASSIGNMENTS
 * ============================================================
 */

const facultyAssignments = {
  'anu@cec.ac.in': [
    {
      department: 'CSE',
      batch: '2023-2027',
      semester: 'S6',
      className: 'A',
    },
    {
      department: 'CSE',
      batch: '2023-2027',
      semester: 'S6',
      className: 'B',
    },
    {
      department: 'CSE',
      batch: '2024-2028',
      semester: 'S4',
      className: 'A',
    },
  ],

  'faculty@cec.ac.in': [
    {
      department: 'CSE',
      batch: '2023-2027',
      semester: 'S6',
      className: 'A',
    },
    {
      department: 'CSE',
      batch: '2023-2027',
      semester: 'S6',
      className: 'B',
    },
  ],
}

/*
 * ============================================================
 * DEMO COORDINATOR ASSIGNMENTS
 * ============================================================
 */

const coordinatorAssignments = {
  'coordinator@cec.ac.in': 'CSE',
  'coordinator.cse@cec.ac.in': 'CSE',
}

function Students() {
  const navigate = useNavigate()

  /*
   * ============================================================
   * LOGGED-IN USER
   * ============================================================
   */

  const storedUser = localStorage.getItem('beaconUser')

  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name: 'User',
        email: '',
        role: 'Administrator',
      }

  const userEmail = user.email?.toLowerCase().trim() || ''
  const userRole = user.role || ''

  /*
   * ============================================================
   * STATE
   * ============================================================
   */

  const [storedStudents, setStoredStudents] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [batchFilter, setBatchFilter] = useState('All')
  const [semesterFilter, setSemesterFilter] = useState('All')
  const [classFilter, setClassFilter] = useState('All')

  /*
   * ============================================================
   * LOAD STUDENTS
   * ============================================================
   */

  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem('beaconStudents')) || []

    const normalizedStudents = savedStudents.map((student) => ({
      ...student,

      risk: student.risk ?? student.riskScore ?? 0,

      category:
        student.category ??
        student.riskCategory ??
        'Low',

      className: student.className || '-',

      batch: student.batch || '-',
    }))

    setStoredStudents(normalizedStudents)
  }, [])

  /*
   * ============================================================
   * COMBINE ALL STUDENTS
   * ============================================================
   */

  const allStudents = useMemo(() => {
    return [
      ...studentsData,
      ...storedStudents,
    ]
  }, [storedStudents])

  /*
   * ============================================================
   * CURRENT FACULTY ASSIGNMENTS
   * ============================================================
   */

  const currentFacultyAssignments =
    userRole === 'Faculty Advisor'
      ? facultyAssignments[userEmail] || []
      : []

  /*
   * ============================================================
   * CURRENT COORDINATOR DEPARTMENT
   * ============================================================
   */

  const currentCoordinatorDepartment =
    userRole === 'Department Coordinator'
      ? coordinatorAssignments[userEmail]
      : null

  /*
   * ============================================================
   * ROLE-BASED ACCESS
   * ============================================================
   */

  const roleBasedStudents = useMemo(() => {

    /*
     * ADMINISTRATOR
     * Sees everything.
     */

    if (userRole === 'Administrator') {
      return allStudents
    }

    /*
     * FACULTY ADVISOR
     *
     * Student must match ANY one of the
     * faculty's assignments.
     */

    if (userRole === 'Faculty Advisor') {

      return allStudents.filter((student) => {

        return currentFacultyAssignments.some(
          (assignment) => {

            return (
              student.department ===
                assignment.department &&

              student.batch ===
                assignment.batch &&

              student.semester ===
                assignment.semester &&

              student.className ===
                assignment.className
            )
          }
        )
      })
    }

    /*
     * DEPARTMENT COORDINATOR
     *
     * Sees all students in assigned department.
     */

    if (userRole === 'Department Coordinator') {

      if (!currentCoordinatorDepartment) {
        return []
      }

      return allStudents.filter(
        (student) =>
          student.department ===
          currentCoordinatorDepartment
      )
    }

    return []

  }, [
    allStudents,
    userRole,
    currentFacultyAssignments,
    currentCoordinatorDepartment,
  ])

  /*
   * ============================================================
   * FILTER OPTIONS
   *
   * IMPORTANT:
   * These options are generated from the students the
   * current user is actually allowed to see.
   * ============================================================
   */

  const availableDepartments = useMemo(() => {

    return [
      ...new Set(
        roleBasedStudents
          .map((student) => student.department)
          .filter(Boolean)
      ),
    ]

  }, [roleBasedStudents])

  const availableBatches = useMemo(() => {

    let students = roleBasedStudents

    if (departmentFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.department ===
          departmentFilter
      )
    }

    return [
      ...new Set(
        students
          .map((student) => student.batch)
          .filter(Boolean)
      ),
    ]

  }, [
    roleBasedStudents,
    departmentFilter,
  ])

  const availableSemesters = useMemo(() => {

    let students = roleBasedStudents

    if (departmentFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.department ===
          departmentFilter
      )
    }

    if (batchFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.batch === batchFilter
      )
    }

    return [
      ...new Set(
        students
          .map((student) => student.semester)
          .filter(Boolean)
      ),
    ]

  }, [
    roleBasedStudents,
    departmentFilter,
    batchFilter,
  ])

  const availableClasses = useMemo(() => {

    let students = roleBasedStudents

    if (departmentFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.department ===
          departmentFilter
      )
    }

    if (batchFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.batch === batchFilter
      )
    }

    if (semesterFilter !== 'All') {
      students = students.filter(
        (student) =>
          student.semester === semesterFilter
      )
    }

    return [
      ...new Set(
        students
          .map((student) => student.className)
          .filter(
            (className) =>
              className && className !== '-'
          )
      ),
    ]

  }, [
    roleBasedStudents,
    departmentFilter,
    batchFilter,
    semesterFilter,
  ])

  /*
   * ============================================================
   * FINAL FILTERED STUDENTS
   * ============================================================
   */

  const filteredStudents = useMemo(() => {

    return roleBasedStudents.filter((student) => {

      const search =
        searchTerm.toLowerCase().trim()

      const studentName =
        String(student.name || '')
          .toLowerCase()

      const studentId =
        String(student.id || '')
          .toLowerCase()

      /*
       * Search
       */

      const matchesSearch =
        studentName.includes(search) ||
        studentId.includes(search)

      /*
       * Risk
       */

      const matchesRisk =
        riskFilter === 'All' ||
        student.category === riskFilter

      /*
       * Department
       */

      const matchesDepartment =
        departmentFilter === 'All' ||
        student.department ===
          departmentFilter

      /*
       * Batch
       */

      const matchesBatch =
        batchFilter === 'All' ||
        student.batch === batchFilter

      /*
       * Semester
       */

      const matchesSemester =
        semesterFilter === 'All' ||
        student.semester ===
          semesterFilter

      /*
       * Class
       */

      const matchesClass =
        classFilter === 'All' ||
        student.className ===
          classFilter

      return (
        matchesSearch &&
        matchesRisk &&
        matchesDepartment &&
        matchesBatch &&
        matchesSemester &&
        matchesClass
      )
    })

  }, [
    roleBasedStudents,
    searchTerm,
    riskFilter,
    departmentFilter,
    batchFilter,
    semesterFilter,
    classFilter,
  ])

  /*
   * ============================================================
   * CLEAR FILTERS
   * ============================================================
   */

  const clearFilters = () => {

    setSearchTerm('')
    setRiskFilter('All')
    setDepartmentFilter('All')
    setBatchFilter('All')
    setSemesterFilter('All')
    setClassFilter('All')
  }

  /*
   * ============================================================
   * RISK CLASS
   * ============================================================
   */

  const getRiskClass = (category) => {

    if (category === 'High') {
      return 'risk-high'
    }

    if (category === 'Medium') {
      return 'risk-medium'
    }

    return 'risk-low'
  }

  /*
   * ============================================================
   * PAGE TITLE
   * ============================================================
   */

  const getStudentPageTitle = () => {

    if (userRole === 'Faculty Advisor') {
      return 'My Students'
    }

    if (userRole === 'Department Coordinator') {
      return 'Department Students'
    }

    return 'Students'
  }

  /*
   * ============================================================
   * PAGE DESCRIPTION
   * ============================================================
   */

  const getStudentPageDescription = () => {

    if (userRole === 'Faculty Advisor') {
      return 'Monitor students from your assigned classes and review their dropout risk.'
    }

    if (userRole === 'Department Coordinator') {
      return 'Monitor students across your department and review their dropout risk.'
    }

    return 'Search and monitor student risk levels, academic performance, and attendance.'
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="page-container">

      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <div className="page-header">

        <div>

          <p className="page-eyebrow">
            STUDENT MANAGEMENT
          </p>

          <h2>
            {getStudentPageTitle()}
          </h2>

          <p>
            {getStudentPageDescription()}
          </p>

        </div>

        <div className="page-header-actions">

          <div className="page-header-stat">

            <span>
              Students shown
            </span>

            <strong>
              {filteredStudents.length}
            </strong>

          </div>

          {userRole === 'Administrator' && (

            <button
              type="button"
              className="add-student-button"
              onClick={() =>
                navigate('/students/add')
              }
            >

              <i className="bi bi-person-plus-fill"></i>

              <span>
                Add Student
              </span>

            </button>

          )}

        </div>

      </div>


      {/* ======================================================
          FACULTY ASSIGNMENTS
          ====================================================== */}

      {userRole === 'Faculty Advisor' && (

        <section
          className="filter-card"
          style={{
            marginBottom: '20px',
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >

            <div>

              <p
                className="page-eyebrow"
                style={{
                  marginBottom: '6px',
                }}
              >
                FACULTY ASSIGNMENTS
              </p>

              <h3
                style={{
                  margin: 0,
                }}
              >
                Assigned Classes
              </h3>

            </div>

            <span className="table-count">
              {currentFacultyAssignments.length} class
              {currentFacultyAssignments.length !== 1
                ? 'es'
                : ''}
            </span>

          </div>

          {currentFacultyAssignments.length > 0 ? (

            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '16px',
              }}
            >

              {currentFacultyAssignments.map(
                (assignment, index) => (

                  <div
                    key={index}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      background: '#f8fafc',
                      fontSize: '13px',
                    }}
                  >

                    <strong>
                      {assignment.department}
                    </strong>

                    <span>
                      {' • '}
                      {assignment.batch}
                      {' • '}
                      {assignment.semester}
                      {' • Class '}
                      {assignment.className}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p
              style={{
                marginTop: '14px',
                marginBottom: 0,
                color: '#6b7280',
              }}
            >
              No demo class assignments are configured
              for this faculty account.
            </p>

          )}

        </section>

      )}


      {/* ======================================================
          COORDINATOR DEPARTMENT
          ====================================================== */}

      {userRole === 'Department Coordinator' &&
        currentCoordinatorDepartment && (

          <section
            className="filter-card"
            style={{
              marginBottom: '20px',
            }}
          >

            <p
              className="page-eyebrow"
              style={{
                marginBottom: '6px',
              }}
            >
              DEPARTMENT ACCESS
            </p>

            <h3
              style={{
                margin: 0,
              }}
            >
              {currentCoordinatorDepartment}
            </h3>

            <p
              style={{
                marginBottom: 0,
                marginTop: '6px',
              }}
            >
              You can view all students belonging to this
              department.
            </p>

          </section>

        )}


      {/* ======================================================
          FILTERS
          ====================================================== */}

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
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>


          {/* Risk */}

          <div className="filter-control">

            <label>
              Risk Level
            </label>

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(
                  event.target.value
                )
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


          {/* Department */}

          <div className="filter-control">

            <label>
              Department
            </label>

            <select
              value={departmentFilter}
              onChange={(event) => {

                setDepartmentFilter(
                  event.target.value
                )

                /*
                 * Reset dependent filters
                 * when department changes.
                 */

                setBatchFilter('All')
                setSemesterFilter('All')
                setClassFilter('All')
              }}
            >

              <option value="All">
                All Departments
              </option>

              {availableDepartments.map(
                (department) => (

                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>

                )
              )}

            </select>

          </div>


          {/* Batch */}

          <div className="filter-control">

            <label>
              Batch
            </label>

            <select
              value={batchFilter}
              onChange={(event) => {

                setBatchFilter(
                  event.target.value
                )

                setSemesterFilter('All')
                setClassFilter('All')
              }}
            >

              <option value="All">
                All Batches
              </option>

              {availableBatches.map(
                (batch) => (

                  <option
                    key={batch}
                    value={batch}
                  >
                    {batch}
                  </option>

                )
              )}

            </select>

          </div>


          {/* Semester */}

          <div className="filter-control">

            <label>
              Semester
            </label>

            <select
              value={semesterFilter}
              onChange={(event) => {

                setSemesterFilter(
                  event.target.value
                )

                setClassFilter('All')
              }}
            >

              <option value="All">
                All Semesters
              </option>

              {availableSemesters.map(
                (semester) => (

                  <option
                    key={semester}
                    value={semester}
                  >
                    {semester}
                  </option>

                )
              )}

            </select>

          </div>


          {/* Class */}

          <div className="filter-control">

            <label>
              Class
            </label>

            <select
              value={classFilter}
              onChange={(event) =>
                setClassFilter(
                  event.target.value
                )
              }
            >

              <option value="All">
                All Classes
              </option>

              {availableClasses.map(
                (className) => (

                  <option
                    key={className}
                    value={className}
                  >
                    Class {className}
                  </option>

                )
              )}

            </select>

          </div>


          {/* Clear */}

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


      {/* ======================================================
          STUDENT TABLE
          ====================================================== */}

      <section className="students-page-card">

        <div className="students-page-card-header">

          <div>

            <h3>
              Student Risk Register
            </h3>

            <p>
              Review predicted dropout risk and key
              academic indicators.
            </p>

          </div>

          <div className="table-count">

            {filteredStudents.length} student
            {filteredStudents.length !== 1
              ? 's'
              : ''}

          </div>

        </div>


        <div className="students-page-table-wrapper">

          <table className="students-page-table">

            <thead>

              <tr>

                <th>
                  Student
                </th>

                <th>
                  Department
                </th>

                <th>
                  Batch
                </th>

                <th>
                  Semester
                </th>

                <th>
                  Class
                </th>

                <th>
                  CGPA
                </th>

                <th>
                  Attendance
                </th>

                <th>
                  Risk Score
                </th>

                <th>
                  Risk Level
                </th>

                <th></th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map(
                  (student) => (

                    <tr key={student.id}>

                      {/* Student */}

                      <td>

                        <div className="student-page-cell">

                          <div className="student-page-avatar">

                            {student.name
                              .split(' ')
                              .map(
                                (word) =>
                                  word[0]
                              )
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


                      {/* Batch */}

                      <td>
                        {student.batch}
                      </td>


                      {/* Semester */}

                      <td>

                        <span className="semester-badge">
                          {student.semester}
                        </span>

                      </td>


                      {/* Class */}

                      <td>

                        <span className="semester-badge">
                          {student.className}
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

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="10"
                    className="empty-students"
                  >

                    <div>

                      <i className="bi bi-search"></i>

                      <strong>
                        No students found
                      </strong>

                      <span>

                        {userRole ===
                        'Faculty Advisor'
                          ? 'No students match your assigned classes and filters.'
                          : userRole ===
                            'Department Coordinator'
                          ? 'No students match your department and filters.'
                          : 'Try changing your search or filters.'}

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