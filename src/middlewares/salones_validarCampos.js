import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('capacidad','La capacidad es obligatoria').isNumeric(),
    check('importe','El importe es obligatorio').isNumeric(),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarUpdate = [
    check('titulo').optional({ checkFalsy: true }).not().isEmpty().withMessage('El titulo no puede estar vacío'),
    check('direccion').optional({ checkFalsy: true }).not().isEmpty().withMessage('La direccion no puede estar vacía'),
    check('capacidad').optional({ checkFalsy: true }).isNumeric().withMessage('La capacidad debe ser numérica'),
    check('importe').optional({ checkFalsy: true }).isNumeric().withMessage('El importe debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];