import express from 'express';
import { login, register } from './controllers/auth.controller';
import { validateAuth } from './middleware/login.middleware';

const router = express.Router();

router.post('/login', validateAuth, login);
router.post('/register', validateAuth, register);

export default router;
