import DbUtils from './dbUtils.js';

export default class Salones {

  
  async findAll(filters = null, limit = 10, offset = 0, order = "salon_id", asc = "ASC") {
    let sql = 'SELECT * FROM salones WHERE activo = 1';
    const filterValuesArray = [];

    if (filters) {
      sql += ' AND ';
      for (const filter of filters) {
        for (const key of Object.keys(filter)) {
          sql += `${key} = ? AND `;
          filterValuesArray.push(filter[key]);
        }
      }
      sql = sql.slice(0, sql.length - 4); 
    }

    if (order) {
      sql += ` ORDER BY ${order} ${asc}`;
    }
    if (limit > 0) {
      sql += ` LIMIT ? OFFSET ?`;
    }

    const conexion = await DbUtils.initConnection();
    const [rows] = limit > 0
      ? await conexion.execute(sql, [...filterValuesArray, limit, offset])
      : await conexion.execute(sql, [...filterValuesArray]);
    await conexion.end();

    return rows;
  }

  
  async findById(salonId) {
    const strSql = `SELECT * FROM salones WHERE salon_id = ? AND activo = 1`;
    const conexion = await DbUtils.initConnection();
    const [rows] = await conexion.query(strSql, [salonId]);
    await conexion.end();
    return rows.length > 0 ? rows[0] : null;
  }

  
  async create({ titulo, direccion, latitud, longitud, capacidad, importe, activo = 1, creado, modificado }) {
    const strSql = `
      INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo, creado, modificado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const conexion = await DbUtils.initConnection();
    await conexion.query(strSql, [titulo, direccion, latitud, longitud, capacidad, importe, activo, creado, modificado]);
    const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS salon_id');
    await conexion.end();
    return this.findById(rows[0].salon_id);
  }

  
  async update(salon_id, { titulo, direccion, latitud, longitud, capacidad, importe, modificado }) {
    const strSql = `
      UPDATE salones
      SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, modificado = ?
      WHERE salon_id = ? AND activo = 1
    `;
    const conexion = await DbUtils.initConnection();
    await conexion.query(strSql, [titulo, direccion, latitud, longitud, capacidad, importe, modificado, salon_id]);
    await conexion.end();
    return this.findById(salon_id);
  }

  
  async delete(id) {
    const conexion = await DbUtils.initConnection();
    try {
      const [result] = await conexion.query(
        "UPDATE salones SET activo = 0, modificado = NOW() WHERE salon_id = ?",
        [id]
      );
      return { eliminado: result.affectedRows > 0 };
    } finally {
      await conexion.end();
    }
  }
}
