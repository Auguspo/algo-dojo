import React from "react";
import Link from "next/link";
const EjercicioFullCard = ({ ejercicio }) => {
  if (!ejercicio) {
    return <p>No hay ejercicio disponible.</p>;
  }
  return (
    <>
      <Link
        href={`/ejercicios/${ejercicio._id}`}
        key={ejercicio._id}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-2 text-black">
            {ejercicio.name}
          </h2>
          <p className="text-gray-700 text-base mb-2">
            Dificultad: {ejercicio.difficulty}
          </p>
          <p className="text-black text-base mb-4">
            {ejercicio.description.slice(0, 100)}...
          </p>
          <div className="flex items-center">
            {ejercicio.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default EjercicioFullCard;
