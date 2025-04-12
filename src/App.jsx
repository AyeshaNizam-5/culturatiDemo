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
import Categories from './pages/Categories'
import Levels from './pages/Levels'
import Users from './pages/Users'
import AllGames from './pages/AllGames'
import AllRoutes from './pages/AllRoutes'


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="settings" element={<div>Settings page coming soon</div>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/dashboard/content-creator"
            element={
              <ProtectedRoute allowedRoles={['content_creator']}>
                <Dashboard />
              </ProtectedRoute>}>
              <Route path="/dashboard/content-creator/Game" element={<AllGames />} />
              <Route path="/dashboard/content-creator/Route" element={<AllRoutes />} />
              <Route path="/dashboard/content-creator/settings" element={<div>Settings page coming soon</div>} />
          </Route>

          <Route
            path="/dashboard/editor"
            element={
              <ProtectedRoute allowedRoles={['editor']}>
                <Dashboard />
              </ProtectedRoute>}>
              <Route path="/dashboard/editor/Game" element={<AllGames />} />
              <Route path="/dashboard/editor/Route" element={<AllRoutes />} />
              <Route path="/dashboard/editor/settings" element={<div>Settings page coming soon</div>} />
          </Route>
          
          <Route
            path="/institutions"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <InstitutionsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/institution/:institutionId"
            element={
              <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="institution" element={<Institution />} />
            <Route path="institution" element={<Institution />} />
            <Route path="users" element={<Users />} />
            <Route path="levels" element={<Levels />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<div>Settings page coming soon</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;