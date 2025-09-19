import { Router } from 'express';
import salonRoutes from './salon.routes.js';

const router = Router();

router.get('/', (req, res) => res.send('Página de inicio'));

router.use('/salon', salonRoutes);

// Ruta de error
/*router.get('/error', (req, res) => {
    res.status(404).send('Página no encontrada');
});
// Catch-all: cualquier ruta no definida
router.all('*', (req, res) => {
    res.redirect('/error');
});
*/
export default router;