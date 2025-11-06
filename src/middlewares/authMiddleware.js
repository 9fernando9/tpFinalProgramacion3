import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header)
    return res.status(401).json({
      status: false,
      message: "Acceso denegado: no se proporcionó token"
    });

  const token = header.startsWith("Bearer ")
    ? header.split(" ")[1]
    : header;

  if (!token)
    return res.status(401).json({
      status: false,
      message: "Token no válido"
    });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next();
  } catch (error) {
    return res.status(403).json({
      status: false,
      message: "Token inválido o expirado"
    });
  }
};

