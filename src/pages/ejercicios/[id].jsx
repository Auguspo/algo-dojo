import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Layout, Loading, EjercicioCard } from 'src/components';

import { apiClient } from 'src/utils/apiClient';

const Ejercicio = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ejercicio, setEjercicio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await apiClient.get(`/ejercicios?id=${id}`);
        setEjercicio(res.data);
      }
    };
    fetchData();
  }, [id]);

  if (!ejercicio) {
    return (
      <Layout>
        <Loading height='min-h-screen' />
      </Layout>
    );
  }

  let pageTitle = ejercicio.name;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className='container mx-auto px-4 py-8'>
        {' '}
        {/* Añadimos padding horizontal y vertical para dispositivos móviles */}
        <EjercicioCard ejercicio={ejercicio} />
      </div>
    </Layout>
  );
};

export default Ejercicio;
