import turnosServicio from '../services/turnosServicio.js';

export default class TurnosControlador {
    constructor() {
        this.turnosServicio = new turnosServicio();
    }

    getAllTurnos = async(req, res) => {
        //Filtros
        const orden = req.body.orden;
        const horaDesde = req.body.horaDesde;
        const horaHasta = req.body.horaHasta;
        const activo = req.body.activo;
          
        //Paginación
        const limit = req.body.limit;
        const offset = req.body.offset;
        const order = req.body.order;
        const asc = req.body.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "turno_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};

            const turnos = await this.turnosServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:turnos
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los turnos",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const turnoId = Number(req.params.turnoId);

        if (!Number.isInteger(turnoId)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }

        try{
            const turno = await this.turnosServicio.findById(turnoId);
            if (!turno) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Turno no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:turno
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los turnos",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        if (!body.orden || !body.horaDesde || !body.horaHasta) {
            res
                .status(404)
                .send({
                    status:false,
                    data: {
                        error: "Uno de los siguientes data falta o es vacío: 'orden', 'horaDesde', 'horaHasta'."
                    }
                });
        }

        try {
            const turno = {
                orden: body.orden,
                horaDesde: body.horaDesde,
                horaHasta: body.horaHasta,
                activo: "1"
            };
            const turnoCreado = await this.turnosServicio.create(turno);
            res.status(201).send({ 
                status:true,
                data: turnoCreado
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
                        error: "El parámetro turnoId debe ser un numero positivo"
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
            const turnoActualizado = await this.turnosServicio.update(turnoId, body);
            if (!turnoActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Turno no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:turnoActualizado
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
        const turnoId = Number(req.params.turnoId);
        if (!Number.isInteger(turnoId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro turnoId debe ser un numero positivo."
                    }
                });
        }
        try {
            const turnoEliminado = await this.turnosServicio.delete(turnoId);
            res.status(200).send({
                status:true,
                data:turnoEliminado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }
}