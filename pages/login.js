import { useState, useContext } from 'react';
import { useAtom } from 'jotai';
import Layout from './components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoadingComponent from './components/Loading';
import { userNameAtom } from '../utils/store';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [, setUserName] = useAtom(userNameAtom); 

  const handleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.status === 200) {
       
        const { username } = response.data; 
    
        setUserName(username);
        setLoginSuccess(true);
        router.push('/'); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginSuccess(false);
      setLoginError(true);
    } finally {
      setLoading(false);
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
              onChange={handleChange} disabled={loading}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange} disabled={loading}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                disabled={loading} // Deshabilitar el botón mientras se carga
              >
                {loading ? (
                   <svg
                    className="animate-spin h-5 w-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.59 0-4.968-1.031-6.727-2.709l2.255-2.255 1.414 1.414-3.991 3.99zM20 12a8 8 0 01-8 8v4c4.418 0 8-3.582 8-8h-4zm-2-5.291A7.962 7.962 0 0020 12h4c0-4.418-3.582-8-8-8v4c2.59 0 4.968 1.031 6.727 2.709l-2.255 2.255-1.414-1.414 3.991-3.99z"
                    ></path>
                  </svg> // Mostrar el componente de carga
                ) : (
                  "Iniciar sesión"
                )}
              </button>
        
            </div>
            <div>      {loginSuccess && (
                <svg
                  className="ml-2 h-6 w-6 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {loginError && (
                <p className="text-center text-red-500 ml-2">Error al iniciar sesión. Por favor, revisa tus credenciales.</p>
              )}</div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
