import UsuariosServicio from '../services/usuariosServicio.js';

export default class UsuariosControlador {
    constructor() {
        this.usuariosServicio = new UsuariosServicio();
    }

    getAllUsuarios = async(req, res) => {
         //Filtros
        const apellido = req.query.apellido;
        const nombre = req.query.nombre;
        const nombre_usuario = req.query.nombre_usuario;
        const tipo_usuario = req.query.tipo_usuario;
        const celular = req.query.celular;
        const activo = req.query.activo;
        //Paginación
        const limit = req.query.limit;
        const offset = req.query.offset;
        const order = req.query.order;
        const asc = req.query.asc;

        try {
            const pLimit = limit ? Number(limit) : 0;
            const pOffset = offset ? Number(offset) : 0;
            const pOrder = order || "usuario_id";
            const pAsc = asc === "false" ? false : true;
            const filters = {};
            
            if (nombre) filters.nombre = nombre;
            if (apellido) filters.apellido = apellido;
            if (nombre_usuario) filters.nombre_usuario = nombre_usuario;
            if (tipo_usuario) filters.tipo_usuario = tipo_usuario;
            if (celular) filters.celular = celular;
            if (activo) filters.activo = activo;
            const usuarios = await this.usuariosServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);
            res.status(200).send({
                status:true,
                data:usuarios
            });
        } catch (error) {
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los usuarios",
                    errorDetails: error.message
                }
            });
        }
    }

    findById = async (req, res) => {
        const usuarioId = Number(req.params.usuarioId);

        if (!Number.isInteger(usuarioId)) {
            res.status(400).send({
                status:false,
                error: 'El parámetro debe ser un número entero'
            });
        }

        try{
            const usuario = await this.usuariosServicio.findById(usuarioId);
            if (!usuario) {
                res.status(404).send({
                    status:false,
                    data: {
                        error: "Usuario no encontrado."
                    }
                });
            }
            res.status(200).send({
                status:true,
                data:usuario
            });
        } catch(error){
            res.status(500).send({
                status:false,
                data:{
                    mensaje:"Error al leer los usuarios",
                    errorDetails: error.message
                }
            });
        }
    }

    create = async (req, res) => {
        const { body } = req;
        
        try {
            const usuario = {
                nombre: body.nombre,
                apellido: body.apellido,
                nombre_usuario: body.nombre_usuario,
                contrasenia: body.contrasenia,
                tipo_usuario: body.tipo_usuario,
                celular: body.celular,
                foto: body.foto,
                activo: "1"
            };
            const usuarioCreado = await this.usuariosServicio.create(usuario);
            res.status(201).send({ 
                status:true,
                data: usuarioCreado
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
        const usuarioId = Number(req.params.usuarioId);
        if (!Number.isInteger(usuarioId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro usuarioId debe ser un numero positivo"
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
            const usuarioActualizado = await this.usuariosServicio.update(usuarioId, body);
            if (!usuarioActualizado) {
                res.status(404).send({
                    status:false,
                    data: { error: 'Usuario no encontrado' }
                });
            }else{
                res.status(200).send({
                    status:true,
                    data:usuarioActualizado
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
        const usuarioId = Number(req.params.usuarioId);
        if (!Number.isInteger(usuarioId)) {
            res.status(404).send({
                    status: false,
                    data: {
                        error: "El parámetro usuarioId debe ser un numero positivo."
                    }
                });
        }
        try {
            const usuarioActualizado = await this.usuariosServicio.delete(usuarioId);
            res.status(200).send({
                status:true,
                data:usuarioActualizado
            });
        } catch (error) {
            res.status(error?.status || 500).send({
                status: false,
                data: { error: error?.message || error }
            });
        }
    }

}