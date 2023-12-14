import { Router } from 'express';
import * as prodServController from '../controllers/prodServ.controller';

const router = Router();
//Router.get('/list', ProdServController.getProdServList);
router.route('/') 
    .get(prodServController.getProdServList)
    .post(prodServController.postProdServ)

//router.get('/item/:ficIdProdServ', prodServController.getProdServItem);
router.route('/:id') 
    .get(prodServController.getProdServItem)
    .put(prodServController.putProdServItem)
    .delete(prodServController.deleteProdServItem)

export default router;

    