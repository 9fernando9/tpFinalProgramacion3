export default class ReservaDTO {
    constructor(reserva_id,fecha_reserva,salon_id,usuario_id,turno_id,foto_cumpleaniero,tematica,importe_salon,importe_total,activo,creado,modificado) {
        this.reserva_id = reserva_id;
        this.fecha_reserva = fecha_reserva;
        this.salon_id = salon_id;
        this.usuario_id = usuario_id;
        this.turno_id = turno_id;
        this.foto_cumpleaniero = foto_cumpleaniero;
        this.tematica = tematica;
        this.importe_salon = importe_salon;
        this.importe_total = importe_total;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }
     
    static toDBFields(usuario) {
        let res = [];
        const claves = Object.keys(usuario);
        for(const i of claves) {
            const objUsuario = {};
            objUsuario[getFieldName(i)] = usuario[i];
            res.push(objUsuario);
        }
        return res;
    }

    static getFieldName(key) {
        const map = {
            reserva_id: 'reserva_id',
            fecha_reserva: 'fecha_reserva',
            salon_id: 'salon_id',
            usuario_id: 'usuario_id',
            turno_id: 'turno_id',
            foto_cumpleaniero: 'foto_cumpleaniero',
            tematica: 'tematica',
            importe_salon: 'importe_salon',
            importe_total: 'importe_total',
            activo: 'activo',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}