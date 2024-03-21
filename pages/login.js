import { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", credentials);
      console.log(response);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Mostrar un mensaje de error al usuario o realizar cualquier otra acción necesaria
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;