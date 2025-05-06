import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
import {
  Gamepad2,
  LayersIcon,
  Settings,
  Route,
  Building2,
  BookA,
} from 'lucide-react';

import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import RouteStartInfo from '@/components/RouteStartInfo';
import GameStartInfo from '@/components/GameStartInfo';
import InstitutionImages from '@/components/InstitutionImages';

const DataEntryDashboard = () => {
  const navItems = [
    { path: '/dashboard/data-entry-operator', label: 'Main', icon: LayersIcon },
    { path: '/dashboard/data-entry-operator/AboutInstitution', label: 'Institution Information', icon: Building2 },
    { path: '/dashboard/data-entry-operator/Items', label: 'Items', icon: BookA },
    { path: '/dashboard/data-entry-operator/settings', label: 'Settings', icon: Settings },
  ];

  const { institutionId } = useParams();
  const [institution, setInstitution] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isMainPage = location.pathname === "/dashboard/data-entry-operator";

  const [expanded, setExpanded] = useState(null);
  const handleExpand = (section) => {
    setExpanded(prev => (prev === section ? null : section));
  };

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

        <div className="p-4">
          {isMainPage ? (
            <div className="space-y-4">
              <RouteStartInfo
                isExpanded={expanded === 'route'}
                onExpand={() => handleExpand('route')}
              />
              <GameStartInfo
                isExpanded={expanded === 'game'}
                onExpand={() => handleExpand('game')}
              />
              <InstitutionImages
                isExpanded={expanded === 'images'}
                onExpand={() => handleExpand('images')}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DataEntryDashboard;
