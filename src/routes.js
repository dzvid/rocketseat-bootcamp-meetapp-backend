import { Router } from 'express';
import multer from 'multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Validation middleware
import schemaValidator from './app/middlewares/schemaValidator';

// Validation schemas
import UserSchema from './app/validations/UserSchema';
import SessionSchema from './app/validations/SessionSchema';
import FileSchema from './app/validations/FileSchema';
import MeetupSchema from './app/validations/MeetupSchema';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

// Multer (file upload configuration)
import multerConfig from './config/multer';

// file upload middleware
const upload = multer(multerConfig);

const routes = new Router();

// ROUTES CONFIGURATION

// Create user
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

// Creates a new meetup
routes.post(
  '/meetups',
  schemaValidator(MeetupSchema.store, 'body'),
  MeetupController.store
);

// Update a meetup
routes.put(
  '/meetups/:id',
  schemaValidator(MeetupSchema.update, 'body'),
  schemaValidator(MeetupSchema.update, 'params'),
  MeetupController.update
);

// File upload
routes.post(
  '/files',
  upload.single('file'),
  schemaValidator(FileSchema.store, 'file'),
  FileController.store
);

export default routes;
