import BdUtils from "./dbUtils.js";

export default class Reservas {

  async findAll() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(`SELECT * FROM reservas WHERE activo = 1`);
      return rows;
    } finally {
      await conexion.end();
    }
  }

  async findById(id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(
        `SELECT * FROM reservas WHERE reserva_id = ? AND activo = 1`,
        [id]
      );
      return rows[0];
    } finally {
      await conexion.end();
    }
  }

  async findByUserId(usuario_id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(
        `SELECT * FROM reservas WHERE usuario_id = ? AND activo = 1`,
        [usuario_id]
      );
      return rows;
    } finally {
      await conexion.end();
    }
  }

  async create(reserva) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query(`INSERT INTO reservas SET ?`, [reserva]);
      return { ...reserva, reserva_id: result.insertId };
    } finally {
      await conexion.end();
    }
  }

  async update(reserva_id, reserva) {
    const conexion = await BdUtils.initConnection();
    try {
      await conexion.query(`UPDATE reservas SET ? WHERE reserva_id = ?`, [reserva, reserva_id]);
      return { ...reserva, reserva_id };
    } finally {
      await conexion.end();
    }
  }

  async delete(id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query(
        "UPDATE reservas SET activo = 0, modificado = NOW() WHERE reserva_id = ?",
        [id]
      );
      return { eliminado: result.affectedRows > 0 };
    } finally {
      await conexion.end();
    }
  }
}
