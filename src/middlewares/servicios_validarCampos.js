import { body } from "express-validator";

export const validarCreate = [
  body("titulo").notEmpty().withMessage("El título es obligatorio"),
  body("importe").isNumeric().withMessage("El importe debe ser un número"),
];

export const validarUpdate = [
  body("titulo").optional().notEmpty(),
  body("importe").optional().isNumeric(),
];
