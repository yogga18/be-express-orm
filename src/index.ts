import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenv } from 'dotenv';

// Routes
import UserRoutes from './routers/UserRoutes';
import AuthRoutes from './routers/AuthRoutes';
import TodosRoutes from './routers/TodosRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('dev')); // morgan for logging request
    this.app.use(compression()); // compress all request response
    this.app.use(helmet()); // secure your app by setting various HTTP headers
    this.app.use(cors());
    dotenv();
  }

  protected routes(): void {
    this.app.use('/api/v1/users', UserRoutes);
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/todos', TodosRoutes);
  }
}

const PORT = 8000;
const app = new App().app;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`env ${process.env.NODE_ENV}`);
});
