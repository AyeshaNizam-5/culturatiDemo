import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
import {
  Gamepad2,
  LayersIcon,
  Settings,
  Route,
} from 'lucide-react';
import AppSidebar from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import EditorContentList from '@/components/EditorContentList'; // ✅ import your new component

const EditorDashboard = () => {
  const navItems = [
    { path: '/dashboard/editor', label: 'Main', icon: LayersIcon },
    { path: '/dashboard/editor/Game', label: 'Game Content', icon: Gamepad2 },
    { path: '/dashboard/editor/Route', label: 'Route Content', icon: Route },
    { path: '/dashboard/editor/settings', label: 'Settings', icon: Settings },
  ];

  const { institutionId } = useParams();
  const [institution, setInstitution] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isMainPage = location.pathname === "/dashboard/editor";

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await institutionService.getAll();
        const found = response.data.find(inst => inst.id === user.institutionId);
        if (found) {
          setInstitution(found);
        }
      } catch (error) {
        console.error('Error fetching institution:', error);
      }
    };

    fetchInstitution();
  }, [institutionId]);

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {institution ? (
            <h1 className="text-2xl font-bold text-[#0b6085]">
              {institution.institutionName}
            </h1>
          ) : (
            <p className="text-gray-500">Loading institution details...</p>
          )}
        </header>

        {isMainPage && (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Toaster />
            <EditorContentList /> {/* ✅ Renders the new list component */}
          </div>
        )}

        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default EditorDashboard;
