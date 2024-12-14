import { Router } from 'express';
import { 
  updateFreelancerProfile,
  getFreelancerProfile,
  deleteFreelancer
} from '../controllers/freelancer.controller';
import { auth } from '../middleware/auth';

const router = Router();

// Protected routes - require authentication
router.get('/profile', auth, getFreelancerProfile);
router.put('/profile', auth, updateFreelancerProfile);
router.delete('/:id', auth, deleteFreelancer);

export default router;
