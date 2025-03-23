import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware';
import { TopicController } from './controllers/topic.controller';
import { validateTopic } from './middleware/topic.middleware';

const router = Router();

/** Create a new topic */
router.post('/', authMiddleware, validateTopic, TopicController.create);

/** Get topics by category */
router.get(
  '/category/:categoryId',
  authMiddleware,
  TopicController.getByCategory,
);

/** Get a topic by ID */
router.get('/:topicId', authMiddleware, TopicController.getById);

/** Update a topic */
router.put('/:topicId', authMiddleware, validateTopic, TopicController.update);

/** Delete a topic */
router.delete('/:topicId', authMiddleware, TopicController.delete);

export default router;
