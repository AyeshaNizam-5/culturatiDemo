import React from 'react';
import Navbar from '../../components/Navbar';
import { Building2, Settings, ArrowLeftFromLine } from 'lucide-react';
import InstitutionsList from '../institution/InstitutionsList';

const navItems = [
  { path: '/dashboard', label: 'Institutions', icon: Building2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const SuperAdminDashboard = ({children}) => {
  return (
    <div className="flex">
      <Navbar navItems={navItems} />
      <div className="flex-1 ml-[18%] bg-gray-50 p-6 overflow-auto">
        <InstitutionsList/>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
