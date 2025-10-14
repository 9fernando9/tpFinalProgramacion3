import servicioDTO from '../db/servicioDTO.js';
import servicios from '../db/servicios.js';

export default class serviciosServicio {
    constructor() {
        this.servicios = new servicios();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const sqlOrder = servicioDTO.getFieldName(order);
        const sqlFilter = servicioDTO.toDBFields(filters);
        const strAsc = (asc) ? "ASC " : "DESC ";
        const tableResults = await this.servicios.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
        const dtoResults = tableResults.map(row => new servicioDTO(row["servicio_id"],row["fecha_reserva"],row["salon_id"],row["usuario_id"],row["turno_id"],row["foto_cumpleaniero"],row["tematica"],row["importe_salon"],row["importe_total"],row["activo"],row["creado"],row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.servicios.findById(id);
        if (!row) return null;
        return new servicioDTO(row["servicio_id"], row["fecha_reserva"], row["salon_id"], row["usuario_id"], row["turno_id"], row["foto_cumpleaniero"], row["tematica"], row["importe_salon"], row["importe_total"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (servicio) => {
        const servicioToInsert = {
            ...servicio,
            creado: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.servicios.create(servicioToInsert);
    }

    update = async (servicio_id, servicio) => {
        const row = await this.servicios.findById(servicio_id);
        if (!row){
            return null;
        }else{
            const existing = {
                orden: row.orden,
                hora_desde: row.hora_desde,
                hora_hasta: row.hora_hasta,
                activo: row.activo,
                creado: row.creado,
                modificado: row.modificado
            };
            const servicioToUpdate = {
                ...existing,
                ...servicio,
                modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
            }
            return this.servicios.update(servicio_id, servicioToUpdate);
        }
    }
     
    delete = async (servicio_id) => {
        const servicioToUpdate = {
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.servicios.delete(servicio_id, servicioToUpdate);
    }

}