import { check } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarCreate = [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('nombre_usuario','El nombre de usuario es obligatorio').not().isEmpty().isEmail().withMessage('El nombre de usuario debe ser un email válido'),
    check('contrasenia','La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({min:6}),
    check('tipo_usuario','El tipo de usuario es obligatorio y debe ser un número').isNumeric(),
    check('celular').optional({ checkFalsy: true }).not().isEmpty().withMessage('El celular es obligatorio'),
    (req, res, next) => validarCampos(req, res, next)
];

export const validarUpdate = [
    check('nombre').optional({ checkFalsy: true }).not().isEmpty().withMessage('El nombre no puede estar vacío'),
    check('apellido').optional({ checkFalsy: true }).not().isEmpty().withMessage('El apellido no puede estar vacío'),
    check('nombre_usuario').optional({ checkFalsy: true }).not().isEmpty().withMessage('El nombre de usuario no puede estar vacío').isEmail().withMessage('El nombre de usuario debe ser un email válido'),
    check('contrasenia').optional({ checkFalsy: true }).isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('tipo_usuario').optional({ checkFalsy: true }).isNumeric().withMessage('El tipo de usuario debe ser un número'),
    check('celular').optional({ checkFalsy: true }).not().isEmpty().withMessage('El celular no puede estar vacío'),
    (req, res, next) => validarCampos(req, res, next)
];