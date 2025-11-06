
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import BdUtils from "../db/dbUtils.js";
import { stringify } from "csv-stringify/sync";


export default class ReportesServicio {
  
  async generarCSV() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(`
        SELECT 
          r.reserva_id,
          r.fecha_reserva,
          CONCAT(u.nombre, ' ', u.apellido) AS cliente,
          s.titulo AS salon,
          CONCAT(t.hora_desde, ' - ', t.hora_hasta) AS turno,
          r.tematica,
          r.importe_total,
          r.activo
        FROM reservas r
        JOIN usuarios u ON r.usuario_id = u.usuario_id
        JOIN salones s ON r.salon_id = s.salon_id
        JOIN turnos t ON r.turno_id = t.turno_id
        ORDER BY r.fecha_reserva DESC;
      `);

      if (!rows || rows.length === 0) return null;

      return stringify(rows, { header: true });
    } finally {
      await conexion.end();
    }
  }

  
  async generarPDF() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(`
        SELECT 
          r.reserva_id,
          DATE_FORMAT(r.fecha_reserva, '%d/%m/%Y') AS fecha,
          CONCAT(u.nombre, ' ', u.apellido) AS cliente,
          s.titulo AS salon,
          CONCAT(t.hora_desde, ' - ', t.hora_hasta) AS turno,
          r.tematica,
          r.importe_total,
          IF(r.activo = 1, 'Activo', 'Inactivo') AS estado
        FROM reservas r
        JOIN usuarios u ON r.usuario_id = u.usuario_id
        JOIN salones s ON r.salon_id = s.salon_id
        JOIN turnos t ON r.turno_id = t.turno_id
        ORDER BY r.fecha_reserva DESC;
      `);

      if (!rows || rows.length === 0) {
        return null;
      }

      
      const doc = new jsPDF();

     
      doc.setFontSize(16);
      doc.text("Reporte de Reservas", 14, 20);

      doc.setFontSize(10);
      doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 28);

      
      const columnas = [
        { header: "ID", dataKey: "reserva_id" },
        { header: "Fecha", dataKey: "fecha" },
        { header: "Cliente", dataKey: "cliente" },
        { header: "Salón", dataKey: "salon" },
        { header: "Turno", dataKey: "turno" },
        { header: "Temática", dataKey: "tematica" },
        { header: "Importe Total", dataKey: "importe_total" },
        { header: "Estado", dataKey: "estado" },
      ];

      autoTable(doc, {
        columns: columnas,
        body: rows,
        startY: 35,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [22, 160, 133] },
      });

      
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width - 40,
          doc.internal.pageSize.height - 10
        );
      }

      
      return doc.output("arraybuffer");
    } finally {
      await conexion.end();
    }
  }

  
  async obtenerEstadisticas() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(`
        SELECT 
          s.titulo AS salon,
          COUNT(r.reserva_id) AS cantidad_reservas,
          SUM(r.importe_total) AS total_recaudado
        FROM reservas r
        JOIN salones s ON r.salon_id = s.salon_id
        GROUP BY s.salon_id;
      `);
      return rows;
    } finally {
      await conexion.end();
    }
  }
}

