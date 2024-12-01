import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  name: string;
  category: string;
  lastGenerated: Date;
  status: 'Completed' | 'Processing' | 'Failed';
  data: any;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  lastGenerated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Completed', 'Processing', 'Failed'],
    default: 'Processing'
  },
  data: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.model<IReport>('Report', ReportSchema);
