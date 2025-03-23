// routes/content.routes.ts
import { Router } from 'express';
import { ContentController } from './controllers/e-content.controller';
import { validateContent } from './middleware/e-content.middleware';

const router = Router();

/** Create new content */
router.post('/', validateContent, ContentController.createContent);

/** Get content by subTopicId */
router.get('/subTopic/:subTopicId', ContentController.getContentBySubTopic);

export default router;
