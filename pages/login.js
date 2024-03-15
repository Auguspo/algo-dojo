import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "./components/Layout";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirigir a la página de destino
    }
  }, [session, router]);

  const onSubmit = async () => {
    try {
      await signIn("github", { callbackUrl: "/api/auth/callback/github" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Iniciar sesión
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-base font-medium text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
            >
              Iniciar sesión con GitHub
            </button>
          </div>

        
        </div>
      </div>
    </Layout>
  );
};

export default Login;