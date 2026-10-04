import { useState } from 'react'
import './UserManagement.css'

function UserManagement() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Administrator',
      email: 'admin@cec.ac.in',
      role: 'Administrator',
      department: 'All Departments',
      assignments: [],
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Faculty Advisor',
    department: 'CSE',
    batch: '',
    semester: '',
    className: '',
  })

  const [assignments, setAssignments] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Add one class assignment
  const handleAddAssignment = () => {

    if (
      !formData.batch ||
      !formData.semester ||
      !formData.className
    ) {
      return
    }

    const newAssignment = {
      id: Date.now(),
      department: formData.department,
      batch: formData.batch,
      semester: formData.semester,
      className: formData.className,
    }

    setAssignments([
      ...assignments,
      newAssignment,
    ])

    // Clear only assignment fields
    setFormData({
      ...formData,
      batch: '',
      semester: '',
      className: '',
    })
  }

  // Remove an assignment
  const handleRemoveAssignment = (id) => {
    setAssignments(
      assignments.filter(
        (assignment) => assignment.id !== id
      )
    )
  }

  const handleAddUser = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      return
    }

    // Faculty Advisor must have at least one class
    if (
      formData.role === 'Faculty Advisor' &&
      assignments.length === 0
    ) {
      return
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      assignments:
        formData.role === 'Faculty Advisor'
          ? assignments
          : [],
    }

    setUsers([
      ...users,
      newUser,
    ])

    // Reset form
    setFormData({
      name: '',
      email: '',
      role: 'Faculty Advisor',
      department: 'CSE',
      batch: '',
      semester: '',
      className: '',
    })

    setAssignments([])

    setShowForm(false)
  }

  return (
    <div className="user-management">

      {/* Page Header */}

      <div className="page-header">

        <div>
          <h1>User Management</h1>

          <p>
            Manage Faculty Advisors and Department Coordinators
          </p>
        </div>

        <button
          className="add-user-button"
          onClick={() => setShowForm(true)}
        >
          + Add User
        </button>

      </div>


      {/* Add User Form */}

      {showForm && (

        <div className="user-form-card">

          <div className="form-header">

            <h2>Add User</h2>

            <button
              className="close-button"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleAddUser}>

            <div className="form-grid">

              {/* Full Name */}

              <div className="form-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              {/* Email */}

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>


              {/* Role */}

              <div className="form-group">

                <label>Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })

                    setAssignments([])
                  }}
                >

                  <option value="Faculty Advisor">
                    Faculty Advisor
                  </option>

                  <option value="Department Coordinator">
                    Department Coordinator
                  </option>

                </select>

              </div>


              {/* Department */}

              <div className="form-group">

                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >

                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="MCA">MCA</option>

                </select>

              </div>

            </div>


            {/* Faculty Assignment Section */}

            {formData.role === 'Faculty Advisor' && (

              <div className="assignment-section">

                <div className="assignment-header">

                  <div>

                    <h3>Assigned Classes</h3>

                    <p>
                      A Faculty Advisor can be assigned to multiple
                      classes.
                    </p>

                  </div>

                </div>


                {/* Assignment Inputs */}

                <div className="assignment-inputs">

                  <div className="form-group">

                    <label>Batch</label>

                    <input
                      type="text"
                      name="batch"
                      placeholder="Example: 2023-2027"
                      value={formData.batch}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="form-group">

                    <label>Semester</label>

                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Semester
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

                    <label>Class</label>

                    <input
                      type="text"
                      name="className"
                      placeholder="Example: A"
                      value={formData.className}
                      onChange={handleChange}
                    />

                  </div>


                  <button
                    type="button"
                    className="add-assignment-button"
                    onClick={handleAddAssignment}
                  >
                    + Add Class
                  </button>

                </div>


                {/* Assigned Class List */}

                {assignments.length > 0 && (

                  <div className="assignment-list">

                    {assignments.map((assignment) => (

                      <div
                        className="assignment-item"
                        key={assignment.id}
                      >

                        <div className="assignment-info">

                          <strong>
                            {assignment.department} {assignment.className}
                          </strong>

                          <span>
                            {assignment.batch} • {assignment.semester}
                          </span>

                        </div>

                        <button
                          type="button"
                          className="remove-assignment-button"
                          onClick={() =>
                            handleRemoveAssignment(
                              assignment.id
                            )
                          }
                        >
                          ×
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            )}


            {/* Coordinator Information */}

            {formData.role === 'Department Coordinator' && (

              <div className="coordinator-info">

                <i className="bi bi-info-circle"></i>

                <span>
                  Department Coordinators can view all students
                  belonging to their selected department.
                </span>

              </div>

            )}


            {/* Form Actions */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowForm(false)
                  setAssignments([])
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-button"
              >
                Create User
              </button>

            </div>

          </form>

        </div>

      )}


      {/* Users Table */}

      <div className="users-card">

        <div className="table-header">

          <h2>System Users</h2>

          <span>
            {users.length} users
          </span>

        </div>


        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Assigned Classes</th>

              </tr>

            </thead>


            <tbody>

              {users.map((user) => (

                <tr key={user.id}>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>

                    <span className="role-badge">
                      {user.role}
                    </span>

                  </td>

                  <td>
                    {user.department}
                  </td>

                  <td>

                    {user.role === 'Administrator' ? (

                      <span className="all-access">
                        All Access
                      </span>

                    ) : user.role === 'Department Coordinator' ? (

                      <span className="department-access">
                        All Department Students
                      </span>

                    ) : user.assignments &&
                      user.assignments.length > 0 ? (

                      <div className="class-tags">

                        {user.assignments.map(
                          (assignment) => (

                            <span
                              className="class-tag"
                              key={assignment.id}
                            >
                              {assignment.semester} {assignment.className}
                            </span>

                          )
                        )}

                      </div>

                    ) : (

                      <span className="no-assignment">
                        No classes assigned
                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default UserManagement