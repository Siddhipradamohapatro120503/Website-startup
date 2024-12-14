export interface Skill {
  _id?: string;
  name: string;
  level: number;
}

export interface Project {
  _id?: string;
  name: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  clientRating?: number;
}

export interface Freelancer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  avatar?: string;
  title: string;
  bio: string;
  phone?: string;
  location?: string;
  skills: Skill[];
  projects: Project[];
  hourlyRate: number;
  rating: number;
  isActive: boolean;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: string;
  };
  metrics: {
    completedProjects: number;
    totalEarnings: number;
    avgResponseTime?: string;
  };
}
