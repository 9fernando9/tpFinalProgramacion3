import { Router } from "express";
import * as TurnosControlador from "../../controllers/turnosControlador.js";
import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();


router.get(
  "/",
  verificarToken,
  verificarRol(["cliente", "empleado", "admin"]),
  TurnosControlador.getAllTurnos
);

router.get(
  "/:turnoId",
  verificarToken,
  verificarRol(["cliente", "empleado", "admin"]),
  TurnosControlador.findById
);


router.post(
  "/",
  [
    verificarToken,
    verificarRol(["empleado", "admin"]),
    body("descripcion", "La descripción es obligatoria").notEmpty(),
    body("hora_inicio", "La hora de inicio debe tener formato HH:MM:SS").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    body("hora_fin", "La hora de fin debe tener formato HH:MM:SS").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    validarCampos,
  ],
  TurnosControlador.create
);


router.put(
  "/:turnoId",
  [
    verificarToken,
    verificarRol(["empleado", "admin"]),
    body("descripcion").optional().notEmpty(),
    body("hora_inicio").optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    body("hora_fin").optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
    validarCampos,
  ],
  TurnosControlador.update
);


router.delete(
  "/:turnoId",
  verificarToken,
  verificarRol(["empleado", "admin"]),
  TurnosControlador.remove
);

export default router;
