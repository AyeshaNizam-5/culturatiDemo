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
import './App.css';
import GameContentList from "./pages/GameContentList";
import RouteContentList from "./pages/RouteContentList";
import AboutInstitution from './pages/AboutInstitution'
import ItemsPage from './pages/ItemsPage'


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
              <Route path="/dashboard/content-creator/Game" element={<GameContentList />} />
              <Route path="/dashboard/content-creator/Route" element={<RouteContentList />} />
              <Route path="/dashboard/content-creator/settings" element={<div>Settings page coming soon</div>} />
          </Route>

          <Route
            path="/dashboard/editor"
            element={
              <ProtectedRoute allowedRoles={['editor']}>
                <Dashboard />
              </ProtectedRoute>}>
              <Route path="/dashboard/editor/Game" element={<GameContentList />} />
              <Route path="/dashboard/editor/Route" element={<RouteContentList />} />
              <Route path="/dashboard/editor/settings" element={<div>Settings page coming soon</div>} />
          </Route>

          <Route
            path="/dashboard/data-entry-operator"
            element={
              <ProtectedRoute allowedRoles={['data_entry_operator']}>
                <Dashboard />
              </ProtectedRoute>}>
              <Route path="/dashboard/data-entry-operator/AboutInstitution" element={<AboutInstitution />} />
              <Route path="/dashboard/data-entry-operator/Items" element={<ItemsPage />} />
              <Route path="/dashboard/data-entry-operator/settings" element={<div>Settings page coming soon</div>} />
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