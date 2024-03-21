import { useEffect, useState } from 'react';
import { fetchExercises } from '../../utils/fetchExercises';
import Layout from '../components/Layout';
import Link from 'next/link';
import LoadingComponent from '../components/Loading';

const DifficultyPage = () => {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };

    fetchData();
  }, []);

  const ejerciciosPorDificultad = [[], [], [], [], []];

  ejercicios.forEach((ejercicio) => {
    ejerciciosPorDificultad[ejercicio.difficulty - 1].push(ejercicio);
  });

  if (!ejercicios[1]) {
    return (
     <LoadingComponent />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 ">
        <h1 className="text-3xl font-bold mb-4">Ejercicios por dificultad</h1>
        <div className="grid grid-cols-5 gap-4">
          {ejerciciosPorDificultad.map((ejerciciosEnDificultad, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2 text-black">Dificultad {index + 1}</h2>
              {ejerciciosEnDificultad.map((ejercicio) => (
                <Link
                  className="inline-flex items-center px-4 py-2 bg-white rounded mb-2 w-full text-black hover:bg-gray-300"
                  href={`/ejercicios/${ejercicio._id}`}
                  key={ejercicio.id}
                >
                  {ejercicio.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DifficultyPage;

export async function getStaticProps() {
  const ejercicios = await fetchExercises();

  return {
    props: {
      ejercicios,
    },
  };
}
