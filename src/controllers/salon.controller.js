class SalonController {
    listar(req, res) {
        res.send('LISTA DE SALONES');
    }
    agregar(req, res) {
        res.send('AGREGAR SALON');
    }
    modificar(req, res) {
        res.send('MODIFICAR SALON');
    }
    eliminar(req, res) {
        res.send('ELIMINAR SALON');
    }
}

export default SalonController;