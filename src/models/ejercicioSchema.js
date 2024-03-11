import mongoose from 'mongoose';

const ejercicioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  solution: {
    type: String,
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
},{versionKey: false});

const Ejercicios = mongoose.model('ejercicios', ejercicioSchema);

export default Ejercicios;