import { Router } from 'express';
import salonRoutes from './v1/salones.routes.js';

const router = Router();

router.get('/', (req, res) => res.send('Página de inicio'));
router.use('/salones', salonRoutes);

export default router;