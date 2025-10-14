export default class ServicioDTO {
    constructor(servicio_id,descripcion,importe,activo,creado,modificado) {
        this.servicio_id = servicio_id;
        this.descripcion = descripcion;
        this.importe = importe;
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
            servicio_id: 'servicio_id',
            descripcion: 'descripcion',
            importe: 'importe',
            activo: 'activo',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}