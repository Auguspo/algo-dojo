import '../styles/globals.css';

import Head from 'next/head';
import { useRouter } from 'next/router';
export default function App({ Component, pageProps: { ...pageProps } }) {
  const router = useRouter();
  const currentPath = router.asPath;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let pageTitle = '';
  if (currentPath === '/') {
    pageTitle = 'Algo Dojo';
  } else {
    const lastPathSegment = currentPath.split('/').pop() || '';
    pageTitle = capitalize(lastPathSegment);
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
