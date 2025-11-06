import BdUtils from "./dbUtils.js";

export default class Turnos {
  async findAll() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query("SELECT * FROM turnos WHERE activo = 1");
      return rows;
    } finally {
      await conexion.end();
    }
  }

  async findById(id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query("SELECT * FROM turnos WHERE turno_id = ?", [id]);
      return rows[0];
    } finally {
      await conexion.end();
    }
  }

  async create(turno) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query("INSERT INTO turnos SET ?", [turno]);
      return { ...turno, turno_id: result.insertId };
    } finally {
      await conexion.end();
    }
  }

  async update(turno_id, turno) {
    const conexion = await BdUtils.initConnection();
    try {
      await conexion.query("UPDATE turnos SET ? WHERE turno_id = ?", [turno, turno_id]);
      return { ...turno, turno_id };
    } finally {
      await conexion.end();
    }
  }

  async delete(id) {
  const conexion = await BdUtils.initConnection();
  try {
    const [result] = await conexion.query(
      "UPDATE turnos SET activo = 0, modificado = NOW() WHERE turno_id = ?",
      [id]
    );
    return { eliminado: result.affectedRows > 0 };
  } finally {
    await conexion.end();
  }
}


}
