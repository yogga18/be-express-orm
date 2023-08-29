import BaseRoutes from './BaseRouter';

// Middlewares
import { auth } from '../middlewares/AuthMiddleware';

// Controllers
import UserController from '../controllers/UserConntroller';

class UserRoutes extends BaseRoutes {
  public routers(): void {
    this.router.get('/', auth, UserController.index);
    this.router.post('/', auth, UserController.create);
    this.router.get('/:id', auth, UserController.show);
    this.router.put('/:id', auth, UserController.update);
    this.router.delete('/:id', auth, UserController.delete);
  }
}

export default new UserRoutes().router;
