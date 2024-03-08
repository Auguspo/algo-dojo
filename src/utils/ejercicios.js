// src/schema/ejercicios.js

import mongoose from 'mongoose';
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
});
const { EjercicioSchema } = require('../schemas/schema');

const Ejercicio = mongoose.model('Ejercicio', EjercicioSchema);

// Función para obtener todos los ejercicios
export async function getAllEjercicios() {
    const ejercicios = await Ejercicio.find();
    return ejercicios;
}

// Función para obtener un ejercicio por ID
export async function getEjercicioById(id) {
    const ejercicio = await Ejercicio.findById(id);
    return ejercicio;
}

// Función para crear un ejercicio
export async function createEjercicio(nombre, descripcion, dificultad, tags) {
    const ejercicio = new Ejercicio({
        nombre,
        descripcion,
        dificultad,
        tags,
    });

    await ejercicio.save();
    return ejercicio;
}

// Función para actualizar un ejercicio
export async function updateEjercicio(id, nombre, descripcion, dificultad,tags) {
    const ejercicio = await Ejercicio.findByIdAndUpdate(id, {
        nombre,
        descripcion,
        dificultad, tags,
    });

    return ejercicio;
}

// Función para eliminar un ejercicio
export async function deleteEjercicio(id) {
    await Ejercicio.findByIdAndDelete(id);
}

