import { Router } from 'express';
import SalonController from '../controllers/salon.controller.js';

const router = Router();
const salonController = new SalonController();

router.get('/listar',salonController.listar.bind(salonController));
router.get('/agregar',salonController.agregar.bind(salonController));
router.get('/modificar',salonController.modificar.bind(salonController));
router.get('/eliminar',salonController.eliminar.bind(salonController));

export default router;