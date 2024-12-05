import { Router } from 'express';
import {
  getServiceMessages,
  sendMessage,
  markMessagesAsRead,
} from '../controllers/messageController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/service/:serviceId', auth, getServiceMessages);
router.post('/service/:serviceId', auth, sendMessage);
router.patch('/service/:serviceId/read', auth, markMessagesAsRead);

export default router;
