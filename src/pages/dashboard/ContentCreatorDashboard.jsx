import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
// For API integration - uncomment these imports when connecting to the backend
// import axios from 'axios';
// import { API_BASE_URL } from '../../config/apiConfig';
import { 
  Gamepad2,
  LayersIcon, 
  Settings, 
  Route,
} from 'lucide-react';
import AppSidebar  from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import GameForm from './../../components/GameForm'
import { Toaster } from "@/components/ui/sonner"
import RouteForm from './../../components/RouteForm'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const ContentCreatorDashboard = () => {
  const navItems = [
    { path: '/dashboard/content-creator', label: 'Main', icon: LayersIcon },
    { path: '/dashboard/content-creator/Game', label: 'Game Content', icon: Gamepad2 },
    { path: '/dashboard/content-creator/Route', label: 'Route Content', icon: Route },
    { path: '/dashboard/content-creator/settings', label: 'Settings', icon: Settings },
  ];

  const { institutionId } = useParams(); 
  const [institution, setInstitution] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();  
  const isMainPage = location.pathname === "/dashboard/content-creator"; 

  // Enhanced API integration for fetching institution (uncomment when connecting to backend)
  // useEffect(() => {
  //   const fetchInstitution = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       
  //       // If we have a specific institutionId from URL params, use that
  //       // Otherwise use the current user's institutionId
  //       const targetInstitutionId = institutionId || user?.institutionId;
  //       
  //       if (!targetInstitutionId) {
  //         throw new Error('No institution ID available');
  //       }
  //       
  //       const response = await axios.get(`${API_BASE_URL}/institutions/${targetInstitutionId}`);
  //       setInstitution(response.data);
  //     } catch (err) {
  //       console.error('Error fetching institution:', err);
  //       setError('Failed to fetch institution data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchInstitution();
  // }, [institutionId, user]);

  // Current mock implementation using institutionService
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
  }, [institutionId, user.institutionId]);
  
  return (
    
    <SidebarProvider>
      <AppSidebar navItems={navItems}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
              {institution ? (
                <>
                  <h1 className="text-2xl font-bold text-primary truncate">
                    {institution.institutionName}
                  </h1>
                </>
              ) : (
                <p className="text-muted-foreground">Loading institution details...</p>
              )}
        
        </header>
        {isMainPage && (
          <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 pt-0">
          
          <div className="mb-6 bg-card p-3 sm:p-4 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Select Content Type:
            </h2>
            <RadioGroup
              value={selectedContent}
              onValueChange={setSelectedContent}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="game" id="game" />
                <Label htmlFor="game" className="text-foreground">Game Content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="route" id="route" />
                <Label htmlFor="route" className="text-foreground">Route Content</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-card p-3 sm:p-6 rounded-lg shadow-sm border">
            {selectedContent === 'game' ? (
              <div className="text-primary">
                <Toaster />
                <GameForm/>
              </div>
            ) : selectedContent === 'route' ? (
              <div className="text-primary">
                <Toaster />
                <RouteForm/>
              </div>
            ) : (
              <div className="text-center text-muted-foreground text-lg">Select a content type to begin.</div>
            )}
          </div>
          </div>)}
          <div className="p-3 sm:p-4">
            <Outlet />
          </div>
    </SidebarInset>
  </SidebarProvider>
      
  )
}

export default ContentCreatorDashboard