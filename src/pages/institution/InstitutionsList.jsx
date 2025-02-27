import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import InstitutionForm from '../../components/InstitutionForm';
import InstitutionFilters from '../../components/InstitutionFilters';
import Pagination from '../../components/Pagination';
import institutionService from '../../services/institutionService';
import ConfirmDialog from '../../components/ConfirmDialog';

const InstitutionCard = ({ institution, onDelete, onSelect }) => (
  <div 
    onClick={() => onSelect(institution)}
    className="bg-[#e5e8ee] rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
              transition-all transform hover:-translate-y-1 border border-gray-800 cursor-pointer"
  >
    <div className="h-35  bg-[#dbdfe8] relative">
      <img 
        src={institution.image} 
        alt={institution.institutionName}
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#93d4e7] to-transparent" />
    </div>

    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-[#dfe4f1] rounded-lg overflow-hidden shadow-md border border-gray-800">
          <img 
            src={institution.logo}
            alt={`${institution.institutionName} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-black">{institution.institutionName}</h3>
          <p className="text-gray-400 text-sm">{institution.institutionCode}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-[#ffffff] text-[#5ec5f1] rounded-full text-sm font-medium">
          {institution.type}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(institution);
          }}
          className="p-2 hover:bg-[#c49782] rounded-lg transition-colors text-red-400 hover:text-red-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

const InstitutionsList = () => {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
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

  const handleSelectInstitution = (institution) => {
    navigate(`/institution/${institution.id}/institution`);
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
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedInstitution(null);
  };

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
    }
  };

  // Filter institutions based on search and type filter
  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.institutionName.toLowerCase().includes(search.toLowerCase()) ||
                         institution.institutionCode.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || institution.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutions.length / itemsPerPage);
  const paginatedInstitutions = filteredInstitutions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="min-h-screen bg-[#e2e5ec] text-[#5ec5f1] p-8">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#e2e5ec] text-[#5ec5f1] p-8">Error: {error}</div>;

  return (
    <div className="min-h-screen h-full w-full bg-[#f5fafa] text-[#5ec5f1] p-8">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-[#f3f3f3] rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#5ec5f1] mb-2">Cultural Institutions</h1>
              <p className="text-[#6193a9]">Select an institution to manage its content</p>
            </div>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-[#a6eef0] px-4 py-2 rounded-lg 
                       transition-colors text-[#70b5d2] font-medium shadow-lg"
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
              onDelete={handleDeleteClick}
              onSelect={handleSelectInstitution}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
          onClose={() => setDeleteDialog({ isOpen: false, institutionId: null, institutionName: '' })}
          onConfirm={handleDeleteConfirm}
          title="Delete Institution"
          message={`Are you sure you want to delete ${deleteDialog.institutionName}? This action cannot be undone.`}
        />
      </div>
    </div>
  );
};

export default InstitutionsList; 