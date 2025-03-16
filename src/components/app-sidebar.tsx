import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import { LucideIcon } from "lucide-react";
import { culturatiLogo } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { 
  LogOut
} from 'lucide-react';

type NavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

interface SidebarProps {
  navItems: NavItem[];
  label?: string;
}


const AppSidebar: React.FC<SidebarProps> = ({ navItems}) => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActiveRoute = (path) => location.pathname === path;
  return (
    <Sidebar className="border-none ">
      <SidebarHeader>
        <div className="p-2 mb-3 flex items-center gap-6 relative">
          <img src={culturatiLogo} alt="Culturati Logo" className="w-14 h-14 rounded-full shadow-md" />
          <div className="absolute left-18 top-1/2 transform -translate-y-1/2">
            <h2 className="text-l font-bold text-[#60d7f8]">Culturati CMS</h2>
            <span className="text-sm text-gray-500">Role: {role}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-[#60d7f8] transition ${
                  isActiveRoute(item.path) ? 'bg-teal-50 text-[#60d7f8] ' : ''
              }`}>
                    <a href={item.path} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenuButton 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-800 transition"
          >
            <LogOut size={20} />
            Logout
          </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
