import DbUtils from './dbUtils.js';

export default class Turnos {

    findAll = async (filters = null,limit = 0, offset = 0, order = "turno_id",asc= "ASC") => {
        let sql = 'SELECT * FROM turnos';
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
        const strSql = `SELECT * FROM turnos WHERE turno_id = ?`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [turnoId]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ orden,hora_desde,hora_hasta,activo,creado,modificado }) => {
        const strSql = 'INSERT INTO turnos (orden,hora_desde,hora_hasta,activo,creado,modificado) VALUES (?, ?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [orden,hora_desde,hora_hasta,activo,creado,modificado]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS turno_id');

        conexion.end();

        return this.findById(rows[0].turno_id);
    }

    update = async (turno_id, { orden,hora_desde,hora_hasta,activo,creado,modificado }) => {
        const strSql = 'UPDATE turnos SET orden = ?, hora_desde = ?, hora_hasta = ?, activo = ?, creado = ?, modificado = ? WHERE turno_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [orden,hora_desde,hora_hasta,activo,creado,modificado,turno_id]);
        conexion.end();
        return this.findById(turno_id);
    };

    delete = async (turno_id) => {
        const strSql = 'UPDATE turnos SET activo = 0 WHERE turno_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [turno_id]);
        conexion.end();
        return this.findById(turno_id);
    }

}