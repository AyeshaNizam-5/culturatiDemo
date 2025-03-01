import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import userService from '../services/userService';
import { useParams, useOutletContext } from 'react-router-dom';

const Users = () => {
  const { institutionId } = useParams();
  const { institution } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null,
    userName: ''
  });

  const itemsPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, [institutionId]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll(institutionId);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await userService.update(selectedUser.id, formData, institutionId);
      } else {
        await userService.create(formData, institutionId);
      }
      fetchUsers();
      handleCloseForm();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleDeleteClick = (user) => {
    setDeleteDialog({
      isOpen: true,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await userService.delete(deleteDialog.userId, institutionId);
      fetchUsers();
      setDeleteDialog({ isOpen: false, userId: null, userName: '' });
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="min-h-screen bg-[#0f172a] text-white p-8">Loading...</div>;
  if (error) return <div className="min-h-screen bg-[#0f172a] text-white p-8">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
            <p className="text-gray-400">Manage users for {institution.institutionName}</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 
                     rounded-lg transition-colors text-white font-medium shadow-lg"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Institution</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#1a2234] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.institution}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 hover:bg-[#0f172a] rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
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
        <UserForm
          user={selectedUser}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, userId: null, userName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteDialog.userName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Users; 