import { Router } from 'express';
import ServiciosControlador from '../../controllers/serviciosControlador.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/servicios_validarCampos.js';

const router = Router();
const serviciosControlador = new ServiciosControlador();

router.get('/',serviciosControlador.getAllServicios).
    get("/:servicioId",[validarId], serviciosControlador.findById);

router.post('/',[validarCreate],serviciosControlador.create).
    put('/:servicioId',[validarUpdate],serviciosControlador.update).
    delete('/:servicioId',[validarId],serviciosControlador.delete);

export default router;