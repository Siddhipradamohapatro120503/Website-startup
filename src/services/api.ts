import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// Add interceptors for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., show toast notifications)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
