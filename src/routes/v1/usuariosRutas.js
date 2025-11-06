import { Router } from "express";
import {
  getAllUsuarios,
  findById,
  create,
  update,
  remove,
} from "../../controllers/usuariosControlador.js";

import { verificarToken } from "../../middlewares/authMiddleware.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";
import { body } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get("/", verificarToken, verificarRol(["empleado", "admin"]), getAllUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:usuarioId", verificarToken, verificarRol(["empleado", "admin"]), findById);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario (solo admin)
 *     tags: [Usuarios]
 */
router.post(
  "/",
  [
    verificarToken,
    verificarRol(["admin"]),
    body("nombre", "El nombre es obligatorio").notEmpty(),
    body("nombre_usuario", "El nombre de usuario es obligatorio").notEmpty(),
    body("email", "El email debe tener formato válido").isEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    body("tipo_usuario", "El tipo de usuario debe ser un número válido").isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  create
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente (solo admin)
 *     tags: [Usuarios]
 */
router.put(
  "/:usuarioId",
  [
    verificarToken,
    verificarRol(["admin"]),
    body("nombre").optional().notEmpty(),
    body("nombre_usuario").optional().notEmpty(),
    body("email").optional().isEmail(),
    body("tipo_usuario").optional().isInt({ min: 1, max: 3 }),
    validarCampos,
  ],
  update
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Realiza un soft delete del usuario (solo admin)
 *     tags: [Usuarios]
 */
router.delete("/:usuarioId", verificarToken, verificarRol(["admin"]), remove);

export default router;
