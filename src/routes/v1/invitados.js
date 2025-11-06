import express from "express";
import BdUtils from "../../db/dbUtils.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

/* ---------------------------------------------------
   🔹 GET /api/invitados/:reserva_id
   → Obtener lista de invitados de una reserva
--------------------------------------------------- */
router.get("/:reserva_id", async (req, res) => {
  const { reserva_id } = req.params;
  const conexion = await BdUtils.initConnection();
  try {
    const [rows] = await conexion.execute(
      `SELECT * FROM invitados WHERE reserva_id = ? ORDER BY apellido, nombre`,
      [reserva_id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener invitados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});

/* ---------------------------------------------------
   🔹 POST /api/invitados
   → Registrar un nuevo invitado (empleado/admin)
--------------------------------------------------- */
router.post("/", verificarRol([1, 2]), async (req, res) => {
  const { reserva_id, nombre, apellido, telefono, email } = req.body;

  if (!reserva_id || !nombre || !apellido) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const conexion = await BdUtils.initConnection();
  try {
    await conexion.execute(
      `INSERT INTO invitados (reserva_id, nombre, apellido, telefono, email) 
       VALUES (?, ?, ?, ?, ?)`,
      [reserva_id, nombre, apellido, telefono || null, email || null]
    );
    res.json({ mensaje: "Invitado registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar invitado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});

/* ---------------------------------------------------
   🔹 PATCH /api/invitados/:id/confirmar
   → Marcar confirmación de asistencia
--------------------------------------------------- */
router.patch("/:id/confirmar", verificarRol([1, 2]), async (req, res) => {
  const { id } = req.params;
  const { confirmado } = req.body;

  const conexion = await BdUtils.initConnection();
  try {
    const [resultado] = await conexion.execute(
      "UPDATE invitados SET confirmado = ? WHERE invitado_id = ?",
      [confirmado ? 1 : 0, id]
    );
    if (resultado.affectedRows > 0) {
      res.json({ mensaje: "Estado de confirmación actualizado" });
    } else {
      res.status(404).json({ error: "Invitado no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar confirmación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});

/* ---------------------------------------------------
   🔹 DELETE /api/invitados/:id
   → Eliminar un invitado (solo admin)
--------------------------------------------------- */
router.delete("/:id", verificarRol([1]), async (req, res) => {
  const { id } = req.params;
  const conexion = await BdUtils.initConnection();
  try {
    const [resultado] = await conexion.execute(
      "DELETE FROM invitados WHERE invitado_id = ?",
      [id]
    );
    if (resultado.affectedRows > 0) {
      res.json({ mensaje: "Invitado eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Invitado no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar invitado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});

export default router;
