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
        const dtoResults = tableResults.map(row => new servicioDTO(row["servicio_id"],row["descripcion"],row["importe"],row["importe"],row["activo"],row["creado"],row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.servicios.findById(id);
        if (!row) return null;
        return new servicioDTO(row["servicio_id"], row["descripcion"], row["importe"], row["activo"], row["creado"], row["modificado"]);
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
                descripcion: row.descripcion,
                importe: row.importe,
                activo: row.activo,
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