import { Router } from 'express';
import {
  getRegisteredServices,
  registerService,
  updateServiceStatus,
} from '../controllers/registeredServiceController';

const router = Router();

// Public routes for registered services
router.get('/', getRegisteredServices);
router.post('/', registerService);
router.patch('/:id', updateServiceStatus);

export default router;
