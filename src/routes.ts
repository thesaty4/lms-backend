import express from 'express';
import blogRoutes from './modules/blogs/blogs.route';
import categoryRoutes from './modules/category/category.route';
import subTopicRoutes from './modules/subtopic/subtopic.route';
import topicRoutes from './modules/topic/topic.route';
import authRoutes from './modules/users/users.route';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Blog routes
router.use('/blogs', blogRoutes);

// Category routes
router.use('/categories', categoryRoutes);
router.use('/topics', topicRoutes);
router.use('/sub-topics', subTopicRoutes);

// Other routes will go here

export default router;
