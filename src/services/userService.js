import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

// Mock user data
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john@example.com",
    role: "Content Creator",
    institution: "National Museum of History",
    status: "Active"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane@example.com",
    role: "Editor",
    institution: "Royal Heritage Castle",
    status: "Active"
  }
];

const userService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get(ENDPOINTS.USERS.GET_ALL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  create: async (userData) => {
    try {
      // Uncomment when backend is ready
      // const response = await api.post('/users', userData);
      // return response.data;
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        status: 'Active'
      };
      mockUsers.push(newUser);
      return Promise.resolve({ data: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  update: async (id, userData) => {
    try {
      // Uncomment when backend is ready
      // const response = await api.put(`/users/${id}`, userData);
      // return response.data;
      const index = mockUsers.findIndex(u => u.id === id);
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

  delete: async (id) => {
    try {
      // Uncomment when backend is ready
      // await api.delete(`/users/${id}`);
      // return true;
      const index = mockUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
        return Promise.resolve({ success: true });
      }
      throw new Error('User not found');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  checkUsername: async (username) => {
    try {
      // Uncomment when backend is ready
      // const response = await api.post('/users/check-username', { username });
      // return response.data;
      const exists = mockUsers.some(u => u.username === username);
      return Promise.resolve({ exists });
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  },

  getRoles: async () => {
    try {
      const response = await api.get(ENDPOINTS.USERS.ROLES);
      return response.data;
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  }
};

// For development only - will be removed in production
if (import.meta.env.DEV) {
  // Mock data here
  const mockUsers = [/* ... */];
  
  // Override methods with mock data in development
  userService.getAll = async () => ({ data: mockUsers });
  // ... other mock method overrides
}

export default userService; 