export default class TurnoDTO {
    constructor(turno_id,orden,hora_desde,hora_hasta,activo,creado,modificado) {
        this.turno_id = turno_id;
        this.orden = orden;
        this.hora_desde = hora_desde;
        this.hora_hasta = hora_hasta;
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
            turno_id: 'turno_id',
            orden: 'orden',
            hora_desde: 'hora_desde',
            hora_hasta: 'hora_hasta',
            activo: 'activo',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}