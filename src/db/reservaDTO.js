export default class ReservaDTO {
  constructor(reserva_id, usuario_id, salon_id, turno_id, fecha, total, activo, creado, modificado) {
    this.reserva_id = reserva_id;
    this.usuario_id = usuario_id;
    this.salon_id = salon_id;
    this.turno_id = turno_id;
    this.fecha = fecha;
    this.total = total;
    this.activo = activo;
    this.creado = creado;
    this.modificado = modificado;
  }
}
