import { Router } from "express";
import {
  generarReportePDF,
  generarReporteCSV,
  getEstadisticas
} from "../../controllers/reportesControlador.js";

const router = Router();


router.get("/pdf", generarReportePDF);


router.get("/csv", generarReporteCSV);


router.get("/estadisticas", getEstadisticas);

export default router;
