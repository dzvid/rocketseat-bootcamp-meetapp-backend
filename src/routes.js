import { Router } from 'express';

const routes = new Router();

// ROUTES CONFIGURATION

routes.get('/test', (req, res) => {
  return res.json({ message: 'Hello world!' });
});

// Export all our routes
export default routes;
