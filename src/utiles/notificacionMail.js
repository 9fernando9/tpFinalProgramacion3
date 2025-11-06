import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const enviarNotificacionReserva = async (destinatario, datosReserva) => {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    
    const mailOptions = {
      from: `"Sistema de Reservas" <${process.env.USER_MAIL}>`,
      to: destinatario,
      subject: " Confirmación de tu reserva",
      html: `
        <h2>Hola ${datosReserva.cliente || "Cliente"} 👋</h2>
        <p>Tu reserva ha sido registrada exitosamente.</p>
        <h3>Detalles de tu reserva:</h3>
        <ul>
          <li><b>Salón:</b> ${datosReserva.salon}</li>
          <li><b>Fecha:</b> ${datosReserva.fecha_reserva}</li>
          <li><b>Turno:</b> ${datosReserva.turno}</li>
          <li><b>Temática:</b> ${datosReserva.tematica}</li>
          <li><b>Importe total:</b> $${datosReserva.importe_total}</li>
        </ul>
        <p>¡Gracias por elegirnos! </p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(` Notificación enviada a ${destinatario}`);
  } catch (error) {
    console.error(" Error al enviar correo:", error.message);
  }
};
