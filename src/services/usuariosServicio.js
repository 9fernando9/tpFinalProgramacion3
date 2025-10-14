import UsuarioDTO from '../db/usuarioDTO.js';
import Usuarios from '../db/usuarios.js';

export default class UsuariosServicio {
    constructor() {
        this.usuarios = new Usuarios();
    }
    fillAll = async (filters,limit, offset, order,asc) => {
        const sqlFilter = UsuarioDTO.toDBFields(filters);
        const sqlOrder = UsuarioDTO.getFieldName(order);
        const strAsc = (asc) ? "ASC " : "DESC ";
        const tableResults = await this.usuarios.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
        const dtoResults = tableResults.map(row => new UsuarioDTO(row["usuario_id"], row["nombre"], row["apellido"], row["nombre_usuario"], row["contrasenia"], row["tipo_usuario"], row["celular"], row["foto"], row["activo"], row["creado"], row["modificado"]));
        return dtoResults;
    }

    findById = async (id) => {
        const row = await this.usuarios.findById(id);
        if (!row){
            return null;
        }else{
            return new UsuarioDTO(row["usuario_id"], row["nombre"], row["apellido"], row["nombre_usuario"], row["contrasenia"], row["tipo_usuario"], row["celular"], row["foto"], row["activo"], row["creado"], row["modificado"]);
        }
    }

    create = async (usuario) => {
        const usuarioToInsert = {
            ...usuario,
            creado: new Date().toISOString().replace('T', ' ').replace('Z', ''),
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.usuarios.create(usuarioToInsert);
    }

    update = async (usuario_id, usuario) => {
        const existe = await this.usuarios.findById(usuario_id);
        if (!existe){
            return null;
        }else{
            const usuarioToUpdate = {
            ...existe,
            ...usuario,
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.usuarios.update(usuario_id, usuarioToUpdate);
        }
    }

    delete = async (usuario_id) => {
        const usuarioToUpdate = {
            modificado: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        return this.usuarios.delete(usuario_id, usuarioToUpdate);
    }

}