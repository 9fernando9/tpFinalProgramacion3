import SalonDTO from '../db/salonDTO.js';
import Salones from '../db/Salones.js';

export default class SalonesService {
    constructor() {
        this.salones = new Salones();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const sqlFilter = SalonDTO.toDBFields(filters);
        const sqlOrder = SalonDTO.getFieldName(order);
        const strAsc = (asc) ? "ASC " : "DESC ";
        const tableResults = await this.salones.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
        const dtoResults = tableResults.map(row => new SalonDTO(row["salon_id"], row["titulo"], row["direccion"], row["latitud"], row["longitud"], row["capacidad"], row["importe"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.salones.findById(id);
        return new SalonDTO(row["salon_id"], row["titulo"], row["direccion"], row["latitud"], row["longitud"], row["capacidad"], row["importe"], row["activo"], row["creado"], row["modificado"]);
    }

    create = async (salon) => {
        const salonToInsert = {
            ...salon,
            creado: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.salones.create(salonToInsert);
    }

    update = async (salon_id, salon) => {
        const salonToUpdate = {
            ...salon,
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.salones.update(salon_id, salonToUpdate);
    }

    delete = async (salon_id) => {
        const salonToUpdate = {
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.salones.delete(salon_id, salonToUpdate);
    }

}