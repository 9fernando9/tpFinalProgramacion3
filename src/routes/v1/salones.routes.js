import { Router } from 'express';
import SalonController from '../../controllers/salones.controller.js';

const router = Router();
const salonController = new SalonController();

router.get('/listar',salonController.getAllSalones);
router.get("/salon/:salonId", salonController.findById);
router.post('/agregar',salonController.create);
router.put('/modificar/:salonId',salonController.update);
router.delete('/eliminar/:salonId',salonController.delete);

export default router;