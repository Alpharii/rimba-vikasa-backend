import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // Hilangkan log SQL jika tidak diperlukan
});


export const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connected!');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  };
