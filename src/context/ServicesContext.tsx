import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import * as Icons from 'react-icons/fi';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: string;
  features: string[];
  technologies?: string[];
  useCases?: string[];
  icon: any;
}

interface FormData {
  preferredDate: string;
  preferredTime: string;
  specialRequirements: string;
  paymentMethod: string;
}

interface RegisteredService extends Omit<Service, 'icon'> {
  _id: string;  // MongoDB's _id
  id: string;   // Original service ID
  status: 'pending' | 'active' | 'completed';
  registrationDate: string;
  formData?: {
    preferredDate?: string;
    preferredTime?: string;
    specialRequirements?: string;
    paymentMethod?: string;
  };
  iconName: string;
}

interface ServicesContextType {
  registeredServices: RegisteredService[];
  registerService: (service: Service, formData: FormData) => Promise<void>;
  updateServiceStatus: (serviceId: string, status: RegisteredService['status']) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000/api';

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredServices, setRegisteredServices] = useState<RegisteredService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegisteredServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get(`${API_BASE_URL}/registered-services`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRegisteredServices(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch registered services');
      console.error('Error fetching registered services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredServices();
  }, []);

  const registerService = async (service: Service, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const serviceData = {
        service: {
          ...service,
          id: service.id,
          icon: {
            name: service.icon.name
          }
        },
        formData
      };
      const response = await axios.post(`${API_BASE_URL}/registered-services`, serviceData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRegisteredServices(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register service');
      console.error('Error registering service:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateServiceStatus = async (serviceId: string, status: RegisteredService['status']) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.patch(`${API_BASE_URL}/registered-services/${serviceId}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRegisteredServices(prev =>
        prev.map(service =>
          service._id === serviceId ? { ...service, status } : service
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service status');
      console.error('Error updating service status:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicesContext.Provider
      value={{
        registeredServices,
        registerService,
        updateServiceStatus,
        loading,
        error
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
