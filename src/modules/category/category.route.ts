import { Router } from 'express';
import { authMiddleware } from '../../shared/middleware';
import { CategoryController } from './controllers/category.controller';
import { validateCategory } from './middleware/category.middleware';

const router = Router();

router.post('/', authMiddleware, validateCategory, CategoryController.create);
router.get('/', authMiddleware, CategoryController.getAll);
router.get('/:id', authMiddleware, CategoryController.getById);
router.put('/:id', authMiddleware, validateCategory, CategoryController.update);
router.delete('/:id', authMiddleware, CategoryController.delete);

export default router;
