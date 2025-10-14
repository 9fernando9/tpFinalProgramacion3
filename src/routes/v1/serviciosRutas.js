import { Router } from 'express';
import ServiciosControlador from '../../controllers/serviciosControlador.js';
import {validarCreate, validarUpdate} from '../../middlewares/servicios_validarCampos.js';

const router = Router();
const serviciosControlador = new ServiciosControlador();

router.get('/',serviciosControlador.getAllServicios).
    get("/:servicioId", serviciosControlador.findById);

router.post('/agregar',validarCreate,serviciosControlador.create).
    put('/:servicioId',validarUpdate,serviciosControlador.update).
    delete('/:servicioId',serviciosControlador.delete);

export default router;