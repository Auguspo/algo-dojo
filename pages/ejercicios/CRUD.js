import React, { useState, useEffect } from "react";
import {
  fetchExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../utils/fetchExercises";
import Layout from "../components/Layout";
import EjerciciosList from "../components/EjerciciosList"; // Importa el componente EjerciciosList

const EjerciciosCRUD = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: 1,
    solution: "",
    tags: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [reloadData, setReloadData] = useState(false); // Estado local para indicar la necesidad de volver a cargar los datos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExercises();
        setEjercicios(data);
      } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
      }
    };

    fetchData();
  }, [reloadData]); // Vuelve a cargar los datos cuando reloadData cambia

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExercise(editingId, formData);
        setEditingId(null);
      } else {
        await createExercise(formData);
      }
      setFormData({
        name: "",
        description: "",
        difficulty: 1,
        solution: "",
        tags: [],
      });
      setReloadData(!reloadData); // Actualiza el estado para volver a cargar los datos
    } catch (error) {
      console.error("Error al guardar el ejercicio:", error);
    }
  };

  const handleEdit = (ejercicio) => {
    setFormData({
      name: ejercicio.name,
      description: ejercicio.description,
      difficulty: ejercicio.difficulty,
      solution: ejercicio.solution,
      tags: ejercicio.tags,
    });
    setEditingId(ejercicio._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExercise(id);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Ejercicios CRUD</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block font-bold mb-2">
              Dificultad (1-5)
            </label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              placeholder="Dificultad (1-5)"
              value={formData.difficulty}
              onChange={handleInputChange}
              min="1"
              max="5"
              required
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="solution" className="block font-bold mb-2">
              Solución
            </label>
            <textarea
              id="solution"
              name="solution"
              placeholder="Solución"
              value={formData.solution}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block font-bold mb-2">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Etiquetas (separadas por coma)"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Actualizar" : "Crear"}
          </button>
        </form>
        <EjerciciosList
          ejercicios={ejercicios}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </Layout>
  );
};

export default EjerciciosCRUD;
