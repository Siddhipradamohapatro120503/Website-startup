import { Router } from 'express';
import {
  getRegisteredServices,
  registerService,
  updateServiceStatus,
} from '../controllers/registeredServiceController';
import { auth } from '../middleware/auth';

const router = Router();

// Protected routes - require authentication
router.get('/', auth, getRegisteredServices);
router.post('/', auth, registerService);
router.patch('/:id', auth, updateServiceStatus);

export default router;
