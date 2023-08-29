// Create Abstrac Class
import { Router } from 'express';
import IRouter from './RouteInterface';

abstract class BaseRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  abstract routers(): void;
}

export default BaseRoutes;
