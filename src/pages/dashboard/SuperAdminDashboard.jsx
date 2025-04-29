import React from 'react';
import { useSelector } from 'react-redux';


import { 
  Building2, 
  Settings 
} from 'lucide-react';

import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import InstitutionsList from "../institution/InstitutionsList";

const navItems = [
  { path: '/dashboard', label: 'Institutions', icon: Building2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const SuperAdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-2xl font-bold text-[#0b6085]">
            Welcome, {user?.username || "Super Admin"}
          </h1>
        </header>

        <div className="p-4">
          <InstitutionsList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SuperAdminDashboard;
