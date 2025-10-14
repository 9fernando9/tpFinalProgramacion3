import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('reserva_id','El ID de la reserva es obligatorio').not().isEmpty().isNumeric().withMessage('El ID de la reserva debe ser numérico'),
    check('servicio_id','El ID del servicio es obligatorio').not().isEmpty().isNumeric().withMessage('El ID del servicio debe ser numérico'),
    check('turno_id','El ID del turno es obligatorio').not().isEmpty().isNumeric().withMessage('El ID del turno debe ser numérico'),
    check('importe','El importe es obligatorio').not().isEmpty().isNumeric().withMessage('El importe debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarUpdate = [
    check('reserva_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID de la reserva no puede estar vacío').isNumeric().withMessage('El ID de la reserva debe ser numérico'),
    check('salon_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del salón no puede estar vacío').isNumeric().withMessage('El ID del salón debe ser numérico'),
    check('usuario_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del usuario no puede estar vacío').isNumeric().withMessage('El ID del usuario debe ser numérico'),
    check('turno_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del turno no puede estar vacío').isNumeric().withMessage('El ID del turno debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];