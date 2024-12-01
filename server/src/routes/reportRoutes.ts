import { Router } from 'express';
import {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  generateReport
} from '../controllers/reportController';

const router = Router();

router.get('/', getReports);
router.get('/:id', getReport);
router.post('/', createReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);
router.post('/:id/generate', generateReport);

export default router;
