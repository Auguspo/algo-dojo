import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchExercises } from "../../utils/fetchExercises";

import LoadingComponent from "../components/Loading";
import EjercicioFullCard from "../components/EjercicioFullCard";

export default function Todos() {
  const [ejercicios, setEjercicios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(ejercicios.length / limit);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const filteredEjercicios = ejercicios
    .filter((ejercicio) =>
      ejercicio.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  if (!ejercicios[0]) {
    return    <Layout >
      <LoadingComponent height="min-h-screen" />
      </Layout>;
  }
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Todos los ejercicios</h1>
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        
        <select
            className="w-32 px-4 py-2 border border-gray-300 rounded-md ml-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value="9">9</option>
            <option value="27">27</option>
            <option value="todos">Todos</option>
          </select> </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEjercicios.length > 0 ? (
            filteredEjercicios.map((ejercicio) => (
             <EjercicioFullCard  key={ejercicios._id} ejercicio={ejercicio} />
            ))
          ) : (
            <p>No se encontraron ejercicios con ese nombre.</p>
          )}
       
        </div>
      </div><div className="flex justify-center my-4">
  <button
    className="px-4 py-2 mr-2 rounded-md bg-gray-200 hover:bg-gray-300"
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    Anterior
  </button>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      className={`px-4 py-2 mx-1 rounded-md ${
        currentPage === i + 1
          ? "bg-blue-500 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
      onClick={() => handlePageChange(i + 1)}
    >
      {i + 1}
    </button>
  ))}
  <button
    className="px-4 py-2 ml-2 rounded-md bg-gray-200 hover:bg-gray-300"
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    Siguiente
  </button>
</div>
    </Layout>
  );
}

