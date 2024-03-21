import { useEffect, useState } from "react";
import { fetchExercises } from '../../utils/fetchExercises';
import Layout from "../components/Layout";
import Link from "next/link";
import LoadingComponent from "../components/Loading";
const TagsPage = () => {
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExercises();
      setEjercicios(data);
    };

    fetchData();
  }, []);

  const allTags = ejercicios.flatMap((ejercicio) => ejercicio.tags);

  // Create a set to get the unique tags
  const uniqueTags = new Set(allTags);

  // Convert the set to an array
  const tagsArray = Array.from(uniqueTags);

  if ( !ejercicios[0]) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Ejercicios por tags</h1>
        <div className="grid grid-cols-3 gap-4">
          {tagsArray.map((tag) => (
            <div key={tag} className="bg-white p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2 text-black">{tag}</h2>
              <ul>
                {ejercicios
                  .filter((ejercicio) => ejercicio.tags.includes(tag))
                  .map((ejercicio) => (
                    <Link
                      className="inline-flex items-center px-4 py-2 bg-gray-200 rounded mb-2 w-full text-black hover:bg-gray-300"
                      href={`/ejercicios/${ejercicio._id}`}
                      key={ejercicio._id}
                    >
                      {ejercicio.name}
                    </Link>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TagsPage;

export async function getStaticProps() {
  const ejercicios = await fetchExercises();

  return {
    props: {
      ejercicios,
    },
  };
}
