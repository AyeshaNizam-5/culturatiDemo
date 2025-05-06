import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  LayersIcon,
  FolderTree,
  Settings
} from 'lucide-react';

import AppSidebar from '@/components/app-sidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

import institutionService from '../../services/institutionService';

const AdminDashboard = () => {
  const [assignedInstitution, setAssignedInstitution] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
        const response = await institutionService.getById();
        console.log('Assigned institution data:', response.data); // Debugging line 

        if (response) {
          setAssignedInstitution(response.data);
          navigate(`/institution/${response.data.id}/institution`);
        }
      } catch (error) {
        console.error('Error fetching assigned institution:', error);
      }
    };

    fetchAssignedInstitution();
  }, [user, navigate]);

  if (!assignedInstitution) {
    return <div className="h-screen flex items-center justify-center text-[#0b6085]">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b border-gray-200 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <h1 className="text-2xl font-bold text-[#0b6085]">
            {assignedInstitution.institutionName} Dashboard
          </h1>
        </header>

        <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          {/* Dashboard content will be rendered through nested routes */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboard;
