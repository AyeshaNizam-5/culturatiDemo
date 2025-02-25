import AdminDashboard from '../components/dashboards/AdminDashboard';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import ContentCreatorDashboard from '../components/dashboards/ContentCreatorDashboard'

import { useSelector } from "react-redux";


const Dashboard = () => {
  
  const role = useSelector((state) => state.auth.role);
  
  
  if (!role) {
    return <div>Loading...</div>; 
  }

  switch (role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'content_creator':
      return <ContentCreatorDashboard />;
    default:
      return <div>Unauthorized Access</div>;
  }
  
};

export default Dashboard;
