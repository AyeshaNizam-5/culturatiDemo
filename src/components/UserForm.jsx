import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import institutionService from '../services/institutionService';
import { useSelector } from 'react-redux';

// Modify the role options based on the user's role
const getRoleOptions = (currentUserRole) => {
  const allRoles = [
    { value: "Content Creator", label: "Content Creator" },
    { value: "Editor", label: "Editor" },
    { value: "Data Entry Operator", label: "Data Entry Operator" }
  ];

  // If user is super_admin, add Admin role option
  if (currentUserRole === 'super_admin') {
    allRoles.unshift({ value: "Admin", label: "Admin" });
  }

  return allRoles;
};

const UserForm = ({ user, onClose, onSubmit }) => {
  const { user: currentUser } = useSelector(state => state.auth);
  const [institutions, setInstitutions] = useState([]);
  const [formData, setFormData] = useState(
    user || {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      role: ""
    }
  );
  const [errors, setErrors] = useState({});

  // Get available roles based on current user's role
  const roleOptions = getRoleOptions(currentUser.role);

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
    
    // Prevent admin from assigning admin role
    if (currentUser.role !== 'super_admin' && formData.role === 'Admin') {
      newErrors.role = 'You are not authorized to assign admin role';
    }

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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl border border-[#cde4ed] max-h-[100vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-[#cde4ed]">
          <h2 className="text-xl font-bold text-[#0b6085]">{user ? 'Edit' : 'Create'} User</h2>
          <button onClick={onClose} className="text-[#6193a9] hover:text-[#0b6085]">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6193a9] mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                         focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6193a9] mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                         focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                       focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                       focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {!user && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#6193a9] mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                           focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6193a9] mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                           focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[#6193a9] mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#eff8fb] rounded-lg px-4 py-2 text-[#0b6085] border border-[#cde4ed]
                       focus:outline-none focus:ring-2 focus:ring-[#5ec5f1] focus:border-transparent"
            >
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#eff8fb] hover:bg-[#e0f7fa] text-[#0b6085] rounded-lg transition-colors border border-[#cde4ed]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5ec5f1] hover:bg-[#94d0ea] text-white rounded-lg transition-colors"
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