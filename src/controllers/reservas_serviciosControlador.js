import Reserva_Servicio from '../services/reservas_serviciosServicio.js';

export default class Reserva_ServicioControlador {
    constructor() {
        this.reserva_Servicio = new Reserva_Servicio();
    }

    getAllReservas_Servicios = async(req, res) => {
        
        const reserva_id = req.body.reserva_id;
        const servicio_id = req.body.servicio_id;
        const importe = req.body.importe;
        const turno_id = req.body.turno_id;
          
        
        const limit = req.body.limit;
        const offset = req.body.offset;
        const order = req.body.order;
        const asc = req.body.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "reserva_servicio_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};

            const reservas_servicios = await this.reserva_Servicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:turnos
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los reservas_servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const reserva_servicio_id = Number(req.params.reserva_servicio_id);

        if (!Number.isInteger(reserva_servicio_id)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }
        try{
            const reserva_servicio = await this.reserva_Servicio.findById(reserva_servicio_id);
            if (!reserva_servicio) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Reserva de servicio no encontrado"
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:reserva_servicio
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los reservas_servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const reserva_servicio = {
                reserva_id: body.reserva_id,
                servicio_id: body.servicio_id,
                importe: body.importe,
                turno_id: body.turno_id,
                activo: "1"
            };
            const reserva_servicioCreado = await this.reserva_Servicio.create(reserva_servicio);
            res.status(201).send({ 
                status:true,
                data: reserva_servicioCreado
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
        const reserva_servicio_id = Number(req.params.reserva_servicio_id);

        if (!Number.isInteger(reserva_servicio_id)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro reserva_servicio_id debe ser un numero positivo"
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
            const reserva_servicioActualizado = await this.reserva_Servicio.update(reserva_servicio_id, body);
            if (!reserva_servicioActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Reserva de servicio no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:reserva_servicioActualizado
                });
            }
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}