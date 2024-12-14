import { Router } from 'express';
import {
  getAllFreelancers,
  getFreelancerById,
  createFreelancer,
  updateFreelancer,
  deleteFreelancer,
  updateFreelancerProfile,
  getFreelancerProfile
} from '../controllers/freelancer.controller';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllFreelancers);
router.get('/:id', getFreelancerById);

// Protected routes
router.post('/', auth, createFreelancer);
router.put('/:id', auth, updateFreelancer);
router.delete('/:id', auth, deleteFreelancer);

// Profile routes
router.get('/profile/me', auth, getFreelancerProfile);
router.put('/profile/me', auth, updateFreelancerProfile);

export default router;
