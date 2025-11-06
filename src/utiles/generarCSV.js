import { Parser } from "json2csv";

export const generarCSV = async (reservas) => {
  const parser = new Parser({
    fields: ["reserva_id", "cliente", "salon", "fecha_reserva", "servicios", "total"],
  });
  return parser.parse(reservas);
};