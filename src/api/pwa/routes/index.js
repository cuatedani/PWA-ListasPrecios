import { Router } from 'express';
import config from '../../../config/config';

// Import Routes
import precioRoutes from './precios.routes';

const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  // Routes
  router.use('/pwa/precio', precioRoutes);
  return router;
};
module.exports = routerAPI;