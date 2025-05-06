export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_TOKEN: '/auth/refresh',
  },
  INSTITUTIONS: {
    BASE: '/institutions',
    GET_ALL: '/institutions',
    GET_BY_ID: `/tenant/institution-details`,
    CREATE: '/institutions',
    UPDATE: (id) => `/institutions/${id}`,
    DELETE: (id) => `/institutions/${id}`,
    TYPES: '/institutions/types',
  },
  USERS: {
    BASE: '/users',
    GET_ALL: '/tenant/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: 'tenant/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    CHECK_USERNAME: '/users/check-username',
    ROLES: '/users/roles',
  },
  CATEGORIES: {
    BASE: '/categories',
    GET_ALL: '/tenant/categories',
    GET_BY_ID: (id) => `/categories/${id}`,
    CREATE: '/tenant/categories',
    UPDATE: (id) => `tenant/categories/${id}`,
    DELETE: (id) => `tenant/categories/${id}`,
  },
  LEVELS: {
    BASE: '/levels',
    GET_ALL: '/tenant/levels',
    GET_BY_ID: (id) => `/levels/${id}`,
    CREATE: '/tenant/levels',
    UPDATE: (id) => `/tenant/levels/${id}`,
    DELETE: (id) => `/tenant/levels/${id}`,
  },
};
