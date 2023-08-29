import { Request, Response } from 'express';
import IController from './ControllerInterface';
import TodoService from '../services/TodoService';

class ToodosControllers implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);
    const todos = await services.getAll();

    return res.status(200).send({
      success: true,
      message: 'Get all todos successfully',
      data: todos,
    });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);
    const todo = await services.store();

    return res.status(200).send({
      success: true,
      message: 'Todo created successfully',
      data: todo,
    });
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);
    const todo = await services.getOne();

    return res.status(200).send({
      success: true,
      message: 'Get Todo by id successfully',
      data: todo,
    });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);
    const todo: TodoService = await services.update();

    return res.status(200).send({
      success: true,
      message: 'Todo updated successfully',
      data: todo,
    });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);
    const todo = await services.delete();

    return res.status(200).send({
      success: true,
      message: 'Todo deleted successfully',
      data: todo,
    });
  };
}

export default new ToodosControllers();
