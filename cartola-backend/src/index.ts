import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use('/', routes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));