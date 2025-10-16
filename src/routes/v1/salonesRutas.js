import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';
//import {verificarToken, verificarRol} from '../../middlewares/auth.js';
import {validarCreate, validarUpdate,validarId} from '../../middlewares/salones_validarCampos.js';


const salonesControlador = new SalonesControlador();
const router = Router();

router.get('/',salonesControlador.getAllSalones)
    .get("/:salonId",[validarId], salonesControlador.findById);
router.post('/',[validarCreate],salonesControlador.create)
    .put('/:salonId',[validarUpdate],salonesControlador.update)
    .delete('/:salonId',[validarId],salonesControlador.delete);

export default router;