import { Router } from 'express';
import ReservasControlador from '../../controllers/reservasControlador.js';
import {validarCreate, validarUpdate} from '../../middlewares/reservas_validarCampos.js';

const router = Router();
const reservasControlador = new ReservasControlador();

router.get('/',reservasControlador.getAllReservas).
    get("/:reservaId", reservasControlador.findById).
    post('/',validarCreate, reservasControlador.create).
    put('/:reservaId',validarUpdate,reservasControlador.update).
    delete('/:reservaId',reservasControlador.delete);

export default router;