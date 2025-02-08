import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import institutionService from '../services/institutionService';

const UserForm = ({ user, onClose, onSubmit }) => {
  const [institutions, setInstitutions] = useState([]);
  const [formData, setFormData] = useState(
    user || {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      role: "",
      institution: ""
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await institutionService.getAll();
        setInstitutions(response.data);
      } catch (err) {
        console.error('Error fetching institutions:', err);
      }
    };
    fetchInstitutions();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!user && !formData.password) newErrors.password = 'Password is required';
    if (!user && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.institution) newErrors.institution = 'Institution is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1e293b] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {user ? 'Edit User' : 'Create User'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {!user && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Role</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Editor">Editor</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Institution</label>
            <select
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full bg-[#0f172a] rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Institution</option>
              {institutions.map(inst => (
                <option key={inst.id} value={inst.institutionName}>
                  {inst.institutionName}
                </option>
              ))}
            </select>
            {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {user ? 'Update' : 'Create'} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm; 