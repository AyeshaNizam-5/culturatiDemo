import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import institutionService from '../services/institutionService';
import InstitutionForm from '../components/InstitutionForm';

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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          {institution.institutionName}
        </h1>
        <p className="text-gray-400">{institution.institutionCode}</p>
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