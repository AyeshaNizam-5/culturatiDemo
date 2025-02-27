// src/pages/Institution/InstitutionDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate, Link } from 'react-router-dom';
import institutionService from '../../services/institutionService';
import InstitutionForm from '../../components/InstitutionForm';

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

  return (
    <div className="min-h-screen p-6 bg-[#f5fafa] text-[#5ec5f1]">
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
  );
};

export default InstitutionDashboard;
