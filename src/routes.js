import { Router } from 'express';

// Import User controller
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// ROUTES CONFIGURATION

// Register (create) user (POST /users)
routes.post('/users', UserController.store);

// Create user session (generates JWT Token)
routes.post('/sessions', SessionController.store);

// Export all our routes
export default routes;
