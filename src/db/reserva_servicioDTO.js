export default class Reserva_ServicioDTO {
    constructor(reserva_servicio_id,reserva_id,servicio_id,importe,creado,modificado) {
        this.reserva_servicio_id = reserva_servicio_id;
        this.reserva_id = reserva_id;
        this.servicio_id = servicio_id;
        this.importe = importe;
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
            reserva_servicio_id: 'reserva_servicio_id',
            reserva_id: 'reserva_id',
            servicio_id: 'servicio_id',
            turno_id: 'turno_id',
            importe: 'importe',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}