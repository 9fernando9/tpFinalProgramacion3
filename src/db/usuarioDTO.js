export default class UsuarioDTO {
    constructor(usuario_id, nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado) {
        this.usuario_id = usuario_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombre_usuario = nombre_usuario;
        this.contrasenia = contrasenia;
        this.tipo_usuario = tipo_usuario;
        this.celular = celular;
        this.foto = foto;
        this.activo = activo;
        this.creado = creado;
        this.modificado = modificado;
    }

    static toDBFields(usuario) {
        let res = [];
        const claves = Object.keys(usuario);
        for(const i of claves) {
            const objUsuario = {};
            objUsuario[getFieldName(i)] = usuario[i];
            res.push(objUsuario);
        }
        return res;
    }

    static getFieldName(key) {
        const map = {
            usuario_id: 'usuario_id',
            nombre: 'nombre',
            apellido: 'apellido',
            nombre_usuario: 'nombre_usuario',
            contrasenia: 'contrasenia',
            tipo_usuario: 'tipo_usuario',
            celular: 'celular',
            foto: 'foto',
            activo: 'activo',
            creado: 'creado',
            modificado: 'modificado'
        };
        return map[key] || key;
    }
}