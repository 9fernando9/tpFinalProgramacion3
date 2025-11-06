import BdUtils from "../db/dbUtils.js";

const encuestasControlador = {
  listar: async (req, res) => {
    const conexion = await BdUtils.initConnection(); 

    const sql = `
      SELECT e.encuesta_id, e.reserva_id, e.puntuacion, e.comentario, e.fecha_encuesta,
             u.nombre AS cliente, s.titulo AS salon, r.fecha_reserva
      FROM encuestas e
      JOIN reservas r ON e.reserva_id = r.reserva_id
      JOIN usuarios u ON r.usuario_id = u.usuario_id
      JOIN salones s ON r.salon_id = s.salon_id
      ORDER BY e.fecha_encuesta DESC
    `;
    const [results] = await conexion.query(sql);
    res.json(results);
  },

  nueva: async (req, res) => {
    const conexion = await BdUtils.initConnection();
    const { reserva_id } = req.params;

    const [results] = await conexion.query(
      `SELECT r.reserva_id, u.nombre AS cliente, s.titulo AS salon, r.fecha_reserva
       FROM reservas r
       JOIN usuarios u ON r.usuario_id = u.usuario_id
       JOIN salones s ON r.salon_id = s.salon_id
       WHERE r.reserva_id = ?`,
      [reserva_id]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json({
      message: "Reserva encontrada",
      reserva: results[0],
    });
  },

  guardar: async (req, res) => {
    const conexion = await BdUtils.initConnection();
    const { reserva_id, puntuacion, comentario } = req.body;

    const sql =
      "INSERT INTO encuestas (reserva_id, puntuacion, comentario) VALUES (?, ?, ?)";
    const [result] = await conexion.query(sql, [
      reserva_id,
      puntuacion,
      comentario,
    ]);

    res.status(201).json({
      message: "Encuesta guardada correctamente",
      encuesta_id: result.insertId,
    });
  },
};

export default encuestasControlador;


