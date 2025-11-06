import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import DbUtils from "../db/dbUtils.js";


export const login = async (req, res) => {
  const { nombre_usuario, contrasenia } = req.body;

  if (!nombre_usuario || !contrasenia) {
    return res.status(400).json({
      status: false,
      message: "Faltan campos obligatorios",
    });
  }

  const conexion = await DbUtils.initConnection();

  try {
    const [rows] = await conexion.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1",
      [nombre_usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Usuario no encontrado o inactivo",
      });
    }

    const usuario = rows[0];

   
let passwordValido = false;

if (usuario.contrasenia.startsWith("$2")) {
  // bcrypt
  passwordValido = await bcrypt.compare(contrasenia, usuario.contrasenia);
} else {
  // MD5 o texto plano
  const md5Hash = crypto.createHash("md5").update(contrasenia).digest("hex");
  passwordValido =
    usuario.contrasenia === contrasenia || usuario.contrasenia === md5Hash;
}

if (!passwordValido) {
  return res.status(401).json({
    status: false,
    message: "Contraseña incorrecta",
  });
}

    
    let rol = "cliente";
    if (usuario.tipo_usuario === 1) rol = "admin";
    else if (usuario.tipo_usuario === 2) rol = "empleado";

    const token = jwt.sign(
      {
        id: usuario.usuario_id,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        nombre_usuario: usuario.nombre_usuario,
        rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      status: true,
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.usuario_id,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error en el login",
      error: error.message,
    });
  } finally {
    await conexion.end();
  }
};


export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      usuario: req.user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
};


