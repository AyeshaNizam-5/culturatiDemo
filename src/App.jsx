import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './pages/Login'
import InstitutionsList from './pages/InstitutionsList'
import InstitutionDashboard from './pages/InstitutionDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './pages/Users'
import Dashboard from './components/Dashboard'
import Categories from './pages/Categories'
import Levels from './pages/Levels'
import Institution from './pages/Institution'

const DashboardRoute = ({ children }) => (
  <ProtectedRoute>
    <Dashboard>{children}</Dashboard>
  </ProtectedRoute>
)

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/institutions" element={<ProtectedRoute><InstitutionsList /></ProtectedRoute>} />
          <Route path="/institution/:institutionId" element={<DashboardRoute>
            <InstitutionDashboard />
          </DashboardRoute>}>
            <Route path="institution" element={<Institution />} />
            <Route path="users" element={<Users />} />
            <Route path="levels" element={<Levels />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<div>Settings page coming soon</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
