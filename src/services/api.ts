import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Initialize token from localStorage
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors and token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token here if you have a refresh token endpoint
        // const response = await api.post('/auth/refresh');
        // const newToken = response.data.token;
        // localStorage.setItem('token', newToken);
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return api(originalRequest);

        // For now, just clear the token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Reports API
export const reportApi = {
  getAll: async (params?: any) => {
    const response = await api.get('/reports', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await api.post('/reports', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await api.put(`/reports/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
  
  generate: async (id: string) => {
    const response = await api.post(`/reports/${id}/generate`);
    return response.data;
  },
};

// Integrations API
export const integrationApi = {
  getAll: async (params?: any) => {
    const response = await api.get('/integrations', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/integrations/${id}`);
    return response.data;
  },
  
  create: async (data: any) => {
    const response = await api.post('/integrations', data);
    return response.data;
  },
  
  update: async (id: string, data: any) => {
    const response = await api.put(`/integrations/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/integrations/${id}`);
    return response.data;
  },
  
  toggle: async (id: string) => {
    const response = await api.post(`/integrations/${id}/toggle`);
    return response.data;
  },
};

export default api;
