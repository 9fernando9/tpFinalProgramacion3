import express from "express";
import encuestasControlador from "../../controllers/encuestasControlador.js";

const router = express.Router();

router.get("/", encuestasControlador.listar); 
router.get("/nueva/:reserva_id", encuestasControlador.nueva); 
router.post("/guardar", encuestasControlador.guardar); 
export default router;


