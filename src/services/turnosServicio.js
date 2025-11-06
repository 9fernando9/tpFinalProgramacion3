import BdUtils from "../db/dbUtils.js";
import TurnoDTO from "../db/turnoDTO.js";
import Turnos from "../db/turnos.js";

export default class TurnosServicio {
  constructor() {
    this.turnos = new Turnos();
  }

  async findAll() {
    const rows = await this.turnos.findAll();
    return rows.map(
      (r) => new TurnoDTO(r.turno_id, r.descripcion, r.hora_inicio, r.hora_fin, r.activo, r.creado, r.modificado)
    );
  }

  async findById(id) {
    const row = await this.turnos.findById(id);
    if (!row) return null;
    return new TurnoDTO(row.turno_id, row.descripcion, row.hora_inicio, row.hora_fin, row.activo, row.creado, row.modificado);
  }

  async create(turno) {
    const turnoToInsert = {
      ...turno,
      activo: 1,
      creado: new Date().toISOString().slice(0, 19).replace("T", " "),
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    return this.turnos.create(turnoToInsert);
  }

  async update(turno_id, turno) {
    const row = await this.turnos.findById(turno_id);
    if (!row) return null;

    const turnoToUpdate = {
      ...row,
      ...turno,
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    return this.turnos.update(turno_id, turnoToUpdate);
  }

  async delete(turno_id) {
    const turnoToUpdate = {
      modificado: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    return this.turnos.delete(turno_id, turnoToUpdate);
  }
}
