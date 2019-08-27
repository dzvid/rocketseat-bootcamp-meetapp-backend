import { Router } from 'express';

// Import User controller
import UserController from './app/controllers/UserController';

const routes = new Router();

// ROUTES CONFIGURATION

// Cadastro de usuário (POST /users)
routes.post('/users', UserController.store);

// Export all our routes
export default routes;
