// import React, { useState, useEffect } from 'react';
// import { Plus, Pencil, Trash2, Search } from 'lucide-react';
// import CategoryForm from '../components/CreateCategoryForm';
// import Pagination from '../components/Pagination';
// import ConfirmDialog from '../components/ConfirmDialog';
// import categoryService from '../services/categoryService';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [deleteDialog, setDeleteDialog] = useState({
//     isOpen: false,
//     categoryId: null,
//     categoryName: ''
//   });

//   const itemsPerPage = 8;

//   // useEffect(() => {
//   //   fetchCategories();
//   // }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await categoryService.getAll();
//       setCategories(response.data);
//     } catch (err) {
//       setError('Failed to fetch categories');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (formData) => {
//     try {
//       if (selectedCategory) {
//         await categoryService.update(selectedCategory.id, formData);
//       } else {
//         await categoryService.create(formData);
//       }
//       fetchCategories();
//       handleCloseForm();
//     } catch (err) {
//       console.error('Error saving category:', err);
//     }
//   };

//   const handleDeleteClick = (category) => {
//     setDeleteDialog({
//       isOpen: true,
//       categoryId: category.id,
//       categoryName: category.name
//     });
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await categoryService.delete(deleteDialog.categoryId);
//       fetchCategories();
//       setDeleteDialog({ isOpen: false, categoryId: null, categoryName: '' });
//     } catch (err) {
//       console.error('Error deleting category:', err);
//     }
//   };

//   const handleEdit = (category) => {
//     setSelectedCategory(category);
//     setIsFormOpen(true);
//   };

//   const handleCloseForm = () => {
//     setSelectedCategory(null);
//     setIsFormOpen(false);
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//   const paginatedCategories = filteredCategories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // if (loading) return <div className="min-h-screen bg-[#0f172a] text-white p-8">Loading...</div>;
//   // if (error) return <div className="min-h-screen bg-[#0f172a] text-white p-8">Error: {error}</div>;

//   return (
//     <div className="space-y-8">
//       <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-800">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
//             <p className="text-gray-400">Manage content categories</p>
//           </div>
//           <button 
//             onClick={() => setIsFormOpen(true)}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 
//                      rounded-lg transition-colors text-white font-medium shadow-lg"
//           >
//             <Plus size={20} />
//             Add Category
//           </button>
//         </div>

//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] rounded-lg text-white 
//                      placeholder:text-gray-400 border border-gray-700 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-gray-800">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-[#0f172a] border-b border-gray-700">
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Desccription</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {paginatedCategories.map((category) => (
//                 <tr key={category.id} className="hover:bg-[#1a2234] transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap text-white">
//                     {category.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(category)}
//                         className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors text-blue-400 hover:text-blue-300"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(category)}
//                         className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors text-red-400 hover:text-red-300"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}

//       {isFormOpen && (
//         <CategoryForm
//           category={selectedCategory}
//           onClose={handleCloseForm}
//           onSubmit={handleSubmit}
//         />
//       )}

//       <ConfirmDialog
//         isOpen={deleteDialog.isOpen}
//         onClose={() => setDeleteDialog({ isOpen: false, categoryId: null, categoryName: '' })}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Category"
//         message={`Are you sure you want to delete ${deleteDialog.categoryName}? This action cannot be undone.`}
//       />
//     </div>
//   );
// };

// export default Categories;


import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import CategoryForm from '../components/CreateCategoryForm';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';

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

  const handleDeleteConfirm = () => {
    setCategories(categories.filter(cat => cat.id !== deleteDialog.categoryId));
    setDeleteDialog({ isOpen: false, categoryId: null, categoryName: '' });
  };

  const handleCloseForm = () => {
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  const filteredCategories = categories.filter(category =>
    `${category.name} ${category.description}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
            <p className="text-gray-400">Manage system categories</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 
                     rounded-lg transition-colors text-white font-medium shadow-lg"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] rounded-lg text-white 
                     placeholder:text-gray-400 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0f172a] border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-[#1a2234] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors text-red-400 hover:text-red-300"
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

