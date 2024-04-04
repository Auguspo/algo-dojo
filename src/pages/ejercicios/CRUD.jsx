import React, { useState, useEffect } from 'react';
import { Layout, EjerciciosList } from 'src/components';

import { apiClient } from 'src/utils/apiClient';
import { useIsPrivatePage } from 'src/hooks';

const EjerciciosCRUD = () => {
  useIsPrivatePage()
  
  const [ejercicios, setEjercicios] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 1,
    solution: '',
    tags: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [reloadData, setReloadData] = useState(false); // Estado local para indicar la necesidad de volver a cargar los datos
  const [operationSuccess, setOperationSuccess] = useState(null); // Estado para indicar si la operación fue exitosa

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/ejercicios');
        setEjercicios(res.data);
      } catch (error) {
        console.error('Error al obtener los ejercicios:', error);
      }
    };

    fetchData();
  }, [reloadData]); // Vuelve a cargar los datos cuando reloadData cambia

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/ejercicios?id=${editingId}`, formData);
        setEditingId(null);
      } else {
        await apiClient.post('/ejercicios', formData);
      }
      setOperationSuccess(true); // Operación exitosa
    } catch (error) {
      console.error('Error al guardar el ejercicio:', error);
      setOperationSuccess(false); // Error en la operación
    } finally {
      setFormData({
        name: '',
        description: '',
        difficulty: 1,
        solution: '',
        tags: [],
      });
      setReloadData(!reloadData); // Actualiza el estado para volver a cargar los datos
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/ejercicios?id=${editingId}`);
      setReloadData(!reloadData); // Actualiza el estado para volver a cargar los datos
    } catch (error) {
      console.error('Error al eliminar el ejercicio:', error);
    }
  };

  return (
    <Layout>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-4'>Ejercicios CRUD</h1>

        <form onSubmit={handleSubmit} className='mb-8'>
          <div className='mb-4'>
            <label htmlFor='name' className='block font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Nombre'
              value={formData.name}
              onChange={handleInputChange}
              required
              className='border border-gray-400 p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block font-bold mb-2'>
              Descripción
            </label>
            <textarea
              id='description'
              name='description'
              placeholder='Descripción'
              value={formData.description}
              onChange={handleInputChange}
              className='border border-gray-400 p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='difficulty' className='block font-bold mb-2'>
              Dificultad (1-5)
            </label>
            <input
              type='number'
              id='difficulty'
              name='difficulty'
              placeholder='Dificultad (1-5)'
              value={formData.difficulty}
              onChange={handleInputChange}
              min='1'
              max='5'
              required
              className='border border-gray-400 p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='solution' className='block font-bold mb-2'>
              Solución
            </label>
            <textarea
              id='solution'
              name='solution'
              placeholder='Solución'
              value={formData.solution}
              onChange={handleInputChange}
              className='border border-gray-400 p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='tags' className='block font-bold mb-2'>
              Etiquetas (separadas por coma)
            </label>
            <input
              type='text'
              id='tags'
              name='tags'
              placeholder='Etiquetas (separadas por coma)'
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className='border border-gray-400 p-2 w-full'
            />
          </div>
          <div className='inline-flex gap-5'>
            {' '}
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            {operationSuccess !== null && (
              <div className='mb-4'>
                {operationSuccess ? (
                  <p className='text-green-500'>Operación exitosa.</p>
                ) : (
                  <p className='text-red-500'>
                    Error al realizar la operación.
                  </p>
                )}
              </div>
            )}{' '}
          </div>
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
