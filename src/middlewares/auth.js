import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']; 
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(401).json({msg: 'Token no proporcionado'});
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token no valido'});
    }
};


export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if(!rolesPermitidos.includes(req.usuario.rol)){
            return res.status(401).json({msg: 'No tienes permisos para realizar esta accion'});
            
        }
        next();
    };
};
