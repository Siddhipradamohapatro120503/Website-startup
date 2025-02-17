import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  serviceId: mongoose.Types.ObjectId;
  serviceName: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  gateway: string;
  paymentDate?: Date;
  description?: string;
  transactionId: string;
  orderId?: string;
  paymentId?: string;
  receipt?: string;
  notes?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'RegisteredService',
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'razorpay',
    },
    gateway: {
      type: String,
      required: true,
      default: 'payu',
    },
    paymentDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      sparse: true,
    },
    paymentId: {
      type: String,
      sparse: true,
    },
    receipt: {
      type: String,
    },
    notes: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
PaymentSchema.index({ serviceId: 1, status: 1 });
PaymentSchema.index({ userEmail: 1 });
PaymentSchema.index({ createdAt: -1 });

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
