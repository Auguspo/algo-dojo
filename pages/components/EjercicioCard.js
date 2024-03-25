import React from 'react';

const EjercicioCard = ({ ejercicio }) => {
  // Verifica si el objeto ejercicio es válido
  if (!ejercicio) {
    return <p>No hay ejercicio disponible.</p>;
  }

  const { name, difficulty, description, solution, tags } = ejercicio;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <div className="bg-gray shadow-md rounded-lg p-6">
        <p className="text-lg font-semibold mb-2">Dificultad: {difficulty}</p>
        <p className="text-lg mb-4">{description}</p>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Solución:</h2>
          <pre className="bg-gray-200 p-4 rounded-md text-black">{solution}</pre>
        </div>
        <p className="text-lg font-semibold">Tags: {tags.join(", ")}</p>
      </div>
    </div>
  );
};

export default EjercicioCard;