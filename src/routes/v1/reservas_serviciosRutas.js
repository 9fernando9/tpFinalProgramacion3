import { Router } from 'express';
import Reserva_ServicioControlador from '../../controllers/reservas_serviciosControlador.js';
import {validarCreate, validarUpdate} from '../../middlewares/reservas_servicio_validarCampos.js';

const router = Router();
const reserva_servicioControlador = new Reserva_ServicioControlador();

router.get('/', reserva_servicioControlador.getAllReservas_Servicios).
    get("/:reserva_servicio_id", reserva_servicioControlador.findById).
    post('/', validarCreate, reserva_servicioControlador.create).
    put('/:reserva_servicio_id', validarUpdate, reserva_servicioControlador.update);

export default router;