import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import AddStudent from './pages/AddStudent'
import StudentDetails from './pages/StudentDetails'
import Alerts from './pages/Alerts'
import Interventions from './pages/Interventions'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Main application layout */}
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Students */}
          <Route
            path="/students"
            element={<Students />}
          />

          {/* Add Student */}
          <Route
            path="/students/add"
            element={<AddStudent />}
          />

          {/* Student Details */}
          <Route
            path="/students/:studentId"
            element={<StudentDetails />}
          />

          {/* Alerts */}
          <Route
            path="/alerts"
            element={<Alerts />}
          />

          {/* Interventions */}
          <Route
            path="/interventions"
            element={<Interventions />}
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={<Reports />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App