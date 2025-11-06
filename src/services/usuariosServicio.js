import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import BdUtils from "../db/dbUtils.js";

export default class UsuariosServicio {
  constructor() {
    this.tabla = "usuarios";
  }

  
  async findAll() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(`SELECT * FROM ${this.tabla} WHERE activo = 1`);
      return rows;
    } catch (error) {
      throw new Error("Error al obtener usuarios: " + error.message);
    } finally {
      await conexion.end();
    }
  }

  
  async findById(id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(
        `SELECT * FROM ${this.tabla} WHERE usuario_id = ? AND activo = 1`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error("Error al buscar usuario: " + error.message);
    } finally {
      await conexion.end();
    }
  }

  // ➕ Crear nuevo usuario
  async create(usuario) {
    const conexion = await BdUtils.initConnection();
    try {
      const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo } = usuario;

      // 🔒 Encriptar la contraseña con MD5 (como las existentes)
      const md5Pass = crypto.createHash("md5").update(contrasenia).digest("hex");

      const [result] = await conexion.query(
        `INSERT INTO ${this.tabla} (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo, creado, modificado)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [nombre, apellido, nombre_usuario, md5Pass, tipo_usuario, activo]
      );

      return { usuario_id: result.insertId, ...usuario };
    } catch (error) {
      throw new Error("Error al crear usuario: " + error.message);
    } finally {
      await conexion.end();
    }
  }

  
  async update(usuarioId, datos) {
    const conexion = await BdUtils.initConnection();
    try {
      const campos = [];
      const valores = [];

      for (const [key, value] of Object.entries(datos)) {
        if (key === "contrasenia" && value) {
          const md5Pass = crypto.createHash("md5").update(value).digest("hex");
          campos.push(`${key} = ?`);
          valores.push(md5Pass);
        } else {
          campos.push(`${key} = ?`);
          valores.push(value);
        }
      }

      campos.push("modificado = NOW()");
      valores.push(usuarioId);

      const [result] = await conexion.query(
        `UPDATE ${this.tabla} SET ${campos.join(", ")} WHERE usuario_id = ?`,
        valores
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error al actualizar usuario: " + error.message);
    } finally {
      await conexion.end();
    }
  }

  
  async delete(usuarioId) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query(
        `UPDATE ${this.tabla} SET activo = 0, modificado = NOW() WHERE usuario_id = ?`,
        [usuarioId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error al eliminar usuario: " + error.message);
    } finally {
      await conexion.end();
    }
  }

  
  async login(nombre_usuario, contrasenia) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query(
        `SELECT * FROM ${this.tabla} WHERE nombre_usuario = ? AND activo = 1`,
        [nombre_usuario]
      );

      if (rows.length === 0) return null;
      const usuario = rows[0];

      let valido = false;

      if (usuario.contrasenia.startsWith("$2")) {
        
        valido = await bcrypt.compare(contrasenia, usuario.contrasenia);
      } else {
        
        const md5 = crypto.createHash("md5").update(contrasenia).digest("hex");
        valido = usuario.contrasenia === contrasenia || usuario.contrasenia === md5;
      }

      if (!valido) return null;

      let rol = "cliente";
      if (usuario.tipo_usuario === 1) rol = "admin";
      else if (usuario.tipo_usuario === 2) rol = "empleado";

      const token = jwt.sign(
        {
          id: usuario.usuario_id,
          nombre: `${usuario.nombre} ${usuario.apellido}`,
          rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return token;
    } catch (error) {
      throw new Error("Error al iniciar sesión: " + error.message);
    } finally {
      await conexion.end();
    }
  }
}
