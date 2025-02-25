const mockUsers = [
  { id: 1, username: "superadmin", password: "superadmin123", role: "super_admin" },
  { id: 2, username: "admin", password: "admin123", role: "admin" },
  { id: 3, username: "creator", password: "creator123", role: "content_creator" },
  { id: 4, username: "editor", password: "editor123", role: "editor" },
  { id: 5, username: "dataentry", password: "data123", role: "data_entry_operator" }
];

const authService = {
  login: async (credentials) => {
    try {
      
      const user = mockUsers.find(
        (u) => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        const token = "mock-jwt-token";
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { user, token };
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
    return token ? { user, token } : null;
  }
};

export default authService;
