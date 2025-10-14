import reservaDTO from '../db/reservaDTO.js';
import reservas from '../db/reservas.js';

export default class reservasreserva {
    constructor() {
        this.reservas = new reservas();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const sqlOrder = reservaDTO.getFieldName(order);
        const sqlFilter = reservaDTO.toDBFields(filters);
        const strAsc = (asc) ? "ASC " : "DESC ";
        const tableResults = await this.reservas.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
        const dtoResults = tableResults.map(row => new reservaDTO(row["reserva_id"], row['fecha_reserva'], row['salon_id'], row['usuario_id'], row['turno_id'], row['foto_cumpleaniero'], row['tematica'], row['importe_salon'], row['importe_total'], row['activo'], row['creado'], row['modificado']));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.reservas.findById(id);
        if (!row) return null;
        return new reservaDTO(row["reserva_id"], row['fecha_reserva'], row['salon_id'], row['usuario_id'], row['turno_id'], row['foto_cumpleaniero'], row['tematica'], row['importe_salon'], row['importe_total'], row['activo'], row['creado'], row['modificado']);
    }

    create = async (reserva) => {
        const reservaToInsert = {
            ...reserva,
            creado: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.reservas.create(reservaToInsert);
    }

    update = async (reserva_id, reserva) => {
        const row = await this.reservas.findById(reserva_id);
        if (!row){
            return null;
        }else{
            const existing = {
                fecha_reserva: row.fecha_reserva,
                salon_id: row.salon_id,
                usuario_id: row.usuario_id,
                turno_id: row.turno_id,
                foto_cumpleaniero: row.foto_cumpleaniero,
                tematica: row.tematica,
                importe_salon: row.importe_salon,
                importe_total: row.importe_total,
                activo: row.activo,
                creado: row.creado,
                modificado: row.modificado
            };
            const reservaToUpdate = {
                ...existing,
                ...reserva,
                modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
            }
            return this.reservas.update(reserva_id, reservaToUpdate);
        }
    }
     
    delete = async (reserva_id) => {
        const reservaToUpdate = {
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.reservas.delete(reserva_id, reservaToUpdate);
    }

}