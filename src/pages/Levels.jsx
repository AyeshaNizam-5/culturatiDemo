import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import LevelForm from '../components/CreateLevelForm';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import { useParams, useOutletContext } from 'react-router-dom';
// import levelService from '../services/levelService';

// Use the same color scheme
const COLORS = {
  primary: '#5ec5f1',
  secondary: '#94d0ea',
  accent: '#0b6085',
  background: {
    card: '#eff8fb',
    white: '#ffffff'
  },
  text: {
    primary: '#0b6085',
    secondary: '#6193a9',
    light: '#88b8c4'
  },
  border: '#cde4ed'
};

const Levels = () => {
  const [levels, setLevels] = useState([
    { id: 1, name: 'Beginner', description: 'For new learners' },
    { id: 2, name: 'Intermediate', description: 'For experienced learners' },
    { id: 3, name: 'Expert', description: 'For advanced learners' }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    levelId: null,
    levelName: ''
  });
  
  const itemsPerPage = 5;

  const { institutionId } = useParams();
  const { institution } = useOutletContext();

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await categoryService.getAll();
  //     setCategories(response.data);
  //   } catch (err) {
  //     console.error('Failed to fetch categories:', err);
  //   }
  // };

  const handleEdit = (level) => {
    setSelectedLevel(level);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (level) => {
    setDeleteDialog({
      isOpen: true,
      levelId: level.id,
      levelName: level.name
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await levelService.delete(deleteDialog.levelId, institutionId);
      fetchLevels();
    } catch (err) {
      console.error('Error deleting level:', err);
    }
    setDeleteDialog({ isOpen: false, levelId: null, levelName: '' });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedLevel(null);
  };

  const filteredLevels = levels.filter(level =>
    `${level.name} ${level.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLevels.length / itemsPerPage);
  const paginatedLevels = filteredLevels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (formData) => {
    try {
      if (selectedLevel) {
        await levelService.update(selectedLevel.id, formData, institutionId);
      } else {
        await levelService.create(formData, institutionId);
      }
      fetchLevels();
      handleCloseForm();
    } catch (err) {
      console.error('Error saving level:', err);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await levelService.getAll(institutionId);
      setLevels(response.data);
    } catch (err) {
      console.error('Failed to fetch levels:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0b6085] mb-2">Levels</h1>
            <p className="text-[#6193a9]">Manage system levels</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-[#5ec5f1] hover:bg-[#94d0ea] px-4 py-2 
                     rounded-lg transition-colors text-white font-medium"
          >
            <Plus size={20} />
            Add Level
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6193a9]" size={20} />
          <input
            type="text"
            placeholder="Search levels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] 
                     placeholder:text-[#88b8c4] border border-[#cde4ed] 
                     focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
          />
        </div>
      </div>

      <div className="border border-[#cde4ed] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#eff8fb] border-b border-[#cde4ed]">
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cde4ed]">
            {paginatedLevels.map((level) => (
              <tr key={level.id} className="hover:bg-[#f9fafa] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">{level.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#6193a9]">{level.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(level)}
                      className="p-2 hover:bg-[#eff8fb] rounded-lg transition-colors text-[#5ec5f1]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(level)}
                      className="p-2 hover:bg-[#eff8fb] rounded-lg transition-colors text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {isFormOpen && (
        <LevelForm
          level={selectedLevel}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, levelId: null, levelName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Level"
        message={`Are you sure you want to delete ${deleteDialog.levelName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Levels;
