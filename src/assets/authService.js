// src/services/authService.js
import api from './api';
import { ENDPOINTS } from '../config/apiConfig';


const mockUsers = [
  { id: 1, username: "superadmin", password: "superadmin123", role: "super_admin" },
  { id: 2, username: "admin", password: "admin123", role: "admin", institutionId: 1 },
  { id: 3, username: "creator", password: "creator123", role: "content_creator", institutionId: 1  },
  { id: 4, username: "editor", password: "editor123", role: "editor", institutionId: 1 },
  { id: 5, username: "dataentry", password: "data123", role: "data_entry_operator", institutionId: 1 },
  { id: 6, username: "admin2", password: "admin123", role: "admin", institutionId: 2 },
  { id: 7, username: "creator2", password: "creator123", role: "content_creator", institutionId: 2 },
];

const authService = {
  login: async (credentials) => {
    try {

      console.log('Credentials:', credentials);
      // const user = mockUsers.find(
      //   (u) => u.username === credentials.username && u.password === credentials.password
      // );

      // Simulate an API call with axios
      const response = await api.post(`${ENDPOINTS.AUTH.LOGIN}`, credentials);
      console.log('Response:', response);

      if (response.status === 200) {
        const { accessToken, role, ...user } = response.data; // Extract accessToken, role, and other user details
        
        // Normalize role to lowercase
        const normalizedUser = {
          ...user,
          role: role.toLowerCase()
        };

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        return { user: normalizedUser, token: accessToken };
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Normalize role before returning
    if (user && user.role) {
      user.role = user.role.toLowerCase();
    }

    return token ? { user, token } : null;
  }
};

export default authService;
