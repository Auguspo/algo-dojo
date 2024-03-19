import React from 'react';

const EjerciciosList = ({ ejercicios, handleEdit, handleDelete }) => {
  return (
    <ul>
      {ejercicios.map((ejercicio) => (
        <li
          key={ejercicio._id}
          className="border border-gray-400 p-4 mb-4 rounded"
        >
          <h3 className="text-xl font-bold mb-2">{ejercicio.name}</h3>
          <p className="mb-2">
            <span className="font-bold">Descripción:</span>{" "}
            {ejercicio.description}
          </p>
          <p className="mb-2">
            <span className="font-bold">Dificultad:</span>{" "}
            {ejercicio.difficulty}
          </p>
          <p className="mb-2">
            <span className="font-bold">Solución:</span>{" "}
            {ejercicio.solution}
          </p>
          <p className="mb-4">
            <span className="font-bold">Etiquetas:</span>{" "}
            {ejercicio.tags.join(", ")}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => handleEdit(ejercicio)}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(ejercicio._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EjerciciosList;
