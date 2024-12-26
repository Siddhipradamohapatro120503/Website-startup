import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  serviceId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: Date;
  transactionId?: string;
  paymentMethod?: string;
  userEmail: string;
  serviceName: string;
  description?: string;
  metadata?: {
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'RegisteredService',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    transactionId: {
      type: String,
      sparse: true,
      unique: true
    },
    paymentMethod: {
      type: String
    },
    userEmail: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    metadata: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
PaymentSchema.index({ serviceId: 1, status: 1 });
PaymentSchema.index({ userEmail: 1 });
PaymentSchema.index({ createdAt: -1 });

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
