import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { validateRegister } from '../middleware/validateAuth';

const router = Router();

router.post('/login', login);
router.post('/register', validateRegister, register);

export default router;
