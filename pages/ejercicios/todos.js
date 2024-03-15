import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchExercises } from "../utils/fetchExercises";
import Link from "next/link";

export default function Todos() {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };

    fetchData();
  }, []);

  if (!ejercicios[0]) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Cargando...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Todos los ejercicios</h1>
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
          ))}
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
