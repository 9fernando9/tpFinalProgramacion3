import { Router } from "express";
import {
  getAllServicios,
  findById,
  create,
  update,
  remove
} from "../../controllers/serviciosControlador.js";
import { validarCreate, validarUpdate } from "../../middlewares/servicios_validarCampos.js";
import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";

const router = Router();




router.get("/", verificarToken, verificarRol(["cliente", "empleado", "admin"]), getAllServicios);
router.get("/:servicioId", verificarToken, verificarRol(["cliente", "empleado", "admin"]), findById);


router.post("/", verificarToken, verificarRol(["empleado", "admin"]), validarCreate, create);
router.put("/:servicioId", verificarToken, verificarRol(["empleado", "admin"]), validarUpdate, update);
router.delete("/:servicioId", verificarToken, verificarRol(["empleado", "admin"]), remove);

export default router;

