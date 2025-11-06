import TurnosServicio from "../services/turnosServicio.js";
const turnosServicio = new TurnosServicio();

export const getAllTurnos = async (req, res) => {
  try {
    const turnos = await turnosServicio.findAll();
    res.status(200).json({ status: true, data: turnos });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error al obtener turnos", error: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const turno = await turnosServicio.findById(Number(req.params.turnoId));
    if (!turno) return res.status(404).json({ status: false, message: "Turno no encontrado" });
    res.status(200).json({ status: true, data: turno });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error al buscar turno", error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { orden, hora_desde, hora_hasta } = req.body;

    if (!orden || !hora_desde || !hora_hasta) {
      return res.status(400).json({
        status: false,
        message: "Faltan datos obligatorios: orden, hora_desde, hora_hasta",
      });
    }

    const nuevoTurno = await turnosServicio.create({ orden, hora_desde, hora_hasta });
    res.status(201).json({ status: true, data: nuevoTurno });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al crear el turno",
      error: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const turnoId = Number(req.params.turnoId);
    const actualizado = await turnosServicio.update(turnoId, req.body);
    if (!actualizado) return res.status(404).json({ status: false, message: "Turno no encontrado" });
    res.status(200).json({ status: true, data: actualizado });
  } catch (error) {
    res.status(500).json({ status: false, message: "Error al actualizar el turno", error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const turnoId = Number(req.params.turnoId);
    const eliminado = await turnosServicio.delete(turnoId);

    if (!eliminado.eliminado) {
      return res.status(404).json({ status: false, message: "Turno no encontrado" });
    }

    res.status(200).json({ status: true, message: "Turno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al eliminar el turno",
      error: error.message,
    });
  }
};
