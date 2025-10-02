export default class SalonDTO {
    constructor(salon_id, titulo, direccion, latitud, longitud, capacidad, importe, activo, creado, modificado) {
        this.salon_id = salon_id;
        this.titulo = titulo;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.capacidad = capacidad;
        this.importe = importe;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }

    static toDBFields(salon) {
        let res = [];
        const claves = Object.keys(salon);
        for(const i of claves) {
            const objSalon = {};
            objSalon[getFieldName(i)] = salon[i];
            res.push(objSalon);
        }
        return res;
    }

    static getFieldName(key) {
        const map = {
            salon_id: 'salon_id',
            titulo: 'titulo',
            direccion: 'direccion',
            latitud: 'latitud',
            longitud: 'longitud',
            capacidad: 'capacidad',
            importe: 'importe',
            activo: 'activo',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}