import salonesServicio from '../services/salonesServicio.js';

export default class SalonesControlador {
    constructor() {
        this.salonesServicio = new salonesServicio();
    }

    getAllSalones = async(req, res) => {
        //Filtros
        const titulo = req.body.titulo;
        const capacidad = req.body.capacidad;
        const activo = req.body.activo;
          
        //Paginación
        const limit = req.body.limit;
        const offset = req.body.offset;
        const order = req.body.order;
        const asc = req.body.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "salon_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};
            if (typeof titulo !== 'undefined' && titulo !== '') filters.titulo = String(titulo).trim();
            if (typeof capacidad !== 'undefined' && capacidad !== '') filters.capacidad = Number(capacidad);
            if (typeof activo !== 'undefined' && activo !== '') filters.activo = activo;

            const salones = await this.salonesServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
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
            const salon = await this.salonesServicio.findById(salonId);
            if (!salon) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Salon no encontrado"
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
            const salonCreado = await this.salonesServicio.create(salon);
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
        if(Object.keys(body).length === 0){
            res.status(400).send({
                status:false,
                data:{ error: 'El cuerpo de la solicitud no debe estar vacío' }
            });
        }
        try {
            const salonActualizado = await this.salonesServicio.update(salonId, body);
            if (!salonActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Salon no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:salonActualizado
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
            const salonActualizado = await this.salonesServicio.delete(salonId);
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