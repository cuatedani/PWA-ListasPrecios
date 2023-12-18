
//FIC: URL base: /cat-prod-serv
import { Router } from 'express';
import * as prodServController from '../controllers/prodServ.controller';

const router = Router();

//FIC: GET
router.get('/', prodServController.GetAllProdServ);
router.get('/one', prodServController.GetOneProdServ);

//FIC: POST
router.post('/', prodServController.AddOneProdServ);

//FIC: PUT
router.put("/", prodServController.UpdateOneProdServ);

//ZAM: PATCH
router.patch('/', prodServController.PatchOneProdServ);

//FIC: DELETE
router.delete("/", prodServController.DeleteOneProdServ);
//router.delete('/:id', prodServController.DeleteOneProduct);


export default router;