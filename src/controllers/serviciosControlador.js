import servicioServicio from '../services/serviciosServicio.js';

export default class ServicioControlador {
    constructor() {
        this.servicioServicio = new servicioServicio();
    }

    getAllServicios = async(req, res) => {
        //Filtros
        const descripcion = req.body.descripcion;
        const importe = req.body.importe;
        const activo = req.body.activo;
          
        //Paginación
        const limit = req.body.limit;
        const offset = req.body.offset;
        const order = req.body.order;
        const asc = req.body.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "servicio_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};

            const servicios = await this.servicioServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:servicios
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const servicioId = Number(req.params.servicioId);
        if (!Number.isInteger(servicioId)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }
        try{
            const servicio = await this.servicioServicio.findById(servicioId);
            if (!servicio) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Servicio no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:servicio
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los servicios",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        try {
            const servicio = {
                descripcion: body.descripcion,
                importe: body.importe,
                activo: "1"
            };
            const servicioCreado = await this.servicioServicio.create(servicio);
            res.status(201).send({ 
                status:true,
                data: servicioCreado
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
        const turnoId = Number(req.params.turnoId);
        if (!Number.isInteger(turnoId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro seervicioId debe ser un numero positivo"
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
            const servicioActualizado = await this.servicioServicio.update(servicioId, body);
            if (!servicioActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Servicio no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:servicioActualizado
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
        const servicioId = Number(req.params.servicioId);
        if (!Number.isInteger(servicioId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro servicioId debe ser un numero positivo."
                    }
                });
        }
        try {
            const servicioEliminado = await this.servicioServicio.delete(servicioId);
            res.status(200).send({
                status:true,
                data:servicioEliminado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}