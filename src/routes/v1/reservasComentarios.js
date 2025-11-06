import express from "express";
import BdUtils from "../../db/dbUtils.js";
import { verificarRol } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", verificarRol([1]), async (req, res) => {
  const conexion = await BdUtils.initConnection();
  try {
    const [rows] = await conexion.execute(
      `SELECT rc.*, u.nombre, u.apellido, r.reserva_id
       FROM reservas_comentarios rc
       JOIN usuarios u ON rc.usuario_id = u.usuario_id
       JOIN reservas r ON rc.reserva_id = r.reserva_id
       ORDER BY rc.fecha_comentario DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener todos los comentarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});


router.get("/:reserva_id", async (req, res) => {
  const { reserva_id } = req.params;
  const conexion = await BdUtils.initConnection();
  try {
    const [rows] = await conexion.execute(
      `SELECT rc.*, u.nombre, u.apellido
       FROM reservas_comentarios rc
       JOIN usuarios u ON rc.usuario_id = u.usuario_id
       WHERE rc.reserva_id = ?
       ORDER BY rc.fecha_comentario DESC`,
      [reserva_id]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});


router.post("/", verificarRol([1, 2]), async (req, res) => {
  const { reserva_id, usuario_id, comentario } = req.body;
  if (!reserva_id || !usuario_id || !comentario) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const conexion = await BdUtils.initConnection();
  try {
    await conexion.execute(
      "INSERT INTO reservas_comentarios (reserva_id, usuario_id, comentario) VALUES (?, ?, ?)",
      [reserva_id, usuario_id, comentario]
    );
    res.json({ mensaje: "Comentario agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});


router.delete("/:id", verificarRol([1]), async (req, res) => {
  const { id } = req.params;
  const conexion = await BdUtils.initConnection();
  try {
    const [resultado] = await conexion.execute(
      "DELETE FROM reservas_comentarios WHERE comentario_id = ?",
      [id]
    );
    if (resultado.affectedRows > 0) {
      res.json({ mensaje: "Comentario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    await conexion.end();
  }
});

export default router;

