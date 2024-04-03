import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { fetchExerciseById } from "../../utils/fetchExercises";
import LoadingComponent from "../components/Loading";
import EjercicioCard from "../components/EjercicioCard";
import Head from "next/head";

const Ejercicio = () => {
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
    return (
      <Layout>
        <LoadingComponent height="min-h-screen" />
      </Layout>
    );
  }

  let pageTitle = ejercicio.name;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="container mx-auto px-4 py-8"> {/* Añadimos padding horizontal y vertical para dispositivos móviles */}
        <EjercicioCard ejercicio={ejercicio} />
      </div>
    </Layout>
  );
};

export default Ejercicio;