import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/indexRuta.js";
import usuariosRutas from "./routes/v1/usuariosRutas.js";
import reservasRutas from "./routes/v1/reservasRutas.js";
import turnosRutas from "./routes/v1/turnosRutas.js";
import authRutas from "./routes/v1/authRutas.js";
import reportesRutas from "./routes/v1/reportesRutas.js";
import estadisticasRutas from "./routes/v1/estadisticasRutas.js";
import swaggerDocs from "./swagger.js"; 
import encuestasRutas from "./routes/v1/encuestasRutas.js";
import reservasComentariosRoutes from "./routes/v1/reservasComentarios.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes); 
app.use("/api/v1/usuarios", usuariosRutas);
app.use("/api/v1/reservas", reservasRutas);
app.use("/api/v1/turnos", turnosRutas);
app.use("/api/auth", authRutas);
app.use("/api/v1/reportes", reportesRutas);
app.use("/api/v1/estadisticas", estadisticasRutas);
app.use("/encuestas", encuestasRutas);
app.use("/api/reservas-comentarios", reservasComentariosRoutes);


console.log("✅ Ruta de estadísticas cargada correctamente");

swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
);
