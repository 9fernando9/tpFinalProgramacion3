import { Router } from 'express';
import { generarJWT } from '../../utiles/generarJWT.js';

const router = Router();

router.post('/login', (req, res) => {
    const {usuario , password} = req.body;

    const fakeUser = {
        admin: {id: 1, rol: 'admin', password: '1234'},
        empleado: {id: 2, rol: 'empleado', password: '1234'},
        cliente: {id: 3, rol: 'cliente', password: '1234'},
    }

    const user = fakeUser[usuario];
    if (!user || user.password !== password) {
        return res.status(400).json({
            msg: 'Usuario no existe'
        });
    }

    const token = generarJWT(user.id, user.rol);
    res.json({token});
});

export default router;