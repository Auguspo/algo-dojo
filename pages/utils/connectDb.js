import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async (collection) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
    });

    console.log('Conectado a MongoDB');
    return conn.connection.collection(collection);
  } catch (error) {
    throw new Error(`Error al conectar a MongoDB: ${error.message}`);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    throw new Error(`Error al desconectar de MongoDB: ${error.message}`);
  }
};

export { connectDb, disconnectDb };