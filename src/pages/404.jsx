import React from 'react';
import Link from 'next/link';

const Error404 = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='max-w-md mx-auto text-center'>
        <h1 className='text-9xl font-bold text-gray-800'>404</h1>
        <p className='mt-4 text-2xl font-semibold text-gray-600'>
          Página no encontrada
        </p>
        <p className='mt-2 text-gray-500'>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          href='/'
          className='inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;
