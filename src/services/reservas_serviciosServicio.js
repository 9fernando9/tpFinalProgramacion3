import Reserva_servicioDTO from '../db/reserva_servicioDTO.js';
import Reserva_servicio from '../db/reservas_servicios.js';

export default class Reservas_ServiciosServicio {
    constructor() {
        this.reserva_servicio = new Reserva_servicio();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const sqlOrder = Reserva_servicioDTO.getFieldName(order);
        const sqlFilter = Reserva_servicioDTO.toDBFields(filters);
        const strAsc = (asc) ? "ASC " : "DESC ";
        const tableResults = await this.reserva_servicio.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
        const dtoResults = tableResults.map(row => new Reserva_servicioDTO(row["reserva_servicio_id"], row["reserva_id"], row["servicio_id"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.reserva_servicio.findById(id);
        if (!row) return null;
        return new Reserva_servicioDTO(row["reserva_servicio_id"], row["reserva_id"], row["servicio_id"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (reserva_servicio) => {
        const reserva_servicioToInsert = {
            ...reserva_servicio,
            creado: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.reserva_servicio.create(reserva_servicioToInsert);
    }

    update = async (reserva_servicio_id, reserva_servicio) => {
        const row = await this.reserva_servicio.findById(reserva_servicio_id);
        if (!row){
            return null;
        }else{
            const existing = {
                reserva_id: row.reserva_id,
                servicio_id: row.servicio_id,
                activo: row.activo,
                creado: row.creado,
                modificado: row.modificado
            };
            const reserva_servicioToUpdate = {
                ...existing,
                ...reserva_servicio,
                modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
            }
            return this.reserva_servicio.update(reserva_servicio_id, reserva_servicioToUpdate);
        }
    }

    delete = async (reserva_servicio_id) => {
        const reserva_servicioToUpdate = {
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.reserva_servicio.delete(reserva_servicio_id, reserva_servicioToUpdate);
    }

}