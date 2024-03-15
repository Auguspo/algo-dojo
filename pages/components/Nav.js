import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-indigo-500 ">
      {" "}
      <div className="container mx-auto px-4 py-5 flex justify-between items-center ">
        {" "}
        <Link
          href="/"
          className="text-3xl font-bold text-white hover:text-indigo-700 px-3 py-2 rounded-md hover:text-shadow-md"
        >
          Algo Dojo
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/ejercicios/dificultad"
            className="inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            {" "}
            Por dificultad
          </Link>
          <Link
            href="/ejercicios/tags"
            className="inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Por etiquetas
          </Link>
          <Link
            href="/ejercicios/todos"
            className="inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Todos
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;