import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Protected routes (admin only)
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;
