import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'freelancer';
  avatar?: string;
  // Freelancer specific fields
  title?: string;
  skills?: Array<{ name: string; level: number }>;
  bio?: string;
  phone?: string;
  location?: string;
  hourlyRate?: number;
  availability?: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isFreelancer: boolean;
  login: (email: string, password: string) => Promise<'admin' | 'user' | 'freelancer'>;
  freelancerLogin: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<'admin' | 'user' | 'freelancer'>;
  freelancerRegister: (freelancerData: FreelancerRegistrationData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  getCurrentUser: () => Promise<User>;
}

interface FreelancerRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  skills: Array<{ name: string; level: number }>;
  bio: string;
  hourlyRate: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await getCurrentUser();
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const getCurrentUser = async (): Promise<User> => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(userData.role === 'admin');
      setIsFreelancer(userData.role === 'freelancer');
      return userData;
    } catch (error) {
      console.error('Error getting current user:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsFreelancer(false);
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<'admin' | 'user' | 'freelancer'> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      setIsFreelancer(user.role === 'freelancer');
      
      return user.role;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const freelancerLogin = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/auth/freelancer/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setIsFreelancer(true);
      setIsAdmin(false);
    } catch (error) {
      console.error('Freelancer login error:', error);
      throw error;
    }
  };

  const register = async (userData: any): Promise<'admin' | 'user' | 'freelancer'> => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      setIsFreelancer(user.role === 'freelancer');
      
      return user.role;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const freelancerRegister = async (freelancerData: FreelancerRegistrationData) => {
    try {
      const response = await api.post('/auth/freelancer/register', freelancerData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      setIsAuthenticated(true);
      setIsFreelancer(true);
    } catch (error) {
      console.error('Freelancer registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsFreelancer(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isFreelancer,
        login,
        freelancerLogin,
        register,
        freelancerRegister,
        logout,
        loading,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
