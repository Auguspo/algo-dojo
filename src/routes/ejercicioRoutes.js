import express from 'express';
const router = express.Router();

import { getAllEjercicios, getEjercicioById, createEjercicio, updateEjercicio, deleteEjercicio } from "../controllers/ejercicioController.js";

// Ruta para obtener todos los ejercicios
router.get('/', getAllEjercicios);

// Ruta para obtener un ejercicio por ID
router.get('/:id', getEjercicioById);

// Ruta para crear un nuevo ejercicio
router.post('/', createEjercicio);

// Ruta para actualizar un ejercicio
router.put('/:id', updateEjercicio);

// Ruta para eliminar un ejercicio
router.delete('/:id', deleteEjercicio);

export default router;