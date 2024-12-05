import mongoose, { Document, Schema } from 'mongoose';

export interface IRegisteredService extends Document {
  serviceId: string;
  name: string;
  description: string;
  duration: string;
  category: string;
  features: string[];
  technologies?: string[];
  useCases?: string[];
  iconName: string;
  status: 'pending' | 'active' | 'completed';
  registrationDate: Date;
  userEmail: string;  
  formData: {
    preferredDate: string;
    preferredTime: string;
    specialRequirements: string;
    paymentMethod: string;
  };
}

const registeredServiceSchema = new Schema<IRegisteredService>({
  serviceId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  duration: String,
  category: String,
  features: [String],
  technologies: [String],
  useCases: [String],
  iconName: String,
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  userEmail: {  
    type: String,
    required: true
  },
  formData: {
    preferredDate: String,
    preferredTime: String,
    specialRequirements: String,
    paymentMethod: String
  }
});

export default mongoose.model<IRegisteredService>('RegisteredService', registeredServiceSchema);
