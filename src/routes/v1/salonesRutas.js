import { Router } from "express";
import {
  getAllSalones,
  findById,
  create,
  update,
  remove
} from "../../controllers/salonesControlador.js";

import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";          
import { validarCampos } from "../../middlewares/validarCampos.js"; 

const router = Router();




router.get("/", verificarToken, verificarRol(["cliente", "empleado", "admin"]), getAllSalones);
router.get("/:salonId", verificarToken, verificarRol(["cliente", "empleado", "admin"]), findById);


router.post(
  "/",
  [
    verificarToken,
    verificarRol(["empleado", "admin"]),
    body("titulo", "El título es obligatorio").notEmpty(),
    body("direccion", "La dirección es obligatoria").notEmpty(),
    body("capacidad", "La capacidad debe ser un número entero").isInt(),
    body("importe", "El importe debe ser un número").isFloat(),
    validarCampos
  ],
  create
);


router.put(
  "/:salonId",
  [
    verificarToken,
    verificarRol(["empleado", "admin"]),
    body("titulo").optional().notEmpty(),
    body("direccion").optional().notEmpty(),
    body("capacidad").optional().isInt(),
    body("importe").optional().isFloat(),
    validarCampos
  ],
  update
);


router.delete("/:salonId", verificarToken, verificarRol(["empleado", "admin"]), remove);

export default router;
