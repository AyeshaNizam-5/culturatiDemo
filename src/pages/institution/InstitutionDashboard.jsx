import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
import InstitutionForm from '../../components/InstitutionForm';

import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Building2,
  Settings,
  ArrowLeftFromLine,
  LayersIcon,
  FolderTree,
  Users
} from 'lucide-react';

const InstitutionDashboard = () => {
  const { institutionId } = useParams();
  const [institution, setInstitution] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { role } = useSelector(state => state.auth);

  const fetchInstitution = async () => {
    try {
      const response = await institutionService.getAll();
      const found = response.data.find(inst => inst.id === parseInt(institutionId));
      if (found) {
        setInstitution(found);
      }
    } catch (error) {
      console.error('Error fetching institution:', error);
    }
  };

  useEffect(() => {
    fetchInstitution();
  }, [institutionId]);

  const handleSubmit = async (formData) => {
    try {
      await institutionService.update(institutionId, formData);
      await fetchInstitution();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating institution:', error);
    }
  };

  const navItems = [
    ...(role === 'super_admin'
      ? [{ path: '/dashboard', label: 'Back to Institutions', icon: ArrowLeftFromLine }]
      : []),
    { path: `/institution/${institutionId}/institution`, label: 'Institution Details', icon: Building2 },
    { path: `users`, label: 'Users', icon: Users },
    { path: `levels`, label: 'Levels', icon: LayersIcon },
    { path: `categories`, label: 'Categories', icon: FolderTree },
    { path: `settings`, label: 'Settings', icon: Settings },
  ];

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b border-gray-200 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6 mx-2" />
          {institution ? (
            <h1 className="text-2xl font-bold text-[#0b6085]">{institution.institutionName}</h1>
          ) : (
            <p className="text-gray-500">Loading institution details...</p>
          )}
        </header>

        <main className="p-4 space-y-6">
          <div >
            <Outlet context={{ institution, refreshInstitution: fetchInstitution }} />
          </div>
        </main>

        {isFormOpen && institution && (
          <InstitutionForm
            institution={institution}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default InstitutionDashboard;
