import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Institution from './components/Institution'

const App = () => {

  const DashboardRoute = ({ children }) => (
    <ProtectedRoute>
      <Dashboard>{children}</Dashboard>
    </ProtectedRoute>
  )
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="institution" element={<Institution />} />
            <Route path="users" element={<Users />} />
            <Route path="levels" element={<Levels />} />
            <Route path="categories" element={<Categories />} /> */}
            <Route path="settings" element={<div>Settings page coming soon</div>} />
            <Route path="institution" element={<Institution />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
