export const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {

    
    const roles = Array.isArray(rolesPermitidos)
      ? rolesPermitidos
      : [rolesPermitidos];

    
    if (!req.user || !req.user.rol) {
      return res.status(403).json({
        status: false,
        message: "Acceso denegado: usuario no autenticado"
      });
    }

    
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        status: false,
        message: `Acceso denegado: rol '${req.user.rol}' no autorizado. Se requiere: ${roles.join(", ")}`
      });
    }

    next(); 
  };
};
