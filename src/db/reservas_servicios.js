import DbUtils from './dbUtils.js';

export default class Reservas_Servicios {

    findAll = async (filters = null,limit = 0, offset = 0, order = "reserva_servicio_id",asc= "ASC") => {
        let sql = 'SELECT * FROM reservas_servicios';
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

    findById = async (reserva_servicio_Id) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM reservas_servicios WHERE reserva_servicio_id = ?`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [reserva_servicio_Id]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ reserva_id, servicio_id, activo, creado, modificado }) => {
        const strSql = 'INSERT INTO reservas_servicios (reserva_id, servicio_id, activo, creado, modificado) VALUES (?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [reserva_id, servicio_id, activo, creado, modificado]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS reserva_servicio_id');

        conexion.end();

        return this.findById(rows[0].reserva_servicio_id);
    }

    update = async (reserva_servicio_id, { reserva_id, servicio_id, activo, creado, modificado }) => {
        const strSql = 'UPDATE reservas_servicios SET reserva_id = ?, servicio_id = ?, activo = ?, creado = ?, modificado = ? WHERE reserva_servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [reserva_id, servicio_id, activo, creado, modificado, reserva_servicio_id]);
        conexion.end();
        return this.findById(reserva_servicio_id);
    };

    delete = async (reserva_servicio_id) => {
        const strSql = 'UPDATE reservas_servicios SET activo = 0 WHERE reserva_servicio_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [reserva_servicio_id]);
        conexion.end();
        return this.findById(reserva_servicio_id);
    }

}