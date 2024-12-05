import mongoose, { Document, Schema } from 'mongoose';

interface SubCategory {
  name: string;
}

interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface ServiceMetrics {
  views: number;
  bookings: number;
  revenue: number;
  rating: number;
}

export interface IService extends Document {
  name: string;
  description: string;
  category: string;
  subCategories: SubCategory[];
  pricing: {
    base: number;
    premium: number;
    enterprise: number;
  };
  availability: {
    regions: string[];
    schedule: Schedule[];
  };
  metrics: ServiceMetrics;
  status: 'active' | 'inactive' | 'draft';
}

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategories: [{
    name: {
      type: String,
      required: true,
    }
  }],
  pricing: {
    base: {
      type: Number,
      required: true,
      min: 0,
    },
    premium: {
      type: Number,
      required: true,
      min: 0,
    },
    enterprise: {
      type: Number,
      required: true,
      min: 0,
    }
  },
  availability: {
    regions: [{
      type: String,
      required: true,
    }],
    schedule: [{
      dayOfWeek: {
        type: Number,
        required: true,
        min: 0,
        max: 6,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      }
    }]
  },
  metrics: {
    views: {
      type: Number,
      default: 0,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft',
  }
}, {
  timestamps: true,
});

export default mongoose.model<IService>('Service', ServiceSchema);
