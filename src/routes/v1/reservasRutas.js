import { Router } from "express";
import { body } from "express-validator";
import {
  getAllReservas,
  findById,
  create,
  update,
  remove
} from "../../controllers/reservasControlador.js";
import { generarReportePDF } from "../../controllers/reportesControlador.js";
import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               salon_id:
 *                 type: integer
 *               turno_id:
 *                 type: integer
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */


router.get("/reportes/pdf", verificarToken, verificarRol(["admin"]), generarReportePDF);


router.get("/", verificarToken, verificarRol(["cliente", "empleado", "admin"]), getAllReservas);


router.get("/:reservaId", verificarToken, verificarRol(["cliente", "empleado", "admin"]), findById);


router.post(
  "/",
  [
    verificarToken,
    verificarRol(["cliente"]),
    body("fecha_reserva", "La fecha es obligatoria").notEmpty(),
    body("salon_id", "El salón es obligatorio").isInt(),
    body("turno_id", "El turno es obligatorio").isInt(),
    body("tematica", "La temática es obligatoria").notEmpty(),
    body("importe_total", "El importe debe ser un número").isFloat(),
    validarCampos
  ],
  create
);


router.put("/:reservaId", verificarToken, verificarRol(["admin"]), update);


router.delete("/:reservaId", verificarToken, verificarRol(["admin"]), remove);

export default router;
