import express from 'express';
import authRoutes from './modules/users/routes/auth.route';

const router = express.Router();
const app = express();

// Authentication routes
app.use('/auth', authRoutes);

export default router;
