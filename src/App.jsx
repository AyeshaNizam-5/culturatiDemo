// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import InstitutionsList from './pages/institution/InstitutionsList';
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import Institution from './components/Institution';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* SuperAdmin Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Content Creator Dashboard */}
          <Route
            path="/dashboard/content-creator"
            element={
              <ProtectedRoute allowedRoles={['content_creator']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Institutions List - SuperAdmin Only */}
          <Route
            path="/institutions"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <InstitutionsList />
              </ProtectedRoute>
            }
          />

          {/* Nested Routes for InstitutionDashboard */}
          <Route
            path="/institution/:institutionId"
            element={
              <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="institution" element={<Institution />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
