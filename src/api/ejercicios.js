// api/ejercicios.js
import { getAllEjercicios, getEjercicioById, createEjercicio, updateEjercicio, deleteEjercicio } from "../utils/ejercicios.js";
const router = require('express').Router();

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

module.exports = router;
