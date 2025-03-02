import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Building2, Users, LayersIcon, FolderTree, Settings } from 'lucide-react';
import institutionService from '../../services/institutionService';

const AdminDashboard = () => {
  const [assignedInstitution, setAssignedInstitution] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Navigation items for admin - removed "Back to Institutions" button
  const navItems = [
    { path: `institution`, label: 'Institution Details', icon: Building2 },
    { path: `users`, label: 'Users', icon: Users },
    { path: `levels`, label: 'Levels', icon: LayersIcon },
    { path: `categories`, label: 'Categories', icon: FolderTree },
    { path: `settings`, label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const fetchAssignedInstitution = async () => {
      try {
        const response = await institutionService.getAll();
        const userInstitution = response.data.find(inst => inst.id === user.institutionId);
        
        if (userInstitution) {
          setAssignedInstitution(userInstitution);
          // Redirect to institution dashboard
          navigate(`/institution/${userInstitution.id}/institution`);
        }
      } catch (error) {
        console.error('Error fetching assigned institution:', error);
      }
    };

    fetchAssignedInstitution();
  }, [user, navigate]);

  if (!assignedInstitution) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Navbar navItems={navItems} />
      <div className="flex-1 ml-[18%] bg-gray-50 p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {assignedInstitution.institutionName} Dashboard
        </h1>
        {/* Dashboard content will be rendered through nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;