import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';
import {verificarToken, verificarRol} from '../../middlewares/auth.js';
import {validarCreate, validarUpdate} from '../../middlewares/salones_validarCampos.js';


const salonesControlador = new SalonesControlador();
const router = Router();

router.get('/',salonesControlador.getAllSalones)
    .get("/:salonId", salonesControlador.findById);
router.post('/',validarCreate,salonesControlador.create)
    .put('/:salonId',validarUpdate,salonesControlador.update)
    .delete('/:salonId',salonesControlador.delete);

export default router;