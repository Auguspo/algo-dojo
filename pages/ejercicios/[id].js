import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { fetchExerciseById } from "../../utils/fetchExercises";
import LoadingComponent from "../components/Loading";
import EjercicioCard from "../components/EjercicioCard";
import Head from "next/head";

const Ejercicio = () =>{
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
  let pageTitle = ejercicio.name;
  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <EjercicioCard ejercicio={ejercicio} />
    </Layout>
  );
}
export default Ejercicio;