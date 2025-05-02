import api from './api';
import { ENDPOINTS } from '../config/apiConfig';

// Mock user data with institution IDs
const mockUsers = [
  {
    id: 1,
    username: "superadmin",
    password: "superadmin123",
    role: "super_admin",
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah.connor@example.com",
    phone: "+905551234567",
    language: "en"
  },
  {
    id: 2,
    username: "admin",
    password: "admin123",
    role: "admin",
    institutionId: 1,
    firstName: "Ali",
    lastName: "Kaya",
    email: "ali.kaya@example.com",
    phone: "+905554567890",
    language: "tr"
  },
  {
    id: 3,
    username: "creator",
    password: "creator123",
    role: "content_creator",
    institutionId: 1,
    firstName: "Elif",
    lastName: "Demir",
    email: "elif.demir@example.com",
    phone: "+905551112233",
    language: "tr"
  },
  {
    id: 4,
    username: "editor",
    password: "editor123",
    role: "editor",
    institutionId: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+905553334455",
    language: "en"
  },
  {
    id: 5,
    username: "dataentry",
    password: "data123",
    role: "data_entry_operator",
    institutionId: 1,
    firstName: "Ayşe",
    lastName: "Yılmaz",
    email: "ayse.yilmaz@example.com",
    phone: "+905556667788",
    language: "tr"
  },
  {
    id: 6,
    username: "admin2",
    password: "admin123",
    role: "admin",
    institutionId: 2,
    firstName: "Kemal",
    lastName: "Erdoğan",
    email: "kemal.erdogan@example.com",
    phone: "+905558889900",
    language: "tr"
  },
  {
    id: 7,
    username: "creator2",
    password: "creator123",
    role: "content_creator",
    institutionId: 2,
    firstName: "Emma",
    lastName: "Brown",
    email: "emma.brown@example.com",
    phone: "+905552223344",
    language: "en"
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