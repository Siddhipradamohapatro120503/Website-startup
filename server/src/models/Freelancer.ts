import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ISkill {
  name: string;
  level: number;
}

export interface IProject {
  name: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  clientRating?: number;
}

export interface IFreelancer extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  phone?: string;
  location?: string;
  avatar?: string;
  skills: ISkill[];
  projects: IProject[];
  hourlyRate: number;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    nextAvailable?: Date;
  };
  metrics: {
    completedProjects: number;
    totalEarnings: number;
    avgResponseTime?: string;
  };
  rating: number;
  isActive: boolean;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  level: { 
    type: Number, 
    required: true,
    min: [0, 'Skill level must be between 0 and 100'],
    max: [100, 'Skill level must be between 0 and 100'],
    validate: {
      validator: (value: number) => Number.isInteger(value),
      message: 'Skill level must be a whole number'
    }
  }
});

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'cancelled'],
    default: 'in-progress'
  },
  clientRating: {
    type: Number,
    min: 0,
    max: 5
  }
});

const freelancerSchema = new Schema<IFreelancer>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  skills: [skillSchema],
  projects: [projectSchema],
  hourlyRate: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    status: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    nextAvailable: Date,
  },
  metrics: {
    completedProjects: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    avgResponseTime: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'freelancer',
  },
}, {
  timestamps: true,
});

// Hash password before saving
freelancerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
freelancerSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model<IFreelancer>('Freelancer', freelancerSchema);
