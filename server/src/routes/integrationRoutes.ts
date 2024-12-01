import { Router } from 'express';
import {
  getIntegrations,
  getIntegration,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  toggleIntegration
} from '../controllers/integrationController';

const router = Router();

router.get('/', getIntegrations);
router.get('/:id', getIntegration);
router.post('/', createIntegration);
router.put('/:id', updateIntegration);
router.delete('/:id', deleteIntegration);
router.post('/:id/toggle', toggleIntegration);

export default router;
