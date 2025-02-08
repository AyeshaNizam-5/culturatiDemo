import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { 
  Building2, 
  Users, 
  Package, 
  LayersIcon, 
  FolderTree, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { culturatiLogo } from '../assets';
import styles from './Dashboard.module.css';

const navItems = [
  { path: '/institutions', label: 'Institutions', icon: Building2 },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/levels', label: 'Levels', icon: LayersIcon },
  { path: '/categories', label: 'Categories', icon: FolderTree },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Dashboard = ({ children }) => {
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

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={culturatiLogo} alt="Culturati Logo" />
          <h2>Culturati</h2>
        </div>
        <ul className={styles.navList}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${styles.navLink} ${
                  location.pathname === path ? styles.active : ''
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