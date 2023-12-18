import { Router } from 'express';
import config from '../../../config/config';

// Import Routes
import preciosRoutes from './precios.routes';
import etiquetasRoutes from './etiquetas.routes';
import institutesRoutes from './institutes.routes';
import productosRoutes from './prodServ.routes';

//import ordersRoutes from './orders.routes';
const routerAPI = (app) => {
  const router = Router();
  const api = config.API_URL;
  app.use(api, router);
  
  // Routes
  router.use('/pwa/precios', preciosRoutes);
  router.use('/pwa/institutes', institutesRoutes);
  router.use('/pwa/etiquetas', etiquetasRoutes);
  router.use('/pwa/productos', productosRoutes);
  return router;
};
module.exports = routerAPI;