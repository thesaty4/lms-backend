import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware';
import { SubtopicController } from './controllers/subtopic.controller';
import { validateSubtopic } from './middleware/subtopic.middleware';

const router = Router();

/** Create a new subtopic */
router.post('/', authMiddleware, validateSubtopic, SubtopicController.create);

/** Get subtopics by topic */
router.get('/topic/:topicId', authMiddleware, SubtopicController.getByTopic);

/** Delete a subtopic */
router.delete('/:subtopicId', authMiddleware, SubtopicController.delete);

export default router;
