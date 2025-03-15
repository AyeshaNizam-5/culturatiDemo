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
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0b6085] mb-2">Users</h1>
            <p className="text-[#6193a9]">Manage users for {institution.institutionName}</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-[#5ec5f1] hover:bg-[#94d0ea] px-4 py-2 
                     rounded-lg transition-colors text-white font-medium"
          >
            <Plus size={20} />
            Add User
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6193a9]" size={20} />
          <input
            type="text"
            placeholder="Search users..."
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Username</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Institution</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0b6085]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#cde4ed]">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#f9fafa] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-[#e0f7fa] text-[#0b6085] rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#0b6085]">{institution.institutionName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 hover:bg-[#eff8fb] rounded-lg transition-colors text-[#5ec5f1]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
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