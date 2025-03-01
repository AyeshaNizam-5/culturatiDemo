import React, { Suspense, lazy } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';


const SuperAdminDashboard = lazy(() => import('./SuperAdminDashboard'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ContentCreatorDashboard = lazy(() => import('./ContentCreatorDashboard'));

const Dashboard = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return <div>Loading...</div>;
  }

 
  switch (role) {
    case 'super_admin':
      return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <SuperAdminDashboard />
        </Suspense>
      );
    case 'admin':
      return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <AdminDashboard />
        </Suspense>
      );
    case 'content_creator':
      return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <ContentCreatorDashboard />
        </Suspense>
      );
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default Dashboard;
