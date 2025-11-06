import PDFDocument from "pdfkit";

export const generarPDF = (reservas) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(18).text("Reporte de Reservas", { align: "center" });
    doc.moveDown();

    reservas.forEach((r) => {
      doc.fontSize(12).text(`Cliente: ${r.cliente}`);
      doc.text(`Salón: ${r.salon}`);
      doc.text(`Turno: ${r.horario_inicio} - ${r.horario_fin}`);
      doc.text(`Servicios: ${r.servicios || "Ninguno"}`);
      doc.text(`Fecha: ${r.fecha_reserva}`);
      doc.text(`Total: $${r.total}`);
      doc.moveDown();
    });

    doc.end();
  });
};
