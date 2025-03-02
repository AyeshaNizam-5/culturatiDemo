import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import institutionService from '../../services/institutionService';
import InstitutionForm from '../../components/InstitutionForm';
import Navbar from '../../components/Navbar';
import { Building2, Settings, ArrowLeftFromLine, LayersIcon, FolderTree, Users } from 'lucide-react';

// Define color constants
const COLORS = {
  primary: '#5ec5f1', // Logo blue
  secondary: '#94d0ea', // Lighter blue
  accent: '#0b6085', // Dark blue
  background: {
    gradient: 'bg-[linear-gradient(90deg,#f9fafa_0%,#e8f3f7_30%,#cde4ed_60%,#b5dbe3_100%)]',
    card: '#eff8fb', // Light blue background for cards
    white: '#ffffff'
  },
  text: {
    primary: '#0b6085', // Dark blue for primary text
    secondary: '#6193a9', // Muted blue for secondary text
    light: '#88b8c4' // Light blue for tertiary text
  },
  border: '#cde4ed' // Border color
};

const InstitutionDashboard = () => {
  const { institutionId } = useParams();
  const [institution, setInstitution] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { role } = useSelector(state => state.auth);

  const fetchInstitution = async () => {
    try {
      const response = await institutionService.getAll();
      const found = response.data.find(inst => inst.id === parseInt(institutionId));
      if (found) {
        setInstitution(found);
      } else {
        navigate('/institutions');
      }
    } catch (error) {
      console.error('Error fetching institution:', error);
      navigate('/institutions');
    }
  };

  useEffect(() => {
    fetchInstitution();
  }, [institutionId]);

  const handleSubmit = async (formData) => {
    try {
      await institutionService.update(institution.id, formData);
      await fetchInstitution();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating institution:', error);
    }
  };

  const getNavItems = () => {
    const items = [
      { path: `/institution/${institutionId}/institution`, label: 'Institution Details', icon: Building2 },
      { path: `users`, label: 'Users', icon: Users },
      { path: `levels`, label: 'Levels', icon: LayersIcon },
      { path: `categories`, label: 'Categories', icon: FolderTree },
      { path: `settings`, label: 'Settings', icon: Settings },
    ];

    if (role === 'super_admin') {
      items.unshift({ 
        path: '/dashboard', 
        label: 'Back to Institutions', 
        icon: ArrowLeftFromLine 
      });
    }

    return items;
  };

  const navItems = getNavItems();

  if (!institution) {
    return (
      <div className={`min-h-screen ${COLORS.background.gradient} flex items-center justify-center`}>
        <div className="text-xl font-semibold text-[#0b6085]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Navbar navItems={navItems} />
      <div className={`flex-1 ml-[18%] ${COLORS.background.gradient} p-6 overflow-auto`}>
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-[#cde4ed]">
          <h1 className="text-3xl font-bold text-[#0b6085]">
            {institution.institutionName}
          </h1>
          <p className="text-[#6193a9] mt-2">
            {institution.institutionCode}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 mb-8">
          <Link
            to="institution"
            className="px-4 py-2 bg-white hover:bg-[#e0f7fa] text-[#0b6085] rounded-lg 
                     shadow-sm border border-[#cde4ed] transition-colors duration-200"
          >
            Details
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#cde4ed] p-6">
          <Outlet context={{ institution, refreshInstitution: fetchInstitution }} />
        </div>

        {/* Edit Institution Modal */}
        {isFormOpen && (
          <InstitutionForm
            institution={institution}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default InstitutionDashboard;
