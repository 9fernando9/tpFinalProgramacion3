import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('orden','El orden es obligatorio').not().isEmpty(),
    check('hora_desde','La hora desde es obligatoria').not().isEmpty().isDate().withMessage('La hora desde debe ser una fecha válida'),
    check('hora_hasta','La hora hasta es obligatoria').not().isEmpty().isDate().withMessage('La hora hasta debe ser una fecha válida'),
    (req, res, next) => validarCampos(req, res, next)
];
export const validarUpdate = [
    check('orden').optional({ checkFalsy: true }).not().isEmpty().withMessage('El orden no puede estar vacío'),
    check('hora_desde').optional({ checkFalsy: true }).not().isEmpty().withMessage('La hora desde no puede estar vacía').isDate().withMessage('La hora desde debe ser una fecha válida'),
    check('hora_hasta').optional({ checkFalsy: true }).not().isEmpty().withMessage('La hora hasta no puede estar vacía').isDate().withMessage('La hora hasta debe ser una fecha válida'),
    (req, res, next) => validarCampos(req, res, next)
];