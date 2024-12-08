import { Sequelize } from 'sequelize-typescript';
import AdminStaff from '../models/Users';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 15635,
  models: [AdminStaff], // Ensure AdminStaff model is in this array
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  }
  catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default connectToDatabase;