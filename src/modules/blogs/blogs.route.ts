import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware';
import { BlogController } from './controllers/blog.controller';
import { validateBlog } from './middleware/blog.middleware';

const router = Router();

router.post('/', authMiddleware, validateBlog, BlogController.create);
router.get('/', authMiddleware, BlogController.getAll);
router.get('/:id', authMiddleware, BlogController.getById);
router.put('/:id', authMiddleware, BlogController.update);
router.delete('/:id', authMiddleware, BlogController.delete);

export default router;
