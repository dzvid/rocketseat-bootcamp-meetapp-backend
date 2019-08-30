import { Router } from 'express';

// Import User controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Import middleware to check if user is authenticated
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// ROUTES CONFIGURATION

// Create (register) user
routes.post('/users', UserController.store);

// Create user session (generates JWT Token)
routes.post('/sessions', SessionController.store);

// Middleware to verify if user is authenticated
routes.use(authMiddleware);

// Update user information
routes.put('/users', UserController.update);

export default routes;
