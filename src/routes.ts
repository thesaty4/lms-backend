import express from 'express';
import authRoutes from './modules/users/routes/auth.route';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

export default router;
