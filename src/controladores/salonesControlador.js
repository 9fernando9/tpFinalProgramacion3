import SalonesServicio from "../servicios/salonesServicios.js";


export default class SalonesControlador {
    constructor() {
        this.salonesServicio = new SalonesServicio();
    }

    // GET /salones
    buscarTodos = async (req, res) => {
        try {
            const salones = await this.salonesServicio.buscarTodos();
            res.json({
                estado: true,
                datos: salones
            });
        } catch (error) {
            console.error('Error en GET /salones', error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }

    // GET /salones/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const salon = await this.salonesServicio.buscarPorId(id);

            if (!salon) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Salón no encontrado"
                });
            }

            res.json({ estado: true, datos: salon });
        } catch (error) {
            console.error('Error en GET /salones/:id', error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // POST /salones
    crear = async (req, res) => {
        try {
            const nuevo = await this.salonesServicio.crear(req.body);
            res.status(201).json({
                estado: true,
                datos: nuevo
            });
        } catch (error) {
            console.error('Error en POST /salones', error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }

    // PUT /salones/:id
    actualizar = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.salonesServicio.actualizar(id, req.body);

            res.json({
                estado: true,
                datos: actualizado
            });
        } catch (error) {
            console.error('Error en PUT /salones/:id', error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }

    // DELETE /salones/:id
    eliminar = async (req, res) => {
        try {
            const { id } = req.params;
            const eliminado = await this.salonesServicio.eliminar(id);

            res.json({
                estado: true,
                datos: eliminado,
                mensaje: "Salón eliminado (soft delete)"
            });
        } catch (error) {
            console.error('Error en DELETE /salones/:id', error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }
}