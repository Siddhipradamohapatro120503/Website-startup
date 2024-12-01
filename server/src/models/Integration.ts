import mongoose, { Document, Schema } from 'mongoose';

export interface IIntegration extends Document {
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected';
  isPopular: boolean;
  icon: string;
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const IntegrationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['connected', 'disconnected'],
    default: 'disconnected'
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: true
  },
  config: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.model<IIntegration>('Integration', IntegrationSchema);
