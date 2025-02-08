import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './pages/Login'
import Institutions from './pages/Institutions'
import ProtectedRoute from './components/ProtectedRoute'
import Users from './pages/Users'
import Dashboard from './components/Dashboard'
import Categories from './pages/Categories'
import Levels from './pages/Levels'

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
          <Route path="/institutions" element={<DashboardRoute><Institutions /></DashboardRoute>} />
          <Route path="/users" element={<DashboardRoute><Users /></DashboardRoute>} />
          <Route path="/levels" element={<DashboardRoute><Levels /></DashboardRoute>} />
          <Route path="/categories" element={<DashboardRoute><Categories /></DashboardRoute>} />
          <Route path="/settings" element={<DashboardRoute><div>Settings page coming soon</div></DashboardRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
