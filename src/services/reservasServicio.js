import Reservas from "../db/reservas.js";
import ReservaDTO from "../db/reservaDTO.js";
import BdUtils from "../db/dbUtils.js";

export default class ReservasServicio {
  constructor() {
    this.reservas = new Reservas();
  }

  
  async findAll() {
    try {
      const rows = await this.reservas.findAll();
      return rows.map(
        (r) =>
          new ReservaDTO(
            r.reserva_id,
            r.usuario_id,
            r.salon_id,
            r.turno_id,
            r.fecha_reserva,
            r.tematica,
            r.importe_total,
            r.activo,
            r.creado,
            r.modificado
          )
      );
    } catch (error) {
      throw new Error("Error al obtener las reservas: " + error.message);
    }
  }

 
  async findById(id) {
    if (!id || isNaN(id)) throw new Error("El ID de la reserva no es válido");

    const row = await this.reservas.findById(id);
    if (!row) return null;

    return new ReservaDTO(
      row.reserva_id,
      row.usuario_id,
      row.salon_id,
      row.turno_id,
      row.fecha_reserva,
      row.tematica,
      row.importe_total,
      row.activo,
      row.creado,
      row.modificado
    );
  }

  
  async findByUserId(usuario_id) {
    if (!Number.isInteger(usuario_id))
      throw new Error("El ID del usuario no es válido");

    const rows = await this.reservas.findByUserId(usuario_id);
    return rows.map(
      (r) =>
        new ReservaDTO(
          r.reserva_id,
          r.usuario_id,
          r.salon_id,
          r.turno_id,
          r.fecha_reserva,
          r.tematica,
          r.importe_total,
          r.activo,
          r.creado,
          r.modificado
        )
    );
  }

 
  async create(reserva) {
    if (
      !reserva.fecha_reserva ||
      !reserva.salon_id ||
      !reserva.usuario_id ||
      !reserva.turno_id ||
      !reserva.tematica ||
      !reserva.importe_total
    ) {
      throw new Error("Faltan campos obligatorios para crear la reserva");
    }

    const reservaToInsert = {
      ...reserva,
      activo: 1,
      creado: new Date().toISOString().slice(0, 19).replace("T", " "),
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      return await this.reservas.create(reservaToInsert);
    } catch (error) {
      throw new Error("Error al crear la reserva: " + error.message);
    }
  }

  
  async update(reserva_id, reserva) {
    if (!Number.isInteger(reserva_id))
      throw new Error("El ID de reserva no es válido");

    const existente = await this.reservas.findById(reserva_id);
    if (!existente) return null;

    const reservaToUpdate = {
      ...existente,
      ...reserva,
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      return await this.reservas.update(reserva_id, reservaToUpdate);
    } catch (error) {
      throw new Error("Error al actualizar la reserva: " + error.message);
    }
  }

 
  async delete(reserva_id) {
    if (!Number.isInteger(reserva_id))
      throw new Error("El ID de reserva no es válido");

    try {
      return await this.reservas.delete(reserva_id);
    } catch (error) {
      throw new Error("Error al eliminar la reserva: " + error.message);
    }
  }

  
  async getUsuarioById(id) {
    if (!Number.isInteger(id))
      throw new Error("El ID del usuario no es válido");

    const conexion = await BdUtils.initConnection();

    try {
      const [rows] = await conexion.query(
        "SELECT * FROM usuarios WHERE usuario_id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error("Error al buscar usuario: " + error.message);
    } finally {
      await conexion.end();
    }
  }
}
