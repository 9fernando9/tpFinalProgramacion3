import DbUtils from './dbUtils.js';

export default class Servicios {

    findAll = async (filters = null,limit = 0, offset = 0, order = "servicio_id",asc= "ASC") => {
        let sql = 'SELECT * FROM servicios';
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

    findById = async (turnoId) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM servicio WHERE servicio_id = ?`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [turnoId]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ descripcion,importe,activo,creado,modificado }) => {
        const strSql = 'INSERT INTO servicios (descripcion,importe,activo,creado,modificado) VALUES (?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [descripcion,importe,activo,creado,modificado]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS servicio_id');

        conexion.end();

        return this.findById(rows[0].servicio_id);
    }

    update = async (servicio_id, { descripcion, importe, activo, modificado }) => {
        const strSql = 'UPDATE servicios SET descripcion = ?, importe = ?, activo = ?, modificado = ? WHERE servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [descripcion, importe, activo, modificado, servicio_id]);
        conexion.end();
        return this.findById(servicio_id);
    };

    delete = async (servicio_id) => {
        const strSql = 'UPDATE servicios SET activo = 0 WHERE servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [servicio_id]);
        conexion.end();
        return this.findById(servicio_id);
    }

}