import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate, Link } from 'react-router-dom';
import institutionService from '../../services/institutionService';
import InstitutionForm from '../../components/InstitutionForm';
import Navbar from '../../components/Navbar';
import { Building2, Settings, ArrowLeftFromLine,LayersIcon,FolderTree, Users } from 'lucide-react';

const InstitutionDashboard = () => {
  const { institutionId } = useParams();
  const [institution, setInstitution] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

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

  if (!institution) {
    return <div>Loading...</div>;
  }
  const navItems = [
    { path: '/dashboard', label: 'Back to Institutions', icon: ArrowLeftFromLine },
    { path: `/institution/${institutionId}/institution`, label: 'Insitution Details', icon: Building2 },
    { path: `users`, label: 'Users', icon: Users },
    { path: `levels`, label: 'Levels', icon: LayersIcon },
    { path: `categories`, label: 'Categories', icon: FolderTree },
    { path: `settings`, label: 'Settings', icon: Settings },
  ];

  

  return (
    <div className="flex">
        <Navbar navItems={navItems} />
    <div className="flex-1 ml-[18%] bg-gray-50 p-6 overflow-auto  text-[#5ec5f1]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{institution.institutionName}</h1>
        <p className="text-gray-400">{institution.institutionCode}</p>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 mb-8">
        <Link
          to="institution"
          className="px-4 py-2 bg-white hover:bg-[#e0f7fa] text-[#5ec5f1] rounded-lg shadow"
        >
          Details
        </Link>
        {/* Add more navigation links here if needed */}
      </div>

      <Outlet context={{ institution, refreshInstitution: fetchInstitution }} />

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
