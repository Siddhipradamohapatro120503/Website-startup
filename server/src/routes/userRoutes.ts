import { Router } from 'express';
import { getUsers, updateUserStatus, updateUserProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

// Protected user routes
router.patch('/profile', auth, updateUserProfile);

// Protected admin routes
router.get('/', auth, isAdmin, getUsers);
router.patch('/:id/status', auth, isAdmin, updateUserStatus);

export default router;
