import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Login from './pages/Login'
import Landing from './pages/Landing'

import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import AddStudent from './pages/AddStudent'
import StudentDetails from './pages/StudentDetails'
import Alerts from './pages/Alerts'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import UserManagement from './pages/UserManagement'
import RiskAnalysis from './pages/RiskAnalysis'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

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
          <Route
             path="/users"
             element={<UserManagement />}
          />
          <Route
            path="/risk-analysis"
            element={<RiskAnalysis />}
          />
        </Route>

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App