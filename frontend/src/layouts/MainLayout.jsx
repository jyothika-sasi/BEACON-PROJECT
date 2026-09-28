import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const navigationItems = [
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
      name: 'Alerts',
      path: '/alerts',
      icon: 'bi-bell-fill',
    },
    {
      name: 'Interventions',
      path: '/interventions',
      icon: 'bi-clipboard2-check-fill',
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: 'bi-bar-chart-fill',
    },
  ]

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

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="beacon-app">

      {/* Sidebar */}
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

        {/* Main Navigation */}
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

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <i className="bi bi-gear-fill"></i>
            <span>Settings</span>
          </NavLink>

          <button
            className="sidebar-link logout-link"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-left"></i>
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Area */}
      <main className="main-area">

        {/* Top Navbar */}
        <header className="topbar">

          <div className="topbar-left">

            <div className="breadcrumb-text">
              {getPageName()}
            </div>

          </div>

          <div className="topbar-right">

            <button
              className="notification-button"
              onClick={() => navigate('/alerts')}
              title="View alerts"
            >
              <i className="bi bi-bell"></i>
              <span className="notification-dot"></span>
            </button>

            <div className="user-profile">

              <div className="user-avatar">
                JD
              </div>

              <div className="user-info">
                <strong>Dr. Jyothika</strong>
                <span>Faculty Advisor</span>
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