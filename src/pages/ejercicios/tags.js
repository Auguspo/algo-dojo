import { useEffect, useState } from 'react';
import Link from 'next/link';

import { fetchExercises } from '../../utils/fetchExercises';

import { Layout, Loading } from '../components';

const TagsPage = () => {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };
    fetchData();
  }, []);

  const allTags = ejercicios.flatMap((ejercicio) => ejercicio.tags);
  const uniqueTags = new Set(allTags);
  const tagsArray = Array.from(uniqueTags);

  if (!ejercicios[0]) {
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
          Ejercicios por tags
        </h1>{' '}
        {/* Reducimos el tamaño del título y lo centramos */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {' '}
          {/* Utilizamos una sola columna en dispositivos móviles */}
          {tagsArray.map((tag) => (
            <div key={tag} className='bg-white p-4 rounded-md'>
              <h2 className='text-lg font-bold mb-2 text-black'>{tag}</h2>
              <ul className='space-y-2'>
                {' '}
                {/* Añadimos espacio entre los ejercicios */}
                {ejercicios
                  .filter((ejercicio) => ejercicio.tags.includes(tag))
                  .map((ejercicio) => (
                    <li key={ejercicio._id}>
                      <Link
                        className='inline-flex items-center px-4 py-2 bg-gray-200 rounded w-full text-black hover:bg-gray-300'
                        href={`/ejercicios/${ejercicio._id}`}
                      >
                        {ejercicio.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TagsPage;
