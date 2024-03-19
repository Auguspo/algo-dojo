import Ejercicio from "../models/ejercicioSchema.js";

// Obtener todos los ejercicios
export const getAllEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.json(ejercicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un ejercicio por ID
export const getEjercicioById = async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findById(req.params.id);
    if (!ejercicio) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.json(ejercicio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo ejercicio
export const createEjercicio = async (req, res) => {
  const ejercicio = new Ejercicio({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    tags: req.body.tags,
    solution: req.body.solution,
  });

  try {
    const nuevoEjercicio = await ejercicio.save();
    res.status(201).json(nuevoEjercicio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un ejercicio
export const updateEjercicio = async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ejercicio) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.json(ejercicio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un ejercicio
export const deleteEjercicio = async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findByIdAndDelete(req.params.id);
    if (!ejercicio) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }
    res.json({ message: "Ejercicio eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
