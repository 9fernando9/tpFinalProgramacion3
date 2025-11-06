import BdUtils from "./dbUtils.js";

export default class Usuarios {
  async findAll() {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query("SELECT * FROM usuarios");
      return rows;
    } finally {
      await conexion.end();
    }
  }

  async findById(id) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query("SELECT * FROM usuarios WHERE usuario_id = ?", [id]);
      return rows[0];
    } finally {
      await conexion.end();
    }
  }

  async findByUserName(nombre_usuario) {
    const conexion = await BdUtils.initConnection();
    try {
      const [rows] = await conexion.query("SELECT * FROM usuarios WHERE nombre_usuario = ?", [nombre_usuario]);
      return rows[0];
    } finally {
      await conexion.end();
    }
  }

  async create(usuario) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query("INSERT INTO usuarios SET ?", [usuario]);
      return { ...usuario, usuario_id: result.insertId };
    } finally {
      await conexion.end();
    }
  }

  async update(id, usuario) {
    const conexion = await BdUtils.initConnection();
    try {
      const [result] = await conexion.query("UPDATE usuarios SET ? WHERE usuario_id = ?", [usuario, id]);
      return result;
    } finally {
      await conexion.end();
    }
  }

  async delete(id) {
  const conexion = await BdUtils.initConnection();
  try {
    const [result] = await conexion.query(
      "UPDATE usuarios SET activo = 0, modificado = NOW() WHERE usuario_id = ?",
      [id]
    );
    return { eliminado: result.affectedRows > 0 };
  } finally {
    await conexion.end();
  }
}


}
