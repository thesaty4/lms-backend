import { Router } from 'express';
import { SubtopicController } from './controllers/subtopic.controller';
import { validateSubtopic } from './middleware/subtopic.middleware';

const router = Router();

/** Create a new subtopic */
router.post('/', validateSubtopic, SubtopicController.create);

/** Get subtopics by topic */
router.get('/topic/:topicId', SubtopicController.getByTopic);

/** Delete a subtopic */
router.delete('/:subtopicId', SubtopicController.delete);

export default router;
