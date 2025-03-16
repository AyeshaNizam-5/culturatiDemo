import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
import { 
  Gamepad2,
  LayersIcon, 
  Settings, 
  Route,
} from 'lucide-react';
// import { API_BASE_URL } from '../../config/apiConfig';
import AppSidebar  from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import GameForm from './../../components/GameForm'
import { Toaster } from "@/components/ui/sonner"

const ContentCreatorDashboard = () => {
  const navItems = [
    { path: '/dashboard/content-creator', label: 'Main', icon: LayersIcon },
    { path: '/Game', label: 'Game Content', icon: Gamepad2 },
    { path: '/Route', label: 'Route Content', icon: Route },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const { institutionId } = useParams(); 
  const [institution, setInstitution] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchInstitution = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/institutions`);
  //       setInstitution(response.data);
  //     } catch (err) {
  //       console.error('Error fetching institution:', err);
  //       setError('Failed to fetch institution data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInstitution();
  // }, [institutionId]);

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
      <AppSidebar navItems={navItems}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
              {institution ? (
                <>
                  <h1 className="text-2xl font-bold text-[#0b6085]">
                    {institution.institutionName}
                  </h1>
                </>
              ) : (
                <p className="text-gray-500">Loading institution details...</p>
              )}
        
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
       
    
       <div className="mb-6 bg-white p-2 rounded-lg shadow-md border border-gray-300">
         <h2 className="text-lg font-semibold text-[#0b6085] mb-4">
           Select Content Type:
         </h2>
         <div className="flex gap-6">
           {/* Game Content Radio */}
           <label className="flex items-center gap-2 cursor-pointer">
             <input
               type="radio"
               name="contentType"
               value="game"
               checked={selectedContent === 'game'}
               onChange={() => setSelectedContent('game')}
               className="w-5 h-5 accent-[#0b6085]"
             />
             <span className="text-gray-700">Game Content</span>
           </label>

           {/* Route Content Radio */}
           <label className="flex items-center gap-2 cursor-pointer">
             <input
               type="radio"
               name="contentType"
               value="route"
               checked={selectedContent === 'route'}
               onChange={() => setSelectedContent('route')}
               className="w-5 h-5 accent-[#0b6085]"
             />
             <span className="text-gray-700">Route Content</span>
           </label>
         </div>
       </div>
       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
         {selectedContent === 'game' ? (
           <div className="text-center text-[#0b6085] text-lg">
            <Toaster />
            <GameForm/>
           </div>
         ) : selectedContent === 'route' ? (
           <div className="text-center text-[#0b6085] text-lg">Route Content Form Coming Soon...</div>
         ) : (
           <div className="text-center text-gray-500 text-lg">Select a content type to begin.</div>
         )}
       </div>
      </div>
      </SidebarInset>
  </SidebarProvider>
      
  )
}

export default ContentCreatorDashboard