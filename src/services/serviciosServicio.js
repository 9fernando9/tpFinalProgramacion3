import BdUtils from "../db/dbUtils.js";

export default class ServiciosServicio {
  async fillAll(filters, limit, offset, order, asc) {
    const conexion = await BdUtils.initConnection();
    try {
      let sql = "SELECT * FROM servicios WHERE 1=1";
      const params = [];

      if (filters.titulo) {
        sql += " AND titulo LIKE ?";
        params.push(`%${filters.titulo}%`);
      }
      if (filters.activo !== undefined) {
        sql += " AND activo = ?";
        params.push(filters.activo);
      }

      sql += ` ORDER BY ${order} ${asc ? "ASC" : "DESC"}`;
      if (limit > 0) sql += " LIMIT ?";
      if (offset > 0) sql += " OFFSET ?";
      if (limit > 0) params.push(limit);
      if (offset > 0) params.push(offset);

      const [rows] = await conexion.query(sql, params);
      return rows;
    } finally {
      await conexion.end();
    }
  }

  async findById(id) {
    const conexion = await BdUtils.initConnection();
    const [rows] = await conexion.query("SELECT * FROM servicios WHERE servicio_id = ?", [id]);
    await conexion.end();
    return rows[0] || null;
  }

  async create(servicio) {
    const conexion = await BdUtils.initConnection();
    const [result] = await conexion.query("INSERT INTO servicios SET ?", [servicio]);
    await conexion.end();
    return { servicio_id: result.insertId, ...servicio };
  }

  async update(id, servicio) {
    const conexion = await BdUtils.initConnection();
    const [result] = await conexion.query("UPDATE servicios SET ? WHERE servicio_id = ?", [servicio, id]);
    await conexion.end();
    return result.affectedRows > 0 ? { servicio_id: id, ...servicio } : null;
  }

  async delete(id) {
    const conexion = await BdUtils.initConnection();
    const [result] = await conexion.query("UPDATE servicios SET activo = 0 WHERE servicio_id = ?", [id]);
    await conexion.end();
    return result.affectedRows > 0 ? { servicio_id: id, eliminado: true } : null;
  }
}
