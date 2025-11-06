import ReservasServicio from "../services/reservasServicio.js";
import { enviarNotificacionReserva } from "../utiles/notificacionMail.js";

const reservasServicio = new ReservasServicio();


export const getAllReservas = async (req, res) => {
  try {
    let reservas;

    // Si es cliente → solo sus reservas
    if (req.user.rol === "cliente") {
      reservas = await reservasServicio.findByUserId(req.user.id);
    } else {
      // Empleado y Admin → todas
      reservas = await reservasServicio.findAll();
    }

    res.status(200).json({ status: true, data: reservas });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al obtener reservas",
      error: error.message,
    });
  }
};


export const findById = async (req, res) => {
  try {
    const id = Number(req.params.reservaId);
    const reserva = await reservasServicio.findById(id);

    if (!reserva) {
      return res.status(404).json({ status: false, message: "Reserva no encontrada" });
    }

   
    if (req.user.rol === "cliente" && reserva.usuario_id !== req.user.id) {
      return res.status(403).json({
        status: false,
        message: "Acceso denegado: no puedes ver reservas de otros usuarios",
      });
    }

    res.status(200).json({ status: true, data: reserva });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error al buscar reserva",
      error: error.message,
    });
  }
};


export const create = async (req, res) => {
  try {
    const { fecha_reserva, salon_id, turno_id, foto_cumpleaniero = null, tematica, importe_total } = req.body;

    if (!fecha_reserva || !salon_id || !turno_id || !tematica || !importe_total) {
      return res.status(400).json({
        status: false,
        message: "Faltan campos obligatorios para crear la reserva",
      });
    }

    
    const usuario_id = req.user.id;

    const nuevaReserva = await reservasServicio.create({
      fecha_reserva,
      usuario_id,
      salon_id,
      turno_id,
      foto_cumpleaniero,
      tematica,
      importe_total,
      activo: 1,
      creado: new Date(),
      modificado: new Date(),
    });

    
    try {
      const usuario = await reservasServicio.getUsuarioById(usuario_id);

      if (usuario && usuario.nombre_usuario) {
        await enviarNotificacionReserva(usuario.nombre_usuario, {
          cliente: `${usuario.nombre} ${usuario.apellido}`,
          salon: `Salón #${salon_id}`,
          fecha_reserva,
          turno: `Turno #${turno_id}`,
          tematica,
          importe_total,
        });
        console.log(` Notificación enviada a ${usuario.nombre_usuario}`);
      } else {
        console.warn(" No se encontró correo del usuario para enviar notificación");
      }
    } catch (mailError) {
      console.error(" Error al enviar correo:", mailError.message);
    }

    res.status(201).json({
      status: true,
      message: "Reserva creada exitosamente",
      data: nuevaReserva,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al crear la reserva",
      error: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const id = Number(req.params.reservaId);
    const actualizada = await reservasServicio.update(id, req.body);

    if (!actualizada) {
      return res.status(404).json({ status: false, message: "Reserva no encontrada" });
    }

    res.status(200).json({
      status: true,
      message: "Reserva actualizada correctamente",
      data: actualizada,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error al actualizar reserva",
      error: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const id = Number(req.params.reservaId);
    const eliminada = await reservasServicio.delete(id);

    if (!eliminada) {
      return res.status(404).json({
        status: false,
        message: "Reserva no encontrada o ya eliminada",
      });
    }

    res.status(200).json({
      status: true,
      message: "Reserva eliminada correctamente (soft delete)",
      data: eliminada,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Error al eliminar reserva",
      error: error.message,
    });
  }
};
