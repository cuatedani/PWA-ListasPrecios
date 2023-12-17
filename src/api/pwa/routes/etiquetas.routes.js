import { Router } from "express";
import * as etiquetasController from '../controllers/etiquetas.controller';

const router = Router();

router.get('/', etiquetasController.getEtiquetasAll);
router.get('/:id', etiquetasController.getEtiquetasByIdController);

export default router;  