import { Router } from 'express';
import { TopicController } from './controllers/topic.controller';
import { validateTopic } from './middleware/topic.middleware';

const router = Router();

/** Create a new topic */
router.post('/', validateTopic, TopicController.create);

/** Get topics by category */
router.get('/category/:categoryId', TopicController.getByCategory);

/** Get a topic by ID */
router.get('/:topicId', TopicController.getById);

/** Update a topic */
router.put('/:topicId', validateTopic, TopicController.update);

/** Delete a topic */
router.delete('/:topicId', TopicController.delete);

export default router;
