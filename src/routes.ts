import express from 'express';
import blogRoutes from './modules/blogs/blogs.route';
import categoryRoutes from './modules/category/category.route';
import contentRoutes from './modules/e-content/e-content.route';
import subTopicRoutes from './modules/subtopic/subtopic.route';
import topicRoutes from './modules/topic/topic.route';
import authRoutes from './modules/users/users.route';
import { authMiddleware } from './shared/middleware';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Blog routes
router.use('/blogs', authMiddleware, blogRoutes);

// Category routes
router.use('/categories', authMiddleware, categoryRoutes);
router.use('/topics', authMiddleware, topicRoutes);
router.use('/sub-topics', authMiddleware, subTopicRoutes);

// Content routes
router.use('/e-content', authMiddleware, contentRoutes);

// Other routes will go here

export default router;
