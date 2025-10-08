import express from 'express';
import helmet from 'helmet';
import validateContentType from "./middlewares/validateContentType.js";
import routes from './routes/index.routes.js';

const app = express();
//Middleware to parse JSON bodies
app.use(express.json());
// ROUTES
app.use(routes);
app.use(validateContentType);
app.use(helmet());
app.use(express.json({ type: 'application/json' })); // solo acepta JSON

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});