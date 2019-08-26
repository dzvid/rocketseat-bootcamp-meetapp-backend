import express from 'express';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Method to implement most of the middlewares of the application
  middlewares() {
    // Configuro envio e recebimento de requisições (body) no formato JSON
    this.server.use(express.json());
  }

  // Method to configure the server routes
  routes() {
    // Configuro as rotas do servidor, passando o arquivo de rotas como parametro
    this.server.use(routes);
  }
}

// O server é a unica instancia que pode ser acessada de fora da classe
export default new App().server;
