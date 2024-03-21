import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchExercises } from "../../utils/fetchExercises";
import Link from "next/link";
import LoadingComponent from "../components/Loading";

export default function Todos() {
  const [ejercicios, setEjercicios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };

    fetchData();
  }, []);

  if (!ejercicios[0]) {
    return (
      <LoadingComponent />
    );
  }

  const filteredEjercicios = ejercicios.filter((ejercicio) =>
    ejercicio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!ejercicios[0]) {
    return <LoadingComponent />;
  }
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Todos los ejercicios</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEjercicios.length > 0 ? (
            filteredEjercicios.map((ejercicio) => (
              <Link   href={`/ejercicios/${ejercicio._id}`}
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
            ))
          ) : (
            <p>No se encontraron ejercicios con ese nombre.</p>
          )}
        {/* </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ejercicios.map((ejercicio) => (
            <Link   href={`/ejercicios/${ejercicio._id}`}
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
          ))} */}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const ejercicios = await fetchExercises();

  return {
    props: {
      ejercicios,
    },
  };
}
