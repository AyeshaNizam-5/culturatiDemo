import React from 'react'
import { 
  Gamepad2,
  LayersIcon, 
  Settings, 
  Route,
} from 'lucide-react';
import Navbar from '../../components/Navbar';


const ContentCreatorDashboard = () => {
  const navItems = [
    { path: '/dashboard', label: 'Main', icon: LayersIcon },
    { path: '/Game', label: 'Game Content', icon: Gamepad2 },
    { path: '/Route', label: 'Route Content', icon: Route },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="flex">
      <Navbar navItems={navItems} />
      <div className="flex-1 ml-[18%] bg-gray-50 p-6 overflow-auto">
       Content Creator Main Page
      </div>
    </div>
  )
}

export default ContentCreatorDashboard