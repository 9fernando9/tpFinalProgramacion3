import { conexion } from './conexion.js';

export default class Salones {
    buscarTodos = async () => {
        const sql = 'SELECT * FROM salones WHERE activo = 1'
        const [salones] = await conexion.execute(sql)
        return salones;
    }


    buscarPorId = async(id) => {
        const sql = 'SELECT * FROM salones WHERE salon_id = ? AND activo = 1';
        const [salones] = await conexion.execute(sql, [id]);
        return salones[0];
    }

    crear = async ({titulo, direccion, capacidad, importe}) => {
        const sql = `INSERT INTO salones (titulo, direccion, capacidad, importe, activo) VALUES (?, ?, ?, ?, 1)`;
        const [resultado] = await conexion.execute(sql, [titulo, direccion, capacidad, importe]);
        return { id: resultado.insertId, titulo, direccion, capacidad, importe};
}

    actualizar = async(id , {titulo, direccion, capacidad, importe}) => {
        const sql = 'UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ? AND activo = 1';
        const [resultado] = await conexion.execute(sql , [titulo , direccion, capacidad, importe, id]);
        return {id , titulo , direccion, capacidad , importe, id};
    }
    
    eliminar = async(id) => {
        const sql = 'UPDATE salones SET activo = 0 WHERE salon_id = ?'
        await conexion.execute(sql , [id]);
        return {id};
    }

}