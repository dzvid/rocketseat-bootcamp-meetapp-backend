import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

// ROUTES CONFIGURATION

routes.get('/users', (req, res) => {
  console.log(User.sequelize);
  return res.json({ message: 'Hello world!' });
});

// Export all our routes
export default routes;
