import { Router } from 'express';

import salonesRoutes from './v1/salonesRutas.js';
import usuariosRoutes from './v1/usuariosRutas.js';
import turnosRoutes from './v1/turnosRutas.js';
import serviciosRoutes from './v1/serviciosRutas.js';
import reservasRoutes from './v1/reservasRutas.js';
import reservas_serviciosRoutes from './v1/reservas_serviciosRutas.js';
const router = Router();

router.get('/', (req, res) => res.send('Página de inicio'));
router.use('/salones', salonesRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/turnos', turnosRoutes);
router.use('/servicios', serviciosRoutes);
router.use('/reservas', reservasRoutes);
router.use('/reservas_servicios', reservas_serviciosRoutes);

export default router;