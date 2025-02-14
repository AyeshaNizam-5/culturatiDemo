import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

// Mock user data with institution IDs
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    role: "Content Creator",
    institutionId: 1,
    status: "Active"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane@example.com",
    role: "Editor",
    institutionId: 2,
    status: "Active"
  }
];

const userService = {
  getAll: async (institutionId) => {
    try {
      // Only returns users for the specific institution
      const filteredUsers = mockUsers.filter(user => user.institutionId === parseInt(institutionId));
      return Promise.resolve({ data: filteredUsers });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  create: async (userData, institutionId) => {
    try {
      // Automatically assigns the institution
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        institutionId: parseInt(institutionId),
        status: 'Active'
      };
      mockUsers.push(newUser);
      return Promise.resolve({ data: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  update: async (id, userData, institutionId) => {
    try {
      // Only updates users belonging to the institution
      const index = mockUsers.findIndex(u => u.id === id && u.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...userData };
        return Promise.resolve({ data: mockUsers[index] });
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  delete: async (id, institutionId) => {
    try {
      const index = mockUsers.findIndex(u => u.id === id && u.institutionId === parseInt(institutionId));
      if (index !== -1) {
        mockUsers.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

export default userService;