import React from 'react';

const EjercicioCard = ({ ejercicio }) => {
  // Verifica si el objeto ejercicio es válido
  if (!ejercicio) {
    return <p>No hay ejercicio disponible.</p>;
  }

  const { name, difficulty, description, solution, tags } = ejercicio;

  return (
    <div className="container mx-auto py-4 px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{name}</h1>
      <div className="bg-gray-200 shadow-md rounded-lg p-4 md:p-6">
        <p className="text-sm md:text-lg font-semibold mb-2">Dificultad: {difficulty}</p>
        <p className="text-sm md:text-lg mb-4">{description}</p>
        <div className="mb-4">
          <h2 className="text-lg md:text-xl font-bold mb-2">Solución:</h2>
          <pre className="bg-gray-300 p-2 md:p-4 rounded-md text-black overflow-x-auto">{solution}</pre>
        </div>
        <p className="text-sm md:text-lg font-semibold">Tags: {tags.join(", ")}</p>
      </div>
    </div>
  );
};

export default EjercicioCard;