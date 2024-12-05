import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  serviceId: mongoose.Types.ObjectId;
  senderId: string;
  senderRole: 'user' | 'admin';
  content: string;
  timestamp: Date;
  read: boolean;
}

const messageSchema = new Schema<IMessage>({
  serviceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'RegisteredService'
  },
  senderId: {
    type: String,
    required: true,
    ref: 'User'
  },
  senderRole: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IMessage>('Message', messageSchema);
