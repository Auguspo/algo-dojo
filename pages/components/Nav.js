import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from 'jotai';
import { userNameAtom } from '../../utils/store';


const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useAtom(userNameAtom);


  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      setUserName(null);
      console.log(userNameAtom)
      router.push("/login");
    } catch (e) { }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-500">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold text-white hover:text-indigo-700 px-3 py-2 rounded-md hover:text-shadow-md"
          >
            Algo Dojo
          </Link>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-indigo-700 focus:outline-none focus:text-indigo-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div
            className={`${isOpen ? "block" : "hidden"
              } w-full md:flex md:items-center md:w-auto`}
          >
            <div className="md:flex md:space-x-4">
              <Link
                href="/ejercicios/CRUD"
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                CRUD
              </Link>
              <Link
                href="/ejercicios/dificultad"
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Por dificultad
              </Link>
              <Link
                href="/ejercicios/tags"
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Por etiquetas
              </Link>
              <Link
                href="/ejercicios/todos"
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Todos
              </Link>
              {userName ? (

                <div className="relative inline-block">
                  <button className="logout-button block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2">
                    Hola, {userName}
                    <svg
                      className="ml-2 h-4 w-4"

                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={logout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;