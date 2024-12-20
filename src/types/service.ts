import { IconType } from 'react-icons';

export interface Service {
  name: string;
  icon: IconType;
  description: string;
  features: string[];
  technologies: string[];
  useCases: string[];
  brochureUrl?: string;
  whyChooseUs?: string[];
  contactInfo?: {
    phone: string;
    email: string;
  };
}

export interface ServiceCategory {
  title: string;
  icon: IconType;
  services: Service[];
}
