import express from 'express';
import { Types } from 'mongoose';
import RegisteredService from '../models/RegisteredService';
import Payment from '../models/Payment';
import { auth } from '../middleware/auth';
import { CustomRequest } from '../types';
import { Response } from 'express';

const router = express.Router();

// Helper function to validate amount
const validateAmount = (amount: number): boolean => {
  // Amount should be positive and have at most 2 decimal places
  return amount > 0 && Number(amount.toFixed(2)) === amount;
};

// Get all payments (admin only)
router.get('/', auth, async (req: CustomRequest, res: Response) => {
  try {
    // Only admin can see all payments
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's payments
router.get('/user', auth, async (req: CustomRequest, res: Response) => {
  try {
    const payments = await Payment.find({ userEmail: req.user?.email })
      .sort({ createdAt: -1 });
    
    // Calculate payment statistics
    const stats = payments.reduce(
      (acc, payment) => {
        acc.totalPayments += payment.amount;
        if (payment.status === 'pending') {
          acc.pendingAmount += payment.amount;
        } else if (payment.status === 'completed') {
          acc.completedAmount += payment.amount;
        }
        return acc;
      },
      { totalPayments: 0, pendingAmount: 0, completedAmount: 0 }
    );

    res.json({
      payments,
      stats
    });
  } catch (error) {
    console.error('Error fetching user payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get payments by service ID
router.get('/service/:serviceId', auth, async (req: CustomRequest, res: Response) => {
  try {
    const payments = await Payment.find({ 
      serviceId: req.params.serviceId,
      ...(req.user?.role !== 'admin' ? { userEmail: req.user?.email } : {})
    }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching service payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Initiate a new payment
router.post('/initiate', auth, async (req: CustomRequest, res: Response) => {
  try {
    const { serviceId, amount } = req.body;
    const numericAmount = parseFloat(amount);

    if (!serviceId || !amount) {
      return res.status(400).json({ message: 'Service ID and amount are required' });
    }

    if (!validateAmount(numericAmount)) {
      return res.status(400).json({ 
        message: 'Invalid amount. Amount must be positive and have at most 2 decimal places' 
      });
    }

    // Validate service exists
    const service = await RegisteredService.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Only admin can initiate payments
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can initiate payments' });
    }

    // Create a new payment record
    const payment = new Payment({
      serviceId: new Types.ObjectId(serviceId),
      amount: numericAmount,
      userEmail: service.userEmail,
      serviceName: service.name,
      status: 'pending',
      paymentMethod: 'card',
      description: `Payment for ${service.name}`,
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    await payment.save();

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: payment
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update payment status
router.patch('/:paymentId/status', auth, async (req: CustomRequest, res: Response) => {
  try {
    const { status } = req.body;
    const { paymentId } = req.params;

    if (!status || !['pending', 'completed', 'failed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const payment = await Payment.findById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Only allow users to update their own payments or admin to update any payment
    if (req.user?.role !== 'admin' && payment.userEmail !== req.user?.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { 
        status,
        ...(status === 'completed' ? { paymentDate: new Date() } : {})
      },
      { new: true }
    );

    res.json(updatedPayment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
