import { Router } from 'express';
import { register, login, validateToken, forgotPassword, resetPassword } from '../controllers/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/auth.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/validate', authenticate, validateToken);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);

export { router as authRouter };