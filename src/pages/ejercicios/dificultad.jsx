import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Loading } from 'src/components';

import { apiClient } from 'src/utils/apiClient';

const DifficultyPage = () => {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get('/ejercicios');
      setEjercicios(res.data);
    };
    fetchData();
  }, []);

  const ejerciciosPorDificultad = [[], [], [], [], []];
  ejercicios.forEach((ejercicio) => {
    ejerciciosPorDificultad[ejercicio.difficulty - 1].push(ejercicio);
  });

  if (!ejercicios[1]) {
    return (
      <Layout>
        <Loading height='min-h-screen' />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='container mx-auto py-8 px-4'>
        {' '}
        {/* Añadimos padding horizontal para dispositivos móviles */}
        <h1 className='text-2xl font-bold mb-4 text-center'>
          Ejercicios por dificultad
        </h1>{' '}
        {/* Reducimos el tamaño del título y lo centramos */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          {' '}
          {/* Utilizamos una sola columna en dispositivos móviles */}
          {ejerciciosPorDificultad.map((ejerciciosEnDificultad, index) => (
            <div key={index} className='bg-gray-200 p-4 rounded-md'>
              <h2 className='text-lg font-bold mb-2 text-black'>
                Dificultad {index + 1}
              </h2>
              {ejerciciosEnDificultad.map((ejercicio) => (
                <Link
                  className='inline-flex items-center px-4 py-2 bg-white rounded mb-2 w-full text-black hover:bg-gray-300'
                  href={`/ejercicios/${ejercicio._id}`}
                  key={ejercicio.id}
                >
                  {ejercicio.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DifficultyPage;
