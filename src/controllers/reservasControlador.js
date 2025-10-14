import reservasServicio from '../services/reservasServicio.js';

export default class ReservasControlador {
    constructor() {
        this.reservasServicio = new reservasServicio();
    }

    getAllReservas = async(req, res) => {
        //Filtros
        const fecha_reserva = req.body.fecha_reserva;
        const salon_id = req.body.salon_id;
        const usuario_id = req.body.usuario_id;
        const turno_id = req.body.turno_id;
        const tematica = req.body.tematica;
        const importe_salon = req.body.importe_salon;
        const importe_total = req.body.importe_total;
        const activo = req.body.activo;
          
        //Paginación
        const limit = req.body.limit;
        const offset = req.body.offset;
        const order = req.body.order;
        const asc = req.body.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "reserva_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};

            const reservas = await this.reservasServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:reservas
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los reservas",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const reservaId = Number(req.params.reservaId);

        if (!Number.isInteger(reservaId)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }

        try{
            const reserva = await this.reservasServicio.findById(reservaId);
            if (!reserva) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Reserva no encontrada."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:reserva
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer las reservas",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const reserva = {
                fecha_reserva: body.fecha_reserva,
                salon_id: body.salon_id,
                usuario_id: body.usuario_id,
                turno_id: body.turno_id,
                foto_cumpleaniero: body.foto_cumpleaniero,
                tematica: body.tematica,
                importe_salon: body.importe_salon,
                importe_total: body.importe_total,
                activo: "1"
            };
            const reservaCreada = await this.reservasServicio.create(reserva);
            res.status(201).send({ 
                status:true,
                data: reservaCreada
            });
        } catch (error) {
            res.status(error?.status || 500).send({ 
                    status:false,
                    data: { error: error?.message || error,errorDetails: error.message }
                });
        }
    }

    update = async (req, res) => {
        const body = req.body;
        const reservaId = Number(req.params.reservaId);

        if (!Number.isInteger(reservaId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro reservaId debe ser un numero positivo"
                    }
                });
        }
        if(Object.keys(body).length === 0){
            res.status(400).send({
                status:false,
                data:{ error: 'El cuerpo de la solicitud no debe estar vacío' }
            });
        }
        try {
            const reservaActualizado = await this.reservasServicio.update(reservaId, body);
            if (!reservaActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Reserva no encontrada' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:reservaActualizado
                });
            }
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

    delete = async (req, res) => {
        const reservaId = Number(req.params.reservaId);
        if (!Number.isInteger(reservaId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro reservaId debe ser un numero positivo."
                    }
                });
        }
        try {
            const reservaEliminada = await this.reservasServicio.delete(reservaId);
            res.status(200).send({
                status:true,
                data:reservaEliminada
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}