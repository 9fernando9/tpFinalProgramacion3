import { Router } from 'express';
import UsuariosControlador from '../../controllers/usuariosControlador.js';
import {validarCreate, validarUpdate} from '../../middlewares/usuarios_validarCampos.js';

const router = Router();
const usuariosControlador = new UsuariosControlador();


router.get('/',usuariosControlador.getAllUsuarios).
    get("/:usuarioId", usuariosControlador.findById).
    post('/',validarCreate,usuariosControlador.create).
    put('/:usuarioId',validarUpdate,usuariosControlador.update).
    delete('/:usuarioId',usuariosControlador.delete);

export default router;