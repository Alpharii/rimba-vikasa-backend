import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {sequelize} from './config/database';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
