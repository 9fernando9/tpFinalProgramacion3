import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('fecha_reserva','La fecha de reserva es obligatoria').not().isEmpty().isDate().withMessage('La fecha debe ser una fecha válida'),
    check('salon_id','El ID del salón es obligatorio').not().isEmpty(),
    check('usuario_id','El ID del usuario es obligatorio').not().isEmpty(),
    check('turno_id','El ID del turno es obligatorio').not().isEmpty(),
    check('tematica','La temática es obligatoria').not().isEmpty(),
    check('importe_salon','El importe del salón es obligatorio').isFloat(),
    check('importe_total','El importe total es obligatorio').isFloat(),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarUpdate = [
    check('fecha_reserva').optional({ checkFalsy: true }).not().isEmpty().withMessage('La fecha de reserva no puede estar vacía').isDate().withMessage('La fecha debe ser una fecha válida'),
    check('salon_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del salón no puede estar vacío'),
    check('usuario_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del usuario no puede estar vacío'),
    check('turno_id').optional({ checkFalsy: true }).not().isEmpty().withMessage('El ID del turno no puede estar vacío'),
    check('tematica').optional({ checkFalsy: true }).not().isEmpty().withMessage('La temática no puede estar vacía'),
    check('importe_salon').optional({ checkFalsy: true }).isFloat().withMessage('El importe del salón debe ser numérico'),
    check('importe_total').optional({ checkFalsy: true }).isFloat().withMessage('El importe total debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];