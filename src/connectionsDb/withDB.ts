import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const withDB = async <T>(
  execute: (db: Mongoose) => Promise<T>
): Promise<T> => {
  const db: Mongoose = await mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
  });

  let res: T;
  try {
    res = await execute(db);
  } catch (error) {
    console.error(error);
    db.disconnect();
    throw error;
  }
  db.disconnect();
  return res;
};
