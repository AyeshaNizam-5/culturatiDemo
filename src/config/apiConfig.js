export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  INSTITUTIONS: {
    BASE: '/institutions',
    GET_ALL: '/institutions',
    GET_BY_ID: (id) => `/institutions/${id}`,
    CREATE: '/institutions',
    UPDATE: (id) => `/institutions/${id}`,
    DELETE: (id) => `/institutions/${id}`,
    TYPES: '/institutions/types', // For getting institution types from backend
  },
  USERS: {
    BASE: '/users',
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    CHECK_USERNAME: '/users/check-username',
    ROLES: '/users/roles', // For getting user roles from backend
  }
};
