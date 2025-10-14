import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    check('importe','El importe es obligatorio').not().isEmpty().isNumeric().withMessage('El importe debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];
export const validarUpdate = [
    check('descripcion').optional({ checkFalsy: true }).not().isEmpty().withMessage('La descripción no puede estar vacía'),
    check('importe').optional({ checkFalsy: true }).isNumeric().withMessage('El importe debe ser numérico'),
    (req, res, next) => validarCampos(req, res, next)
];