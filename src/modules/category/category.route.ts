import { Router } from 'express';
import { CategoryController } from './controllers/category.controller';
import { validateCategory } from './middleware/category.middleware';

const router = Router();

router.post('/', validateCategory, CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.put('/:id', validateCategory, CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
