// src/services/authService.js

import { ENDPOINTS } from "../config/apiConfig";
import api from "./api";

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


const authService = {
  login: async (credentials) => {
    try {
      // const user = mockUsers.find(
      //   (u) => u.username === credentials.username && u.password === credentials.password
      // );

      // if (user) {
      //   const token = "mock-jwt-token";
      //   const normalizedUser = {
      //     ...user,
      //     role: user.role.toLowerCase()
      //   };

      //   localStorage.setItem('token', token);
      //   localStorage.setItem('user', JSON.stringify(normalizedUser));
        
      //   return { user: normalizedUser, token };
      // }

      const response = await api.post(`${ENDPOINTS.AUTH.LOGIN}`, credentials);
      console.log('Response:', response);

      if (response.status === 200) {
        const { accessToken, role, ...user } = response.data; // Extract accessToken, role, and other user details
        
        // Normalize role to lowercase
        const normalizedUser = {
          ...user,
          role: role.toLowerCase()
        };
        console.log('Normalized User:', normalizedUser);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        
        return { user: normalizedUser, token: accessToken };
      }
      // If the response is not 200, handle the error accordingly
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (id) => {
    const user = JSON.parse(localStorage.getItem('user')).username;
    console.log('User:', user);
    const refreshToken = await api.post(`${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
      username: user,
      institutionId: id,
    });
    console.log('Response Token:', refreshToken);
    localStorage.setItem('token', refreshToken.data);
    return refreshToken.data;
  },


  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      user.role = user.role.toLowerCase();
    }

    return token ? { user, token } : null;
  }
};

export default authService;
