"use client";

import React, { useState } from 'react';
import Head from 'next/head';

// Importar los componentes
import Header from '../components/Header';
import MainContent from '../components/MainContent/index.js';
import Footer from '../components/Footer/index.js';
import EjercicioList from '@/components/organisms/exerciseList';

const Page = () => {
  // Estado para el título de la página
  const [title, setTitle] = useState('Mi aplicación');

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Mi aplicación" />
      </Head>
      <Header title={title} />
      <MainContent />
      <EjercicioList />
      <Footer />
    </div>
  );
};

export default Page;
