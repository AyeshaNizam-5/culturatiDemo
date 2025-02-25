import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { 
  LogOut
} from 'lucide-react';
import { culturatiLogo } from '../assets';

const Navbar = ({ navItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);

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
    <div className="fixed top-0 left-0 h-screen w-[18%] bg-white shadow-md z-50">
    <nav className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <img src={culturatiLogo} alt="Culturati Logo" className="w-20 mb-2" />
        <h2 className="text-2xl font-bold text-[#60d7f8]">Culturati CMS</h2>
        <span className="text-sm text-gray-500">Role: {role}</span>
      </div>

      <ul className="flex-1 p-4 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-teal-50 hover:text-[#60d7f8] transition ${
                isActiveRoute(path) ? 'bg-teal-50 text-[#60d7f8] ' : ''
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="p-4 border-t border-gray-200">
        <li>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-800 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
);
};

export default Navbar;
