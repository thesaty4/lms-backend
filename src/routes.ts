import express from 'express';
import authRoutes from './modules/users/users.route';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Other routes will go here

export default router;
