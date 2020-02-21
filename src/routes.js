import { Router } from 'express';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/login', AuthController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);

export default routes;
