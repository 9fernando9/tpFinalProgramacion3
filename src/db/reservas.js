import DbUtils from './dbUtils.js';

export default class Reservas {

    findAll = async (filters = null,limit = 10, offset = 0, order = "reserva_id",asc= "ASC") => {
        let sql = 'SELECT * FROM reservas';
        const filterValuesArray = [];
        if (filters) {
            sql += ' WHERE ';
            for(const filter of filters) {
                for(const key of Object.keys(filter)) {
                    sql += `${key} = ? AND `;
                    filterValuesArray.push(filter[key]);
                }
            }
            sql = sql.slice(0,sql.length - 4); // Quito el último AND
        }
        if (order) {
            sql += ` ORDER BY ${order} ${asc}`;
        }
        if (limit > 0) {
            sql += ` LIMIT ? OFFSET ?`;
        }
        const conexion = await DbUtils.initConnection();
        console.log(sql);
        console.log([...filterValuesArray, limit, offset]);
        const [rows] = limit > 0 ? await conexion.execute(sql, [...filterValuesArray, limit, offset]) : await conexion.execute(sql, [...filterValuesArray]);
        conexion.end();
        return rows;
    }

    findById = async (reserva_id) => {
        // Defino el string de consulta
        const strSql = `SELECT * FROM reservas WHERE reserva_id = ?`;

        const conexion = await DbUtils.initConnection();

        // Ejecuto la consulta
        const [rows] = await conexion.query(strSql, [reserva_id]);

        conexion.end();

        return (rows.length > 0)? rows[0] : null;
    }

    create = async ({ fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_salon,importe_total,activo,creado,modificado }) => {
        const strSql = 'INSERT INTO reservas (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo, creado, modificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

        const conexion = await DbUtils.initConnection();

        await conexion.query(strSql, [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo, creado, modificado]);

        const [rows] = await conexion.query('SELECT LAST_INSERT_ID() AS reserva_id');

        conexion.end();

        return this.findById(rows[0].reserva_id);
    }

    update = async (reserva_id, { fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo, modificado }) => {
        const strSql = 'UPDATE reservas SET fecha_reserva = ?, salon_id = ?, usuario_id = ?, turno_id = ?, foto_cumpleaniero = ?, tematica = ?, importe_salon = ?, importe_total = ?, activo = ?, modificado = ? WHERE reserva_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo, creado, modificado, reserva_id]);
        conexion.end();
        return this.findById(salon_id);
    };

    delete = async (reserva_id) => {
        const strSql = 'UPDATE reservas SET activo = 0 WHERE reserva_id = ?';
        const conexion = await DbUtils.initConnection();
        await conexion.query(strSql, [reserva_id]);
        conexion.end();
        return this.findById(reserva_id);
    }

}