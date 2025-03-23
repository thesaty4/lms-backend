import { Router } from 'express';
import { BlogController } from './controllers/blog.controller';
import { validateBlog } from './middleware/blog.middleware';

const router = Router();

router.post('/', validateBlog, BlogController.create);
router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getById);
router.put('/:id', BlogController.update);
router.delete('/:id', BlogController.delete);

export default router;
