import React from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { 
  Users, 
  LayersIcon, 
  FolderTree, 
  Settings, 
  LogOut,
  ArrowLeft,
  Building2
} from 'lucide-react';
import { culturatiLogo } from '../assets';
import styles from './Dashboard.module.css';

const Dashboard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { institutionId } = useParams();

  const navItems = [
    { path: `institution`, label: 'Institution', icon: Building2 },
    { path: `users`, label: 'Users', icon: Users },
    { path: `levels`, label: 'Levels', icon: LayersIcon },
    { path: `categories`, label: 'Categories', icon: FolderTree },
    { path: `settings`, label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActiveRoute = (path) => {
    const currentPath = location.pathname;
    const fullPath = `/institution/${institutionId}/${path}`;
    return currentPath === fullPath;
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={culturatiLogo} alt="Culturati Logo" />
          <h2>Culturati</h2>
        </div>

        <button 
          onClick={() => navigate('/institutions')}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Back to Institutions
        </button>

        <ul className={styles.navList}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={`/institution/${institutionId}/${path}`}
                className={`${styles.navLink} ${
                  isActiveRoute(path) ? styles.active : ''
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={20} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Dashboard; 