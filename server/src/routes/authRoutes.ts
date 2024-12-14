import { Router } from 'express';
import { register, login, getCurrentUser, freelancerRegister, freelancerLogin } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getCurrentUser);
router.post('/freelancer/register', freelancerRegister);
router.post('/freelancer/login', freelancerLogin);

export default router;
