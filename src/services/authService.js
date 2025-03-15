// src/services/authService.js

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
      const user = mockUsers.find(
        (u) => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        const token = "mock-jwt-token";
        
        // Normalize role to lowercase before storing
        const normalizedUser = {
          ...user,
          role: user.role.toLowerCase()
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        return { user: normalizedUser, token };
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
