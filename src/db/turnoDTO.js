export default class TurnoDTO {
  constructor(turno_id, descripcion, hora_inicio, hora_fin, activo, creado, modificado) {
    this.turno_id = turno_id;
    this.descripcion = descripcion;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.activo = activo;
    this.creado = creado;
    this.modificado = modificado;
  }
}
