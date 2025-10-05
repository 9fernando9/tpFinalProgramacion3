import express from 'express';
import dotenv from 'dotenv';
import salonesRutas from './src/rutas/salonesRutas.js';
import authRutas from './src/rutas/authRutas.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRutas);
app.use('/api/salones', salonesRutas);

app.get('/estado', (req, res) => res.json({ ok: true }));

app.listen(process.env.PUERTO, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PUERTO}`);
});