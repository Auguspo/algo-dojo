import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Nav = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (e) {}
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
            className={`${
              isOpen ? "block" : "hidden"
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
              <Link
                href="/login"
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Log in
              </Link>
              <button
                onClick={() => logout()}
                className="block md:inline-flex items-center px-3 py-2 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;