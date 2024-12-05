import { Response } from 'express';
import { CustomRequest } from '../types';
import Message from '../models/Message';
import mongoose from 'mongoose';

export const getServiceMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { serviceId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const messages = await Message.find({ 
      serviceId: new mongoose.Types.ObjectId(serviceId) 
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { serviceId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const message = new Message({
      serviceId: new mongoose.Types.ObjectId(serviceId),
      senderId: userId,
      senderRole: userRole,
      content,
    });

    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};

export const markMessagesAsRead = async (req: CustomRequest, res: Response) => {
  try {
    const { serviceId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    await Message.updateMany(
      { 
        serviceId: new mongoose.Types.ObjectId(serviceId),
        senderId: { $ne: userId },
      },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
};
