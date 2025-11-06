import DbUtils from "../db/dbUtils.js";

export const obtenerEstadisticas = async (req, res) => {
  try {
    const conexion = await DbUtils.initConnection();
    const [rows] = await conexion.query("CALL estadisticas_reservas();");
    await conexion.end();

    res.status(200).json({ status: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al obtener estadísticas",
      error: error.message,
    });
  }
};
