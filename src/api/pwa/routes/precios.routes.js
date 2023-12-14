import { Router } from "express";
import * as pricesListController from '../controllers/precios.controller';

const router = Router();
//-------------------ROUTES DE TODAS LAS APIS-------------------------------------------------

//-------------------APIS FUNCIONALES---------------------------------------------------------
router.get('/',pricesListController.GetAllPricesList); //Pruebas
router.get('/one',pricesListController.GetOnePricesList);//Pruebas
router.post('/',pricesListController.AddOnePricesList);//Pruebas
router.put('/', pricesListController.UpdateOnePricesList);//Pruebas
router.delete('/',pricesListController.DeleteOnePricesList);//Pruebas

//-------------------VERSIONES EN PRUEBAS (PATCH)-------------------------------------
router.patch('/', pricesListController.UpdatePatchPricesList);

export default router;

    