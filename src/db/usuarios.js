import DbUtils from './dbUtils.js';

export default class Usuarios {

    findAll = async (filters = null,limit = 0, offset = 0, order = "usuario_id",asc= "ASC") => {
        let sql = 'SELECT * FROM usuarios';
        const filterValuesArray = [];
        if (filters) {
            sql += ' WHERE ';
            for(const filter of filters) {
                for(const key of Object.keys(filter)) {
                    sql += `${key} = ? AND `;
                    filterValuesArray.push(filter[key]);
                }
            }
            sql = sql.slice(0,sql.length-6);
        }
        if (order) {
            sql += ` ORDER BY ${order} ${asc}`;
        }
        if (limit > 0) {
            sql += ` LIMIT ? OFFSET ?`;
        }
        const conexion = await DbUtils.initConnection();
        const [rows] = await conexion.execute(sql, [...filterValuesArray, limit, offset]);
       
        conexion.end();
        return rows;
    }

    findById = async (usuarioId) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM usuarios WHERE usuario_id = ?`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [usuarioId]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado }) => {
        const strSql = 'INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS usuario_id');

        conexion.end();

        return this.findById(rows[0].usuario_id);
    }

    update = async (usuario_id, { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, modificado }) => {
        const strSql = 'UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, contrasenia = ?, tipo_usuario = ?, celular = ?, foto = ?, activo = ?, modificado = ? WHERE usuario_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, modificado, usuario_id]);
        conexion.end();
        return this.findById(usuario_id);
    };

    delete = async (usuario_id,{modificado}) => {
        const strSql = 'UPDATE usuarios SET activo = 0,modificado = ? WHERE usuario_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [modificado, usuario_id]);
        conexion.end();
        return this.findById(usuario_id);
    }

}