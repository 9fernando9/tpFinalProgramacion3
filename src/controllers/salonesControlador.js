import SalonesServicio from "../services/salonesServicio.js";
const salonesServicio = new SalonesServicio();


export const getAllSalones = async (req, res) => {
  try {
    const { titulo, capacidad, activo, limit, offset, order, asc } = req.query;

    const pLimit = limit ? Number(limit) : 0;
    const pOffset = offset ? Number(offset) : 0;
    const pOrder = order || "salon_id";
    const pAsc = asc === "false" ? false : true;

    const filters = {};
    if (titulo) filters.titulo = String(titulo).trim();
    if (capacidad) filters.capacidad = Number(capacidad);
    if (activo !== undefined && activo !== "") filters.activo = activo;

    const salones = await salonesServicio.fillAll(filters, pLimit, pOffset, pOrder, pAsc);

    res.status(200).json({
      status: true,
      data: salones,
    });
  } catch (error) {
    console.error(" Error en getAllSalones:", error.message);
    res.status(500).json({
      status: false,
      data: {
        mensaje: "Error al leer los salones",
        errorDetails: error.message,
      },
    });
  }
};


export const findById = async (req, res) => {
  const salonId = Number(req.params.salonId);

  if (!Number.isInteger(salonId)) {
    return res.status(400).json({
      status: false,
      error: "El parámetro debe ser un número entero",
    });
  }

  try {
    const salon = await salonesServicio.findById(salonId);
    if (!salon) {
      return res.status(404).json({
        status: false,
        data: { error: "Salón no encontrado" },
      });
    }

    res.status(200).json({ status: true, data: salon });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: {
        mensaje: "Error al leer los salones",
        errorDetails: error.message,
      },
    });
  }
};


export const create = async (req, res) => {
  const { body } = req;
  try {
    const salon = {
      titulo: body.titulo,
      direccion: body.direccion,
      latitud: body.latitud,
      longitud: body.longitud,
      capacidad: body.capacidad,
      importe: body.importe,
      activo: 1,
    };

    const salonCreado = await salonesServicio.create(salon);
    res.status(201).json({ status: true, data: salonCreado });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: false,
      data: { error: error?.message || error, errorDetails: error.message },
    });
  }
};


export const update = async (req, res) => {
  const body = req.body;
  const salonId = Number(req.params.salonId);

  if (!Number.isInteger(salonId)) {
    return res.status(400).json({
      status: false,
      data: { error: "El parámetro salonId debe ser un número positivo" },
    });
  }
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      status: false,
      data: { error: "El cuerpo de la solicitud no debe estar vacío" },
    });
  }

  try {
    const salonActualizado = await salonesServicio.update(salonId, body);
    if (!salonActualizado) {
      return res.status(404).json({
        status: false,
        data: { error: "Salón no encontrado" },
      });
    }

    res.status(200).json({ status: true, data: salonActualizado });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: false,
      data: { error: error?.message || error },
    });
  }
};


export const remove = async (req, res) => {
  const salonId = Number(req.params.salonId);

  if (!Number.isInteger(salonId)) {
    return res.status(400).json({
      status: false,
      data: { error: "El parámetro salonId debe ser un número positivo" },
    });
  }

  try {
    const salonEliminado = await salonesServicio.remove(salonId);
    res.status(200).json({ status: true, data: salonEliminado });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: false,
      data: { error: error?.message || error },
    });
  }
};
