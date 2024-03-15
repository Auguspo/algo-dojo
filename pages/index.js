import React from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Link from "next/link";


const HomePage = () => {
  return (
    <div className="bg-gray-100  ">
      <Nav />
      <div
        className="bg-cover  bg-top h-96 flex items-center justify-center "
        style={{ backgroundImage: `url(/DOJO.jpg)` }}
      >
        <h1 className="text-6xl font-bold text-white text-center mb-4 border-2p-4 font-outline-4">
          Bienvenido a Algo Dojo
        </h1>
      </div>

      <div className="container mx-auto py-12 text-black   ">
        <p className="text-lg mb-8">
          Algo Dojo es una plataforma en línea dedicada a ejercicios de
          programación en JavaScript. Aquí podrás practicar y mejorar tus
          habilidades resolviendo desafíos de diferentes niveles de dificultad y
          temáticas.
        </p>
        <h2 className="text-2xl font-bold mb-4">¿Cómo funciona?</h2>
        <p className="text-lg mb-8">
          Puedes explorar los ejercicios por nivel de dificultad, etiquetas o
          ver todos los disponibles. Cada ejercicio incluye una descripción
          detallada y una sección para ingresar tu solución en JavaScript. Una
          vez que hayas resuelto el ejercicio, podrás verificar tu respuesta y
          obtener retroalimentación.
        </p>
        <div className="flex justify-center">
          <Link
            href="/ejercicios/dificultad"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Explorar por dificultad
          </Link>
          <Link
            href="/ejercicios/tags"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md ml-4 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Explorar por etiquetas
          </Link>
          <Link
            href="/ejercicios/todos"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md ml-4 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Ver todos
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
