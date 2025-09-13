import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, remove it
      Cookies.remove('access_token');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  googleLogin: async (token: string) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },
};

// Users API functions
export const usersApi = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<{ name: string; email: string }>) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};