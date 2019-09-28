import express from 'express';
import path from 'path';

import routes from './routes';

// Import the models loader
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Method to implement most of the middlewares of the application
  middlewares() {
    // Configure express to parses incoming requests with JSON payloads
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
  }
}

export default new App().server;
