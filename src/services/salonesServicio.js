import BdUtils from "../db/dbUtils.js";
import SalonDTO from "../db/salonDTO.js";
import Salones from "../db/salones.js";

export default class SalonesServicio {
  constructor() {
    this.salones = new Salones();
  }

  
  async fillAll(filters, limit, offset, order, asc) {
    const conexion = await BdUtils.initConnection();
    try {
      let sql = "SELECT * FROM salones WHERE 1=1";
      const params = [];

      if (filters.titulo) {
        sql += " AND titulo LIKE ?";
        params.push(`%${filters.titulo}%`);
      }

      if (filters.capacidad) {
        sql += " AND capacidad >= ?";
        params.push(filters.capacidad);
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
      return rows.map(
        (row) =>
          new SalonDTO(
            row.salon_id,
            row.titulo,
            row.direccion,
            row.latitud,
            row.longitud,
            row.capacidad,
            row.importe,
            row.activo,
            row.creado,
            row.modificado
          )
      );
    } catch (error) {
      console.error(" Error en fillAll:", error.message);
      throw error;
    } finally {
      await conexion.end();
    }
  }

 
  async findById(id) {
    const row = await this.salones.findById(id);
    if (!row) return null;
    return new SalonDTO(
      row["salon_id"],
      row["titulo"],
      row["direccion"],
      row["latitud"],
      row["longitud"],
      row["capacidad"],
      row["importe"],
      row["activo"],
      row["creado"],
      row["modificado"]
    );
  }

 
  async create(salon) {
    const salonToInsert = {
      ...salon,
      creado: new Date().toISOString().slice(0, 19).replace("T", " "),
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    return this.salones.create(salonToInsert);
  }

 
  async update(salon_id, salon) {
    const row = await this.salones.findById(salon_id);
    if (!row) return null;

    const existing = {
      titulo: row.titulo,
      direccion: row.direccion,
      latitud: row.latitud,
      longitud: row.longitud,
      capacidad: row.capacidad,
      importe: row.importe,
      activo: row.activo,
    };

    const salonToUpdate = {
      ...existing,
      ...salon,
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    return this.salones.update(salon_id, salonToUpdate);
  }

  
 async remove(salon_id) {
  const conexion = await BdUtils.initConnection();
  try {
    const [result] = await conexion.query("DELETE FROM salones WHERE salon_id = ?", [salon_id]);
    return result;
  } finally {
    await conexion.end();
  }
}
}
