import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { auth } from '../middleware/auth';
import Payment from '../models/Payment';
import User from '../models/User';
import { CustomRequest } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// PayU Configuration
const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || '';
const PAYU_SALT = process.env.PAYU_SALT || '';
const PAYU_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://secure.payu.in/_payment'
  : 'https://sandboxsecure.payu.in/_payment';

// Get all user payments
router.get('/user', auth, async (req: CustomRequest, res) => {
  try {
    const payments = await Payment.find({ userId: req.user?.id })
      .sort({ createdAt: -1 });
    
    // Calculate payment statistics
    const stats = payments.reduce((acc, payment) => {
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
    }, {
      totalPayments: 0,
      pendingAmount: 0,
      completedAmount: 0,
      failedAmount: 0
    });
    
    res.json({ payments, stats });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Error fetching payments' });
  }
});

// Create payment order
router.post('/create-order', auth, async (req: CustomRequest, res) => {
  try {
    const { amount, currency = 'INR', description } = req.body;
    const userId = req.user?.id;

    if (!userId || !amount) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate transaction ID
    const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create hash string
    const hashString = `${PAYU_MERCHANT_KEY}|${txnId}|${amount}|${description}|${user.firstName}|${user.email}|||||||||||${PAYU_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // Create payment record
    const payment = new Payment({
      userId,
      amount,
      currency,
      status: 'pending',
      description,
      transactionId: txnId
    });
    await payment.save();

    // Return PayU payment details
    res.json({
      key: PAYU_MERCHANT_KEY,
      txnId,
      amount,
      productinfo: description,
      firstname: user.firstName,
      email: user.email,
      // phone: user.phone || '',
      surl: `${process.env.FRONTEND_URL}/payment/success`,
      furl: `${process.env.FRONTEND_URL}/payment/failure`,
      hash,
      payuUrl: PAYU_BASE_URL
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Error creating payment' });
  }
});

// Verify payment
router.post('/verify', auth, async (req: CustomRequest, res) => {
  try {
    const {
      txnid,
      mihpayid,
      status,
      hash,
      amount
    } = req.body;

    // Verify hash
    const hashString = `${PAYU_SALT}|${status}|||||||||||${txnid}|${PAYU_MERCHANT_KEY}`;
    const expectedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    const isAuthentic = expectedHash === hash;

    if (!isAuthentic) {
      return res.status(400).json({ message: 'Invalid payment verification' });
    }

    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { transactionId: txnid },
      {
        $set: {
          status: status.toLowerCase(),
          paymentId: mihpayid,
          paymentDetails: req.body
        }
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ success: true, payment });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
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
