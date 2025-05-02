// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import InstitutionsList from './pages/institution/InstitutionsList';
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import Institution from './components/Institution';
import Categories from './pages/Categories';
import Levels from './pages/Levels';
import Users from './pages/Users';

import AboutInstitution from './pages/AboutInstitution';
import ItemsPage from './pages/ItemsPage';
import GameContentList from "./pages/GameContentList";
import GameContentEdit from "./pages/GameContentEdit";
import RouteContentList from "./pages/RouteContentList";
import RouteContentEdit from "./pages/RouteContentEdit";
import SettingsPage from "./pages/SettingsPage"

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<SettingsPage />} />

         
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            
            <Route index element={<InstitutionsList />} />
            <Route path="categories" element={<Categories />} />
            <Route path="levels" element={<Levels />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

      
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
          </Route>

          
          <Route
            path="/dashboard/content-creator"
            element={
              <ProtectedRoute allowedRoles={['content_creator']}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="Game" element={<GameContentList />} />
            <Route path="Game/edit/:id" element={<GameContentEdit />} />
            <Route path="Route" element={<RouteContentList />} />
            <Route path="Route/edit/:id" element={<RouteContentEdit />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

         
          <Route
            path="/dashboard/editor"
            element={
              <ProtectedRoute allowedRoles={['editor']}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="Game" element={<GameContentList />} />
            <Route path="Game/edit/:id" element={<GameContentEdit />} />
            <Route path="Route" element={<RouteContentList />} />
            <Route path="Route/edit/:id" element={<RouteContentEdit />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          
          <Route
            path="/dashboard/data-entry-operator"
            element={
              <ProtectedRoute allowedRoles={['data_entry_operator']}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="AboutInstitution" element={<AboutInstitution />} />
            <Route path="Items" element={<ItemsPage />} />
            <Route path="settings" element={<SettingsPage />} />
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
            <Route path="users" element={<Users />} />
            <Route path="levels" element={<Levels />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
