import api from './api';

// Mock user data
const mockUser = {
  id: 1,
  username: "admin",
  password: "admin123", // In real app, never store plain passwords
  role: "admin"
};

const authService = {
  login: async (credentials) => {
    try {
      // Mock authentication
      if (credentials.username === mockUser.username && credentials.password === mockUser.password) {
        const token = "mock-jwt-token";
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { user: mockUser, token };
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
    return !!localStorage.getItem('token');
  }
};

export default authService;