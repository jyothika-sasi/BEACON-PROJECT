import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'

function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  // Get logged-in user
  const storedUser = localStorage.getItem('beaconUser')

  const user = storedUser
    ? JSON.parse(storedUser)
    : {
        name: 'User',
        email: '',
        role: 'Faculty Advisor',
      }

  const role = user.role

  // --------------------------------
  // Navigation based on role
  // --------------------------------

  const getNavigationItems = () => {

    // ADMINISTRATOR
    if (role === 'Administrator') {
      return [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'bi-grid-1x2-fill',
        },
        {
          name: 'Students',
          path: '/students',
          icon: 'bi-people-fill',
        },
        {
          name: 'Add Student',
          path: '/students/add',
          icon: 'bi-person-plus-fill',
        },
        {
          name: 'User Management',
          path: '/users',
          icon: 'bi-person-gear',
        },
        {
          name: 'Risk Analysis',
          path: '/risk-analysis',
          icon: 'bi-graph-up-arrow',
        },
        {
          name: 'Alerts',
          path: '/alerts',
          icon: 'bi-bell-fill',
        },
        {
          name: 'Reports',
          path: '/reports',
          icon: 'bi-bar-chart-fill',
        },
      ]
    }

    // FACULTY ADVISOR
    if (role === 'Faculty Advisor') {
      return [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'bi-grid-1x2-fill',
        },
        {
          name: 'My Students',
          path: '/students',
          icon: 'bi-people-fill',
        },
        {
          name: 'Risk Analysis',
          path: '/risk-analysis',
          icon: 'bi-graph-up-arrow',
        },
        {
          name: 'Alerts',
          path: '/alerts',
          icon: 'bi-bell-fill',
        },
        {
          name: 'Reports',
          path: '/reports',
          icon: 'bi-bar-chart-fill',
        },
      ]
    }

    // DEPARTMENT COORDINATOR
    if (role === 'Department Coordinator') {
      return [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'bi-grid-1x2-fill',
        },
        {
          name: 'Department Students',
          path: '/students',
          icon: 'bi-people-fill',
        },
        {
          name: 'Risk Analysis',
          path: '/risk-analysis',
          icon: 'bi-graph-up-arrow',
        },
        {
          name: 'Alerts',
          path: '/alerts',
          icon: 'bi-bell-fill',
        },
        {
          name: 'Reports',
          path: '/reports',
          icon: 'bi-bar-chart-fill',
        },
      ]
    }

    return []
  }

  const navigationItems = getNavigationItems()

  // --------------------------------
  // Page title
  // --------------------------------

  const getPageName = () => {

    if (location.pathname === '/students/add') {
      return 'Add Student'
    }

    if (location.pathname.startsWith('/students/')) {
      return 'Student Details'
    }

    const currentItem = navigationItems.find(
      (item) => item.path === location.pathname
    )

    if (currentItem) {
      return currentItem.name
    }

    if (location.pathname === '/settings') {
      return 'Settings'
    }

    return 'Dashboard'
  }

  // --------------------------------
  // Logout
  // --------------------------------

  const handleLogout = () => {
    localStorage.removeItem('beaconUser')
    navigate('/login')
  }

  // --------------------------------
  // User initials
  // --------------------------------

  const getInitials = () => {
    if (!user.name) {
      return 'U'
    }

    const parts = user.name.trim().split(' ')

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase()
  }

  return (
    <div className="beacon-app">

      {/* =========================
          SIDEBAR
          ========================= */}

      <aside className="sidebar">

        {/* Brand */}
        <div className="brand-section">

          <div className="brand-logo">
            <i className="bi bi-shield-check"></i>
          </div>

          <div>
            <h1>Beacon</h1>
            <span>Student Early Warning</span>
          </div>

        </div>

        {/* Menu Title */}
        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">

          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <i className={`bi ${item.icon}`}></i>

              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>

        {/* Bottom Navigation */}
        <div className="sidebar-bottom">

          {/* Settings only for Administrator */}
          {role === 'Administrator' && (
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <i className="bi bi-gear-fill"></i>

              <span>Settings</span>
            </NavLink>
          )}

          {/* Logout */}
          <button
            className="sidebar-link logout-link"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-left"></i>

            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* =========================
          MAIN AREA
          ========================= */}

      <main className="main-area">

        {/* Top Navbar */}
        <header className="topbar">

          <div className="topbar-left">

            <div className="breadcrumb-text">
              {getPageName()}
            </div>

          </div>


          <div className="topbar-right">

            {/* Notifications */}
            <button
              className="notification-button"
              onClick={() => navigate('/alerts')}
              title="View alerts"
            >
              <i className="bi bi-bell"></i>

              <span className="notification-dot"></span>
            </button>


            {/* User */}
            <div className="user-profile">

              <div className="user-avatar">
                {getInitials()}
              </div>

              <div className="user-info">

                <strong>
                  {user.name || 'User'}
                </strong>

                <span>
                  {role}
                </span>

              </div>

              <i className="bi bi-chevron-down user-chevron"></i>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <Outlet />

      </main>

    </div>
  )
}

export default MainLayout