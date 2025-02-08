import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import InstitutionForm from '../components/InstitutionForm';
import InstitutionFilters from '../components/InstitutionFilters';
import Pagination from '../components/Pagination';
import institutionService from '../services/institutionService';
import ConfirmDialog from '../components/ConfirmDialog';

const InstitutionCard = ({ institution, onEdit, onDelete }) => (
  <div className="bg-[#1e293b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-800">
    {/* Institution Image */}
    <div className="h-48 bg-[#0f172a] relative">
      <img 
        src={institution.image} 
        alt={institution.institutionName}
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
    </div>

    {/* Institution Details */}
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-[#0f172a] rounded-lg overflow-hidden shadow-md border border-gray-800">
          <img 
            src={institution.logo}
            alt={`${institution.institutionName} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{institution.institutionName}</h3>
          <p className="text-gray-400 text-sm">{institution.institutionCode}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
          {institution.type}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(institution)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button 
          onClick={() => onDelete(institution)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  </div>
);

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    institutionId: null,
    institutionName: ''
  });

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      const response = await institutionService.getAll();
      setInstitutions(response.data);
    } catch (err) {
      setError('Failed to fetch institutions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search logic
  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.institutionName.toLowerCase().includes(search.toLowerCase()) ||
                         institution.institutionCode.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || institution.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const paginatedInstitutions = filteredInstitutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (formData) => {
    try {
      if (selectedInstitution) {
        await institutionService.update(selectedInstitution.id, formData);
      } else {
        await institutionService.create(formData);
      }
      fetchInstitutions();
      handleCloseForm();
    } catch (err) {
      console.error('Error saving institution:', err);
      // Here you might want to show an error message to the user
    }
  };

  const handleDeleteClick = (institution) => {
    setDeleteDialog({
      isOpen: true,
      institutionId: institution.id,
      institutionName: institution.institutionName
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await institutionService.delete(deleteDialog.institutionId);
      fetchInstitutions();
      setDeleteDialog({ isOpen: false, institutionId: null, institutionName: '' });
    } catch (err) {
      console.error('Error deleting institution:', err);
      // Here you might want to show an error message to the user
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, institutionId: null, institutionName: '' });
  };

  const handleEdit = (institution) => {
    setSelectedInstitution(institution);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedInstitution(null);
    setIsFormOpen(false);
  };

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[200px] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cultural Institutions</h1>
            <p className="text-gray-400">Manage museums, heritage sites, and cultural venues</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg 
                     transition-colors text-white font-medium shadow-lg"
          >
            <Plus size={20} />
            Add Institution
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="mt-6">
          <InstitutionFilters
            search={search}
            onSearchChange={setSearch}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
          />
        </div>
      </div>

      {/* Grid of Institutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedInstitutions.map((institution) => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Modals */}
      {isFormOpen && (
        <InstitutionForm
          institution={selectedInstitution}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Institution"
        message={`Are you sure you want to delete ${deleteDialog.institutionName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Institutions; 