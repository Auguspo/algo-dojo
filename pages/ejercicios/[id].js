import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { fetchExerciseById } from "../utils/fetchExercises";
import LoadingComponent from "../components/Loading";
export default function Ejercicio() {
  const router = useRouter();
  const { id } = router.query;
  const [ejercicio, setEjercicio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await fetchExerciseById(id);
        setEjercicio(data);
      }
    };

    fetchData();
  }, [id]);

  if (!ejercicio) {
    return <LoadingComponent />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{ejercicio.name}</h1>
        <div className="bg-gray shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold mb-2">
            Dificultad: {ejercicio.difficulty}
          </p>
          <p className="text-lg mb-4">{ejercicio.description}</p>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Solución:</h2>
            <pre className="bg-gray-200 p-4 rounded-md text-black">
              {ejercicio.solution}
            </pre>
          </div>
          <p className="text-lg font-semibold">
            Tags: {ejercicio.tags.join(", ")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
