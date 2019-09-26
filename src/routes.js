import { Router } from 'express';

// Import middleware to check if user is authenticated
import authMiddleware from './app/middlewares/auth';

// Validation middleware
import schemaValidator from './app/middlewares/schemaValidator';

// Validation schemas
import UserSchema from './app/validations/UserSchema';
import SessionSchema from './app/validations/SessionSchema';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// ROUTES CONFIGURATION

// Create (register) user
routes.post(
  '/users',
  schemaValidator(UserSchema.store, 'body'),
  UserController.store
);

// Create user session (generates JWT Token)
routes.post(
  '/sessions',
  schemaValidator(SessionSchema.store, 'body'),
  SessionController.store
);

// Middleware to verify if user is authenticated
routes.use(authMiddleware);

// Update user information
routes.put(
  '/users',
  schemaValidator(UserSchema.update, 'body'),
  UserController.update
);

export default routes;
