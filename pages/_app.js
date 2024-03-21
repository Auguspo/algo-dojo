import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const currentPath = router.asPath; // Obtener la URL completa

  // Función para capitalizar la primera letra
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let pageTitle = "";
  if (currentPath === "/") {
    pageTitle = "Algo Dojo";
  } else {
    // Obtener la última palabra de la URL y capitalizarla
    const lastPathSegment = currentPath.split("/").pop() || "";
    pageTitle = capitalize(lastPathSegment);
  }

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
