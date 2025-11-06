import ServiciosServicio from "../services/serviciosServicio.js";
const serviciosServicio = new ServiciosServicio();


export const getAllServicios = async (req, res) => {
  try {
    const { descripcion, activo, limit, offset, order, asc } = req.query;

    const pLimit = limit ? Number(limit) : 0;
    const pOffset = offset ? Number(offset) : 0;
    const pOrder = order || "servicio_id";
    const pAsc = asc === "false" ? false : true;

    const filters = {};
    if (descripcion) filters.descripcion = String(descripcion).trim();
    if (activo !== undefined && activo !== "") filters.activo = activo;

    const servicios = await serviciosServicio.fillAll(
      filters,
      pLimit,
      pOffset,
      pOrder,
      pAsc
    );

    return res.status(200).json({
      status: true,
      message: "Listado de servicios obtenido correctamente",
      data: servicios,
    });
  } catch (error) {
    console.error(" Error en getAllServicios:", error.message);
    return res.status(500).json({
      status: false,
      message: "Error interno al obtener los servicios",
      error: error.message,
    });
  }
};


export const findById = async (req, res) => {
  try {
    const id = Number(req.params.servicioId);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        status: false,
        message: "El parámetro servicioId debe ser un número entero",
      });
    }

    const servicio = await serviciosServicio.findById(id);
    if (!servicio) {
      return res.status(404).json({
        status: false,
        message: `No se encontró el servicio con ID ${id}`,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Servicio encontrado correctamente",
      data: servicio,
    });
  } catch (error) {
    console.error(" Error en findById:", error.message);
    return res.status(500).json({
      status: false,
      message: "Error interno al buscar el servicio",
      error: error.message,
    });
  }
};


export const create = async (req, res) => {
  try {
    const { descripcion, importe } = req.body;

    if (!descripcion || !importe) {
      return res.status(400).json({
        status: false,
        message: "Los campos 'descripcion' e 'importe' son obligatorios",
      });
    }

    const nuevoServicio = {
      descripcion,
      importe,
      activo: 1,
    };

    const servicioCreado = await serviciosServicio.create(nuevoServicio);

    return res.status(201).json({
      status: true,
      message: "Servicio creado correctamente",
      data: servicioCreado,
    });
  } catch (error) {
    console.error(" Error en create:", error.message);
    return res.status(500).json({
      status: false,
      message: "Error al crear el servicio",
      error: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const id = Number(req.params.servicioId);
    const body = req.body;

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        status: false,
        message: "El parámetro servicioId debe ser un número entero",
      });
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: false,
        message: "El cuerpo de la solicitud no debe estar vacío",
      });
    }

    const actualizado = await serviciosServicio.update(id, body);
    if (!actualizado) {
      return res.status(404).json({
        status: false,
        message: `No se encontró el servicio con ID ${id}`,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Servicio actualizado correctamente",
      data: actualizado,
    });
  } catch (error) {
    console.error(" Error en update:", error.message);
    return res.status(500).json({
      status: false,
      message: "Error al actualizar el servicio",
      error: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const id = Number(req.params.servicioId);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        status: false,
        message: "El parámetro servicioId debe ser un número entero",
      });
    }

    const eliminado = await serviciosServicio.delete(id);
    if (!eliminado) {
      return res.status(404).json({
        status: false,
        message: `No se encontró el servicio con ID ${id}`,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Servicio eliminado correctamente (soft delete)",
      data: eliminado,
    });
  } catch (error) {
    console.error(" Error en remove:", error.message);
    return res.status(500).json({
      status: false,
      message: "Error al eliminar el servicio",
      error: error.message,
    });
  }
};
