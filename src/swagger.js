
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas de Salones",
      version: "1.0.0",
      description:
        "Documentación del Trabajo Final Integrador — Sistema de Reservas de Salones con autenticación JWT, roles y reportes.",
      contact: {
        name: "Bruno Cabellier",
        email: "cabellierbruno@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local de desarrollo",
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger disponible en: http://localhost:3000/api-docs");
};
