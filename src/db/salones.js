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
        const sql = 'INSERT INTO salones (titulo, direccion, importe, capacidad, activo) VALUES (?, ?, ?, ?, 1)';
        const [resultado] = await conexion.execute(sql, [titulo , direccion, importe, capacidad]);
        return {id: resultado.insertId, titulo, direccion, importe, capacidad};
    }

    actualizar = async(id , {titulo , direccion, importe, capacidad}) => {
        const sql = 'UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ? AND activo = 1';
        const [resultado] = await conexion.execute(sql , [titulo , direccion, importe, capacidad , id]);
        return {id , titulo , direccion, importe, capacidad};
    }
    
    eliminar = async(id) => {
        const sql = 'UPDATE salones SET activo = 0 WHERE salon_id = ?'
        await conexion.execute(sql , [id]);
        return {id};
    }

}