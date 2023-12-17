import { Router } from "express";
import * as institutesController from '../controllers/institutes.controller';

const router = Router();

router.get('/', institutesController.getInstitutesAll);
router.post('/', institutesController.addInstitute);
router.put('/:id', institutesController.updateEntrega);
router.delete('/deleteByValue/:valueToDelete', institutesController.deleteEntregaByValue);
// router.put()
// router.delete()

export default router;
