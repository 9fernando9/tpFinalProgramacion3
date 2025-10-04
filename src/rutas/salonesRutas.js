import { Router } from 'express';
import { body } from 'express-validator'
import SalonesControlador from '../controladores/salonesControlador.js';
import { verificarToken , verificarRol } from '../middlewares/auth.js';
import { validarCampos } from '../middlewares/validarCampos.js';

const rutas = Router();
const salonesControlador = new SalonesControlador();

rutas.get('/', salonesControlador.buscarTodos);
rutas.get('/:id', salonesControlador.buscarPorId);

rutas.post('/', 
    verificarToken,
    verificarRol('admin', 'empleado'),
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('direccion').notEmpty().withMessage('La direccion es obligatoria'),
    body('capacidad').isInt({min: 1}).withMessage('Capacidad debe ser un número mayor a 0'),
    body('importe').isFloat({min: 1}).withMessage('Importe debe ser un número mayor a 0'),
    validarCampos,
    salonesControlador.crear
);

rutas.put('/:id',
    verificarToken,
    verificarRol('admin'),
    body('titulo').notEmpty(),
    body('direccion').notEmpty(),
    body('capacidad').isInt({min: 1}),
    body('importe').isFloat({min: 1}),
    salonesControlador.actualizar
);

rutas.delete('/:id',
    verificarToken,
    verificarRol('admin'),
    salonesControlador.eliminar
);

export default rutas;

