import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import CategoryForm from '../components/CreateCategoryForm';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import { useParams, useOutletContext } from 'react-router-dom';
// import categoryService from '../services/categoryService';

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

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Art', description: 'All about art' },
    { id: 2, name: 'History', description: 'Historical events and figures' },
    { id: 3, name: 'Science', description: 'Scientific discoveries and facts' }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    categoryId: null,
    categoryName: ''
  });
  
  const itemsPerPage = 5;

  const { institutionId } = useParams();
  const { institution } = useOutletContext();

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll(institutionId);
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category) => {
    setDeleteDialog({
      isOpen: true,
      categoryId: category.id,
      categoryName: category.name
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await categoryService.delete(deleteDialog.categoryId, institutionId);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
    setDeleteDialog({ isOpen: false, categoryId: null, categoryName: '' });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const filteredCategories = categories.filter(category =>
    `${category.name} ${category.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await categoryService.update(selectedCategory.id, formData, institutionId);
      } else {
        await categoryService.create(formData, institutionId);
      }
      fetchCategories();
      handleCloseForm();
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0b6085] mb-2">Categories</h1>
            <p className="text-[#6193a9]">Manage system categories</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-[#5ec5f1] hover:bg-[#94d0ea] px-4 py-2 
                     rounded-lg transition-colors text-white font-medium"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6193a9]" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#eff8fb] rounded-lg text-[#0b6085] 
                     placeholder:text-[#88b8c4] border border-[#cde4ed] 
                     focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
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
            {paginatedCategories.map((category) => (
              <tr key={category.id} className="hover:bg-[#f9fafa] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#6193a9]">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 hover:bg-[#eff8fb] rounded-lg transition-colors text-[#5ec5f1]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
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
        <CategoryForm
          category={selectedCategory}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, categoryId: null, categoryName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete ${deleteDialog.categoryName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Categories;
