import UsuariosServicio from "../services/usuariosServicio.js";
const usuariosServicio = new UsuariosServicio();


export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosServicio.findAll();
    res.status(200).json({ status: true, data: usuarios });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};


export const findById = async (req, res) => {
  try {
    const usuario = await usuariosServicio.findById(Number(req.params.usuarioId));
    if (!usuario)
      return res.status(404).json({ status: false, message: "Usuario no encontrado" });

    res.status(200).json({ status: true, data: usuario });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al buscar usuario",
      error: error.message,
    });
  }
};


export const create = async (req, res) => {
  try {
    const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo } = req.body;

    if (!nombre || !apellido || !nombre_usuario || !contrasenia || !tipo_usuario) {
      return res.status(400).json({
        status: false,
        message: "Faltan campos obligatorios",
      });
    }

    const nuevoUsuario = await usuariosServicio.create({
      nombre,
      apellido,
      nombre_usuario,
      contrasenia,
      tipo_usuario,
      activo: activo ?? 1,
    });

    res.status(201).json({ status: true, data: nuevoUsuario });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const usuarioId = Number(req.params.usuarioId);
    const actualizado = await usuariosServicio.update(usuarioId, req.body);

    if (!actualizado)
      return res.status(404).json({ status: false, message: "Usuario no encontrado" });

    res.status(200).json({ status: true, data: actualizado });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const usuarioId = Number(req.params.usuarioId);
    const eliminado = await usuariosServicio.delete(usuarioId);

    if (!eliminado)
      return res.status(404).json({ status: false, message: "Usuario no encontrado" });

    res.status(200).json({
      status: true,
      message: "Usuario eliminado correctamente",
      data: eliminado,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { nombre_usuario, contrasenia } = req.body;

    const token = await usuariosServicio.login(nombre_usuario, contrasenia);
    if (!token) {
      return res.status(401).json({ status: false, message: "Credenciales inválidas" });
    }

    res.status(200).json({ status: true, token });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};


export const me = (req, res) => {
  return res.status(200).json({
    status: true,
    user: req.user, 
  });
};

