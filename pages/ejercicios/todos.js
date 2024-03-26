import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchExercises } from "../../utils/fetchExercises";

import LoadingComponent from "../components/Loading";
import EjercicioFullCard from "../components/EjercicioFullCard";

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

 
  const filteredEjercicios = ejercicios.filter((ejercicio) =>
    ejercicio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!ejercicios[0]) {
    return    <Layout >
      <LoadingComponent height="min-h-screen" />
      </Layout>;
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
             <EjercicioFullCard ejercicio={ejercicio} />
            ))
          ) : (
            <p>No se encontraron ejercicios con ese nombre.</p>
          )}
       
        </div>
      </div>
    </Layout>
  );
}

