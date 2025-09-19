import express from 'express';
import routes from './routes/index.routes.js';

const app = express();

// ROUTES
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});