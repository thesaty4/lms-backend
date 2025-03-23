import express from 'express';
import { AuthController } from './controllers/auth.controller';
import { validateAuth } from './middleware/login.middleware';

const router = express.Router();

router.post('/login', validateAuth, AuthController.login);
router.post('/register', validateAuth, AuthController.register);

export default router;
