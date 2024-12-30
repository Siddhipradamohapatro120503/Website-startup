import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { auth } from '../middleware/auth';
import { CustomRequest } from '../types';
import Payment from '../models/Payment';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Get all user payments
router.get('/user', auth, async (req: CustomRequest, res) => {
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
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create Razorpay order
router.post('/create-order', auth, async (req: CustomRequest, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    // Create a payment record in our database
    const payment = new Payment({
      orderId: order.id,
      amount: amount,
      currency,
      receipt,
      status: 'pending',
      userEmail: req.user?.email,
      notes,
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    await payment.save();

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
});

// Verify payment signature
router.post('/verify', auth, async (req: CustomRequest, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment status in our database
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          $set: {
            status: 'completed',
            paymentId: razorpay_payment_id,
            paymentDate: new Date(),
          },
        }
      );

      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
    });
  }
});

// Get payment statistics
router.get('/stats', auth, async (req: CustomRequest, res) => {
  try {
    const { timeFilter } = req.query;
    let dateFilter = {};

    // Calculate the date range based on the filter
    const now = new Date();
    switch (timeFilter) {
      case '24h':
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000)
          }
        };
        break;
      case '7d':
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case '30d':
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      default:
        // All time - no date filter
        break;
    }

    // Fetch payments with date filter
    const payments = await Payment.find(dateFilter);
    
    // Calculate statistics
    const stats = payments.reduce(
      (acc, payment) => {
        acc.totalPayments += payment.amount;
        switch (payment.status) {
          case 'pending':
            acc.pendingAmount += payment.amount;
            break;
          case 'completed':
            acc.completedAmount += payment.amount;
            break;
          case 'failed':
            acc.failedAmount += payment.amount;
            break;
        }
        return acc;
      },
      { totalPayments: 0, pendingAmount: 0, completedAmount: 0, failedAmount: 0 }
    );

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment statistics',
    });
  }
});

export default router;
