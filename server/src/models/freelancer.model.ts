import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill {
  name: string;
  level: number;
}

export interface IProject {
  name: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  clientRating: number;
}

export interface IFreelancer extends Document {
  name: string;
  avatar?: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: ISkill[];
  rating: number;
  projects: IProject[];
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: string;
  };
  metrics: {
    completedProjects: number;
    totalEarnings: number;
    avgResponseTime: string;
  };
}

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  level: { 
    type: Number, 
    required: true, 
    min: [0, 'Skill level cannot be less than 0'],
    max: [100, 'Skill level cannot be more than 100']
  }
});

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: {
      values: ['completed', 'in-progress', 'cancelled'],
      message: '{VALUE} is not a valid status'
    },
    default: 'in-progress'
  },
  clientRating: { 
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  }
});

const freelancerSchema = new Schema<IFreelancer>({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true 
  },
  avatar: { type: String },
  title: { 
    type: String, 
    required: [true, 'Professional title is required'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String,
    trim: true 
  },
  location: { 
    type: String,
    trim: true 
  },
  bio: { 
    type: String,
    trim: true 
  },
  skills: [skillSchema],
  rating: { 
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  projects: [projectSchema],
  availability: {
    status: {
      type: String,
      enum: {
        values: ['available', 'busy', 'unavailable'],
        message: '{VALUE} is not a valid availability status'
      },
      default: 'available'
    },
    nextAvailable: { type: String }
  },
  metrics: {
    completedProjects: { 
      type: Number,
      default: 0,
      min: [0, 'Completed projects cannot be negative']
    },
    totalEarnings: { 
      type: Number,
      default: 0,
      min: [0, 'Total earnings cannot be negative']
    },
    avgResponseTime: { 
      type: String,
      default: '24 hours'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IFreelancer>('Freelancer', freelancerSchema);
