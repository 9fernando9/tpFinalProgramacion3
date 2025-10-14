import { Router } from 'express';
import TurnosControlador from '../../controllers/turnosControlador.js';
import {validarCreate, validarUpdate} from '../../middlewares/turnos_validarCampos.js';


const router = Router();
const turnosControlador = new TurnosControlador();

router.get('/',turnosControlador.getAllTurnos).
    get("/:turnoId", turnosControlador.findById);

router.post('/',validarCreate,turnosControlador.create).
    put('/:turnoId',validarUpdate,turnosControlador.update).
    delete('/:turnoId',turnosControlador.delete);

export default router;