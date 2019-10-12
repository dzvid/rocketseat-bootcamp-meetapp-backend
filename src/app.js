import express from 'express';
import path from 'path';

import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import sentryConfig from './config/sentry';
import routes from './routes';

// Import the models loader
import './database';

class App {
  constructor() {
    this.server = express();

    // Sentry monitoring
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();

    // Sentry monitoring
    this.exceptionHandler();
  }

  // Method to implement most of the middlewares of the application
  middlewares() {
    // Sentry error handler middleware must be first middleware in the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());

    // Middleware to serve static files from a given root directory
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Method to configure the server routes
  routes() {
    // Routes
    this.server.use(routes);

    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Error handler for the application
   */
  exceptionHandler() {
    this.server.use(async (err, req, res) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
