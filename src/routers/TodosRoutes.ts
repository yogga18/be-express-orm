import BaseRoutes from './BaseRouter';

// Middlewares
import { auth } from '../middlewares/AuthMiddleware';
import TodosControllers from '../controllers/TodosControllers';
import validateDesc from '../middlewares/TodosValidator';

// Controllers

class TodosRoutes extends BaseRoutes {
  public routers(): void {
    this.router.get('/', auth, TodosControllers.index);
    this.router.post('/', auth, validateDesc, TodosControllers.create);
    this.router.get('/:id', auth, TodosControllers.show);
    this.router.put('/:id', auth, validateDesc, TodosControllers.update);
    this.router.delete('/:id', auth, TodosControllers.delete);
  }
}

export default new TodosRoutes().router;
