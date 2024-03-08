const mongoose = require('mongoose');

const EjercicioSchema = new mongoose.Schema({
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
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
});

module.exports = mongoose.model('Ejercicio', EjercicioSchema);
