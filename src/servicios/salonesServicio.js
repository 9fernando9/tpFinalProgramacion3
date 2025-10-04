import Salones from "../db/salones.js";

export default class SalonesServicio {  //
    constructor(){
        this.salones = new Salones();

    }
    buscarTodos = async () => { 
        return await this.salones.buscarTodos();
    }
    
    buscarPorId = async (id) => {
        return await this.salones.buscarPorId(id);
    }
    
    crear = async (datos) => {
        return await this.salones.crear(datos);

    }
    
    actualizar = async (id, datos) => {
        return await this.salones.actualizar(id, datos);
    }
    
    eliminar = async (id) => {
        return await this.salones.eliminar(id);
    }
}



