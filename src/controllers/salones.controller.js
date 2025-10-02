import salonesService from '../services/salones.service.js';

export default class SalonesController {
    constructor() {
        this.salonesService = new salonesService();
    }

    getAllSalones = async(req, res) => {
         //Filtros
        const titulo = req.query.titulo;
        const capacidad = req.query.capacidad;
        const activo = req.query.activo;
          
        //Paginación
        const limit = req.query.limit;
        const offset = req.query.offset;
        const order = req.query.order;
        const asc = req.query.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "salon_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};
            if (titulo) filters.titulo = titulo;
            if (capacidad) filters.capacidad = capacidad;
            if (activo) filters.activo = activo;
            const salones = await this.salonesService.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:salones
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los salones",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const salonId = Number(req.params.salonId);

        if (!Number.isInteger(salonId)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }

        try{
            const salon = await this.salonesService.findById(salonId);
            if (!salon) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Salon no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:salon
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los salones",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        if (!body.titulo|| !body.direccion|| !body.latitud|| !body.longitud|| !body.capacidad|| !body.importe) {
            res
                .status(404)
                .send({
                    status:false,
                    data: {
                        error: "Uno de los siguientes data falta o es vacío: 'titulo', 'direccion', 'latitud', 'longitud', 'capacidad', 'importe'."
                    }
                });
        }

        try {
            const salon = {
                titulo: body.titulo,
                direccion: body.direccion,
                latitud: body.latitud,
                longitud: body.longitud,
                capacidad: body.capacidad,
                importe: body.importe,
                activo: "1"
            };
            const salonCreado = await this.salonesService.create(salon);
            res.status(201).send({ 
                status:true,
                data: salonCreado
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
        const salonId = Number(req.params.salonId);

        if (!Number.isInteger(salonId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro salonId debe ser un numero positivo"
                    }
                });
        }
         // Validación de campos
        if (!body.titulo || !body.direccion || !body.latitud || !body.longitud || !body.capacidad || !body.importe) {
            res.status(400).send({
                status:false,
                data: { error: 'Faltan campos obligatorios: titulo, direccion, latitud, longitud, capacidad, importe' }
            });
        }
        try {
            const salonActualizado = await this.salonesService.update(salonId, body);
            res.status(200).send({
                status:true,
                data:salonActualizado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

    delete = async (req, res) => {
        const salonId = Number(req.params.salonId);
        if (!Number.isInteger(salonId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro salonId debe ser un numero positivo."
                    }
                });
        }
        try {
            const salonActualizado = await this.salonesService.delete(salonId);
            res.status(200).send({
                status:true,
                data:salonActualizado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

}